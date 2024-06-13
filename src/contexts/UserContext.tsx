import { User } from '@prisma/client';
import React, { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import {
  addHealthData,
  getHealthDataEncrypted,
  getRecordsCount,
  initBlockchainLogic,
} from '@/pages/api/contracts';
import { decryptData, derivePublicKey, encryptData } from '@/pages/api/contracts/encryption';
import { getUserTonPrivateKey, isUseApi, isUseTon } from 'src/hooks/useTelegramStorage';
import { useTonConnect } from 'src/hooks/useTonConnect';

type UserContextType = {
  user: User | null;
  lastPeriodDate: Date | null;
  loading: boolean;
  refetch: () => void;
  setUserId: (id: string) => void;
  saveLastPeriod: (date: Date) => Promise<void>;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lastPeriodDate, setLastPeriodDate] = useState<Date | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { address } = useTonConnect();

  const fetchUserData = async (id: string) => {
    setLoading(true);
    await fetchUser(id);
    await fetchLastPeriodDate(id);
    setLoading(false);
  };

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  const fetchLastPeriodDate = async (id: string) => {
    const tonPrivateKey = getUserTonPrivateKey();
    try {
      console.log('fetchLastPeriodDate');
      console.log('isUseApi', isUseApi());
      console.log('isUseTon', isUseTon());
      console.log('tonPrivateKey', tonPrivateKey);
      console.log('address', address);
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
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUserData(storedUserId);
    }
  }, []);

  const refetch = () => {
    if (userId) {
      setLoading(true);
      fetchUserData(userId);
    }
  };

  const storeUserId = (id: string) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        lastPeriodDate,
        loading,
        refetch,
        setUserId: storeUserId,
        saveLastPeriod: storeLastPeriodDate,
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
