import { User } from '@prisma/client';
import { useInitData } from '@tma.js/sdk-react';
import axios from 'axios';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

import Toaster from '@/components/ui/Toaster';
import { getUserTonPrivateKey, isUseApi, isUseTon } from '@/hooks/useTelegramStorage';
import { initBlockchainLogic } from '@/lib/contract/blockchain';
import { getMonthPeriodData, updateMonthPeriodData } from '@/lib/contract/data';
import { waitForAction } from '@/lib/contract/utils';
import { derivePublicKey } from '@/lib/encryption';
import { getFirstDayOfLastPeriod } from '@/utils/periodDates';

import { useTonConnect } from '../hooks/useTonConnect';

const showToast = (message: string) => {
  toast.custom((t) => <Toaster message={message} />);
};

type UserContextType = {
  user: User | null;
  loading: boolean;
  menstruations: Date[];
  menstruationsLoading: boolean;
  lastPeriodDate: Date | null;
  farmingSession: any | null;
  farmingSessionLoading: boolean;
  refetchUser: () => void;
  refetchMenstruations: () => void;
  refetchFarmingSession: () => void;
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

  const [farmingSession, setFarmingSession] = useState<any | null>(null);
  const [farmingSessionLoading, setFarmingSessionLoading] = useState(true);

  const initData = useInitData();
  const { address, connected, wallet } = useTonConnect();

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
      showToast('Failed to fetch user data');
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
      showToast('Failed to create user');
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
      showToast('Failed to update user');
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
      showToast('Failed to update wallet address');
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
        const storedAddress = localStorage.getItem('walletAddress') || address;

        if (!storedAddress) {
          console.error('No address found.');
        }

        const publicKey = derivePublicKey(tonPrivateKey);
        await initBlockchainLogic(storedAddress!, publicKey);
        dates = await getMonthPeriodData(storedAddress!, tonPrivateKey!);
      }
      const sortedMenstruationData = dates.sort((a: Date, b: Date) => a.getTime() - b.getTime());
      setMenstruations(sortedMenstruationData);

      if (sortedMenstruationData.length > 0) {
        const lastPeriodStart = getFirstDayOfLastPeriod(sortedMenstruationData);
        setLastPeriodDate(lastPeriodStart);
      }
    } catch (error) {
      console.error('Failed to fetch menstruation data:', error);
      showToast('Failed to fetch menstruation data');
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
      showToast('Failed to fetch farming session data');
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
        const storedAddress = localStorage.getItem('walletAddress') || address;
        if (!storedAddress || !tonPrivateKey) return;

        if (!storedAddress) {
          console.error('Address is undefined, but save is called');
        } else {
          console.log('Changing menstruations | using address: ', storedAddress);
        }

        const publicKey = derivePublicKey(tonPrivateKey);
        await initBlockchainLogic(storedAddress!, publicKey);
        const result = await updateMonthPeriodData(storedAddress!, changes, tonPrivateKey!);

        if (result.success) {
          setMenstruations(result.data!);
          refetchMenstruations();
        } else {
          if (result.statusCode === 429) {
            showToast('Too many requests. Please try again later.');
          } else {
            showToast(result.error || 'Failed to update menstruations');
          }
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 429) {
        console.error('Too many requests:', error);
        showToast('Too many requests. Please try again later.');
      } else {
        console.error('Failed to change menstruations:', error);
        showToast('Failed to change menstruations');
      }
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
          const sessionData = await fetchFarmingSession(existingUser.id);
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
    console.log('Refetching farming session');
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
