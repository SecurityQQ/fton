import { User } from '@prisma/client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/user/clx25i2rm0000zf1o1ao1wof7'); // Replace with actual user ID
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const refetch = () => {
    setLoading(true);
    fetchUser();
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
