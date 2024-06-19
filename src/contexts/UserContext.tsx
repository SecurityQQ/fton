import { User } from '@prisma/client';
import { useInitData } from '@tma.js/sdk-react';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { getUserTonPrivateKey, isUseApi, isUseTon } from '@/hooks/useTelegramStorage';
import {
  getMonthPeriodData,
  initBlockchainLogic,
  updateMonthPeriodData,
  waitForAction,
} from '@/pages/api/contracts';
import { derivePublicKey } from '@/pages/api/contracts/encryption';

import { useTonConnect } from '../hooks/useTonConnect';

type UserContextType = {
  user: User | null;
  loading: boolean;
  menstruations: Date[];
  menstruationsLoading: boolean;
  lastPeriodDate: Date | null;
  farmingSession: any | null; // Add this line
  farmingSessionLoading: boolean; // Add this line
  refetchUser: () => void;
  refetchMenstruations: () => void;
  refetchFarmingSession: () => void; // Add this line
  changeMenstruations: (changes: { date: Date; action: 'add' | 'delete' }[]) => Promise<void>;
};

type UserProviderProps = {
  children: ReactNode;
};

type TelegramUser = {
  telegramId: string;
  firstName: string;
  lastName?: string;
  username?: string;
  photoUrl?: string;
  languageCode?: string;
  isBot?: boolean;
  isPremium?: boolean;
  allowsWriteToPm?: boolean;
  addedToAttachmentMenu?: boolean;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const [menstruations, setMenstruations] = useState<Date[]>([]);
  const [menstruationsLoading, setMenstruationsLoading] = useState(true);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);

  const [farmingSession, setFarmingSession] = useState<any | null>(null); // Add this line
  const [farmingSessionLoading, setFarmingSessionLoading] = useState(true); // Add this line

  const initData = useInitData();
  const { address, connected, wallet } = useTonConnect(); // BUGFIX: address must be fetched over SSR

  const fetchUser = async (telegramId: string): Promise<User | null> => {
    try {
      const response = await fetch(`/api/userByTg/${telegramId}`);
      if (response.ok) {
        const userData = await response.json();
        return userData;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch user data:', error);
      return null;
    }
  };

  const createUser = async (telegramUser: TelegramUser) => {
    try {
      const response = await fetch(`/api/userByTg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(telegramUser),
      });
      const newUser = await response.json();
      return newUser;
    } catch (error) {
      console.error('Failed to create user:', error);
      return null;
    }
  };

  const updateUser = async (telegramId: string, updatedFields: Partial<TelegramUser>) => {
    try {
      const response = await fetch(`/api/userByTg/${telegramId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFields),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const updateUserWallet = async (telegramId: string, walletAddress: string) => {
    try {
      const response = await fetch(`/api/userByTg/${telegramId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ walletAddress }),
      });
      const updatedUser = await response.json();
      setUser(updatedUser);
    } catch (error) {
      console.error('Failed to update wallet address:', error);
    }
  };

  const fetchMenstruations = async (userId: string, months: number = 3) => {
    const useApi = await isUseApi();
    const useTon = await isUseTon();
    const tonPrivateKey = await getUserTonPrivateKey();
    try {
      let dates = [];
      if (useApi || tonPrivateKey == null || address == null) {
        const response = await fetch(`/api/menstruation?userId=${userId}&months=${months}`);
        if (response.ok) {
          const menstruationData = await response.json();
          dates = menstruationData.map((item: { date: string }) => new Date(item.date));
        }
      } else if (useTon) {
        const storedAddress = localStorage.getItem('walletAddress') || address; // TODO: make it better :)

        if (!storedAddress) {
          console.error('no address. lmao.', storedAddress);
        }

        const publicKey = derivePublicKey(tonPrivateKey);
        await initBlockchainLogic(storedAddress!, publicKey);
        dates = await getMonthPeriodData(storedAddress!, tonPrivateKey!);
      }
      const sortedMenstruationData = dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
      setMenstruations(sortedMenstruationData);
      if (sortedMenstruationData.length > 0) {
        const lastPeriodStart = sortedMenstruationData[0];
        setLastPeriodDate(lastPeriodStart);
      }
    } catch (error) {
      console.error('Failed to fetch menstruation data:', error);
    } finally {
      setMenstruationsLoading(false);
    }
  };

  const fetchFarmingSession = async (userId: string) => {
    try {
      const response = await fetch(`/api/farming/status?userId=${userId}`);
      if (response.ok) {
        const farmingSessionData = await response.json();
        return farmingSessionData;
      }
      return null;
    } catch (error) {
      console.error('Failed to fetch farming session data:', error);
      return null;
    } finally {
      setFarmingSessionLoading(false);
    }
  };

  const changeMenstruations = async (changes: { date: Date; action: 'add' | 'delete' }[]) => {
    if (!user) return;
    const useApi = await isUseApi();
    const useTon = await isUseTon();
    const tonPrivateKey = await getUserTonPrivateKey();
    try {
      if (useApi || tonPrivateKey == null || address == null) {
        const response = await fetch('/api/menstruation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ changes, userId: user.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to update the period dates');
        }

        // Update local periodDays state based on changes
        const updatedMenstruations = [...menstruations];

        changes.forEach((change) => {
          if (change.action === 'add') {
            updatedMenstruations.push(change.date);
          } else if (change.action === 'delete') {
            const index = updatedMenstruations.findIndex(
              (periodDate) => periodDate.toDateString() === change.date.toDateString()
            );
            if (index !== -1) {
              updatedMenstruations.splice(index, 1);
            }
          }
        });

        setMenstruations(updatedMenstruations);
        refetchMenstruations(); // Re-fetch the menstruation data to get the updated periodDays
      }
      if (useTon) {
        const storedAddress = localStorage.getItem('walletAddress') || address; // TODO: make it better :)
        if (!storedAddress || !tonPrivateKey) return;

        if (!storedAddress) {
          console.error('address is undefined, but save is called');
        } else {
          console.log('change menst | using address: ', storedAddress);
        }

        const publicKey = derivePublicKey(tonPrivateKey);
        await initBlockchainLogic(storedAddress!, publicKey);
        const updatedMenstruations = await updateMonthPeriodData(
          storedAddress!,
          changes,
          tonPrivateKey!
        );
        setMenstruations(updatedMenstruations);
        refetchMenstruations();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const getNullOrMissingFields = (existingUser: User, newUser: TelegramUser): string[] => {
    const missingFields: string[] = [];

    for (const key in newUser) {
      if (!newUser[key as keyof TelegramUser]) {
        continue;
      }

      if (newUser.hasOwnProperty(key)) {
        const existingValue = existingUser[key as keyof User];
        const newValue = newUser[key as keyof TelegramUser];

        if (existingValue === undefined || existingValue !== newValue) {
          missingFields.push(key);
        }
      }
    }

    return missingFields;
  };

  const convertInitDataToTelegramUser = (initDataUser: any): TelegramUser => {
    return {
      telegramId: initDataUser.id.toString(),
      firstName: initDataUser.firstName,
      lastName: initDataUser.lastName,
      username: initDataUser.username,
      photoUrl: initDataUser.photoUrl,
      languageCode: initDataUser.languageCode,
      isBot: initDataUser.isBot,
      isPremium: initDataUser.isPremium,
      allowsWriteToPm: initDataUser.allowsWriteToPm,
      addedToAttachmentMenu: initDataUser.addedToAttachmentMenu,
    };
  };

  useEffect(() => {
    const initializeUser = async () => {
      if (initData?.user) {
        const telegramId = initData.user.id.toString();

        let existingUser = await fetchUser(telegramId);

        if (existingUser) {
          const telegramUser = convertInitDataToTelegramUser(initData.user);
          const nullOrMissingFields = getNullOrMissingFields(existingUser, telegramUser);

          if (nullOrMissingFields.length > 0) {
            await updateUser(telegramId, telegramUser);
          }
        } else {
          existingUser = await createUser(convertInitDataToTelegramUser(initData.user));
        }

        setUser(existingUser);

        if (existingUser) {
          setMenstruationsLoading(true);
          await fetchMenstruations(existingUser.id);

          setFarmingSessionLoading(true);
          const sessionData = await fetchFarmingSession(existingUser.id); // Fetch farming session
          setFarmingSession(sessionData);
        }
      }
      setLoading(false);
    };

    initializeUser();
  }, [initData]);

  useEffect(() => {
    if (user && connected && wallet && wallet.trim() !== '' && user.walletAddress !== wallet) {
      const telegramId = initData?.user?.id.toString();
      if (telegramId) {
        updateUserWallet(telegramId, wallet);
      }
    }
  }, [connected, wallet, user, initData]);

  useEffect(() => {
    if (connected && wallet) {
      localStorage.setItem('walletAddress', wallet);
    }
  }, [connected, wallet]);

  const refetchUser = async () => {
    if (initData?.user) {
      setLoading(true);
      const telegramId = initData.user.id.toString();
      const userData = await fetchUser(telegramId);
      setUser(userData);
      setLoading(false);
    }
  };

  const refetchMenstruations = async () => {
    if (user) {
      setMenstruationsLoading(true);
      await fetchMenstruations(user.id);
    }
  };

  const refetchFarmingSession = async () => {
    // Add this function
    console.log('refetchingFarmingSession');
    if (user) {
      setFarmingSessionLoading(true);
      const sessionData = await fetchFarmingSession(user.id);
      setFarmingSession(sessionData);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        loading,
        menstruations,
        menstruationsLoading,
        lastPeriodDate,
        farmingSession,
        farmingSessionLoading,
        refetchUser,
        refetchMenstruations,
        refetchFarmingSession,
        changeMenstruations,
      }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
