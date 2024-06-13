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
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, refetch }}>
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
