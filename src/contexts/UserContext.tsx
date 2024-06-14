import { User } from '@prisma/client';
import { useInitData } from '@tma.js/sdk-react';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

import { useTonConnect } from '../hooks/useTonConnect';

type UserContextType = {
  user: User | null;
  loading: boolean;
  refetch: () => void;
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
  const initData = useInitData();
  const { connected, wallet } = useTonConnect();

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

  const refetch = async () => {
    if (initData?.user) {
      setLoading(true);
      const telegramId = initData.user.id.toString();
      const userData = await fetchUser(telegramId);
      setUser(userData);
      setLoading(false);
    }
  };

  return <UserContext.Provider value={{ user, loading, refetch }}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
