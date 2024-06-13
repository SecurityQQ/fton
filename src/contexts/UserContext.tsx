import { User } from '@prisma/client';
import { useInitData } from '@tma.js/sdk-react';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import {
  addHealthData,
  getHealthDataEncrypted,
  getRecordsCount,
  initBlockchainLogic,
} from '@/pages/api/contracts';
import { decryptData, derivePublicKey, encryptData } from '@/pages/api/contracts/encryption';
import { getUserTonPrivateKey, isUseApi, isUseTon } from 'src/hooks/useTelegramStorage';

import { useTonConnect } from '../hooks/useTonConnect';

type UserContextType = {
  user: User | null;
  lastPeriodDate: Date | null;
  loading: boolean;
  refetch: () => void;
  saveLastPeriod: (date: Date) => Promise<null | undefined>;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const initData = useInitData();
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const { address, connected, wallet } = useTonConnect();

  const fetchUserData = async (id: string) => {
    setLoading(true);
    await fetchUser(id);
    await fetchLastPeriodDate(id);
    setLoading(false);
  };

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

  const createUser = async (telegramUser: any) => {
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

  const fetchLastPeriodDate = async (id: string) => {
    const tonPrivateKey = getUserTonPrivateKey();
    try {
      if (isUseApi() || tonPrivateKey == null || address == null) {
        const response = await fetch(`/api/user/${id}`);
        const userData = await response.json();
        const lastPeriodDate = userData.lastPeriodDate;
        setLastPeriodDate(new Date(lastPeriodDate));
      }
      if (isUseTon() && tonPrivateKey != null && address != null) {
        await initBlockchainLogic(address!, tonPrivateKey!);
        const recordsCount = await getRecordsCount(address!);
        console.log('recordsCount', recordsCount);
        if (recordsCount == null || recordsCount == BigInt(0)) return;
        const lastEncryptedRecord = await getHealthDataEncrypted(address!, recordsCount);
        console.log('lastEncryptedRecord', lastEncryptedRecord);
        const decryptedData = decryptData(lastEncryptedRecord, tonPrivateKey!);
        console.log('decryptedData', decryptedData);
        const lastPeriodDate = new Date(Date.parse(decryptedData));
        console.log('lastPeriodDate', lastPeriodDate);
        setLastPeriodDate(lastPeriodDate);
      }
    } catch (error) {
      console.error('Failed to fetch lastPeriodData:', error);
    }
    if (lastPeriodDate == null) {
      setLastPeriodDate(new Date());
    }
  };

  const storeLastPeriodDate = async (date: Date) => {
    const tonPrivateKey = getUserTonPrivateKey();
    try {
      if (isUseApi() || tonPrivateKey == null || address == null) {
        const response = await fetch('/api/menstruation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ date, userId: user?.id }),
        });

        if (!response.ok) {
          throw new Error('Failed to update the period date');
        }
      }
      if (isUseTon() && tonPrivateKey != null && address != null) {
        await initBlockchainLogic(address!, tonPrivateKey!);
        const publicKey = derivePublicKey(tonPrivateKey!);
        const encryptedData = encryptData(date.toISOString(), publicKey);
        await addHealthData(address!, encryptedData);
      }
    } catch (error) {
      console.error('Failed to fetch lastPeriodData:', error);
      return null;
    }
  };

  useEffect(() => {
    const initializeUser = async () => {
      if (user) {
        setLoading(false);
        return;
      }

      if (initData?.user) {
        const telegramId = initData.user.id.toString();
        let existingUser = await fetchUser(telegramId);

        if (!existingUser) {
          const telegramUser = {
            telegramId: initData.user.id.toString(),
            firstName: initData.user.firstName,
            lastName: initData.user.lastName,
            username: initData.user.username,
            photoUrl: initData.user.photoUrl,
            languageCode: initData.user.languageCode,
            isBot: initData.user.isBot,
            isPremium: initData.user.isPremium,
            allowsWriteToPm: initData.user.allowsWriteToPm,
            addedToAttachmentMenu: initData.user.addedToAttachmentMenu,
          };
          existingUser = await createUser(telegramUser);
        }

        setUser(existingUser);
        await fetchLastPeriodDate(telegramId);
        setLoading(false);
      }
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

  const refetch = async () => {
    if (initData?.user) {
      setLoading(true);
      const telegramId = initData.user.id.toString();
      const userData = await fetchUser(telegramId);
      setUser(userData);
      await fetchLastPeriodDate(telegramId);
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        lastPeriodDate,
        loading,
        refetch,
        saveLastPeriod: storeLastPeriodDate,
      }}>
      {!loading && children}
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
