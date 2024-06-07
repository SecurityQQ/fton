import { User } from '@prisma/client';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type UserContextType = {
  user: User | null;
  loading: boolean;
  refetch: () => void;
  setUserId: (id: string) => void;
};

type UserProviderProps = {
  children: ReactNode;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async (id: string) => {
    try {
      const response = await fetch(`/api/user/${id}`);
      const userData = await response.json();
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
      fetchUser(storedUserId);
    }
  }, []);

  const refetch = () => {
    if (userId) {
      setLoading(true);
      fetchUser(userId);
    }
  };

  const storeUserId = (id: string) => {
    setUserId(id);
    localStorage.setItem('userId', id);
  };

  return (
    <UserContext.Provider value={{ user, loading, refetch, setUserId: storeUserId }}>
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
