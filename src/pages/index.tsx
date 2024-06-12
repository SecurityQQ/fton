import { useInitData, type User } from '@tma.js/sdk-react';
import { TonConnectButton } from '@tonconnect/ui-react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import WelcomeBonus from '../components/WelcomeBonus';
import { useUser } from '../contexts/UserContext';
import { useTonConnect } from '../hooks/useTonConnect';
import { setupMockTelegramEnv } from '../lib/mockEnv'; // Adjust the path accordingly

const Home: NextPage = () => {
  const { setUserId, refetch } = useUser();
  const [userName, setUserName] = useState('');
  const { connected, wallet } = useTonConnect();
  const initData = useInitData();

  const fetchUserFromTelegram = (): User | null => {
    if (initData && initData.user) {
      return initData.user;
    }
    return null;
  };

  useEffect(() => {
    const isLocalhost = window.location.hostname === 'localhost';
    const user = fetchUserFromTelegram();

    const storeUserData = async (user: User) => {
      setUserName(user.firstName || '');
      const storedUserId = localStorage.getItem('userId');
      const storedTelegramId = localStorage.getItem('telegramId');

      if (storedUserId && storedTelegramId === user.id.toString()) {
        console.log('Setting user ID from local storage:', storedUserId);
        setUserId(storedUserId);
      } else {
        console.log('No valid stored user ID, creating a new user...');
        try {
          const response = await fetch('/api/user', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...user,
              walletAddress: '', // You can collect this later
            }),
          });

          const data = await response.json();
          console.log('Response from creating user:', data);
          if (data.id) {
            console.log('New user ID from response:', data.id);
            setUserId(data.id);
            localStorage.setItem('userId', data.id);
            localStorage.setItem('telegramId', user.id.toString());
            refetch();
          } else {
            console.error('Failed to get user ID from response:', data);
          }
        } catch (error) {
          console.error('Failed to create or fetch user:', error);
        }
      }
    };

    if (user) {
      storeUserData(user);
    }
  }, [setUserId]);

  useEffect(() => {
    if (connected && wallet && wallet.trim() !== '') {
      const storedUserId = localStorage.getItem('userId');
      console.log('Updating wallet for user ID:', storedUserId);

      if (storedUserId && storedUserId !== 'undefined' && storedUserId !== 'null') {
        fetch(`/api/user/${storedUserId}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            walletAddress: wallet,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Wallet address updated:', data);
          })
          .catch((error) => {
            console.error('Failed to update wallet address:', error);
          });
      }
    }
  }, [connected, wallet]);

  return (
    <div className="bg-telegram-bg flex min-h-screen flex-col items-center justify-center">
      <Head>
        <title>Добро пожаловать в приложение</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="text-telegram-text flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold">Добро пожаловать, {userName}</h1>
        <p className="mt-4 text-xl">
          Трекер женского здоровья, где данные зашифрованы смартконтрактом, и ты получишь
          персональные рекомендации по well-being на основе цикла через бота
        </p>
        <TonConnectButton className="pt-4" />
        <WelcomeBonus />
      </main>
    </div>
  );
};

export default Home;
