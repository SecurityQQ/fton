import { TonConnectButton } from '@tonconnect/ui-react'; // Import the TonConnectButton
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

import WelcomeBonus from '../components/WelcomeBonus';
import { useUser } from '../contexts/UserContext';
import { useTonConnect } from '../hooks/useTonConnect'; // Import your custom hook

const Home: NextPage = () => {
  const { user, loading, setUserId } = useUser();
  const [userName, setUserName] = useState('');
  const { connected, wallet } = useTonConnect();

  useEffect(() => {
    const fetchUserFromTelegram = () => {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Tell Telegram that the web app is ready

      const tgUser = tg.initDataUnsafe?.user;
      if (tgUser) {
        return {
          name: tgUser.first_name + ' ' + (tgUser.last_name || ''),
          telegramHandle: tgUser.usernames || '',
          telegramId: tgUser.id ? tgUser.id.toString() : '',
        };
      }
      return null;
    };

    const mockUser = () => {
      return {
        name: 'Ann',
        telegramHandle: '',
        telegramId: '6107566463',
      };
    };

    const isLocalhost = window.location.hostname === 'localhost';
    const user = isLocalhost ? mockUser() : fetchUserFromTelegram();

    if (user) {
      setUserName(user.name);
      let storedUserId = localStorage.getItem('userId');
      console.log('Stored user ID:', storedUserId);

      if (storedUserId === 'undefined' || storedUserId === 'null' || !storedUserId) {
        storedUserId = null;
      }

      if (storedUserId) {
        console.log('Setting user id:', storedUserId);
        setUserId(storedUserId);
      } else {
        console.log('No valid stored user ID, creating a new user...');
        // Create or fetch user in the database
        fetch('/api/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: user.name,
            telegramHandle: user.telegramHandle,
            telegramId: user.telegramId,
            walletAddress: '', // You can collect this later
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log('Response from creating user:', data);
            if (data.id) {
              console.log('New user ID from response:', data.id);
              setUserId(data.id); // Store user ID
              localStorage.setItem('userId', data.id);
            } else {
              console.error('Failed to get user ID from response:', data);
            }
          })
          .catch((error) => {
            console.error('Failed to create or fetch user:', error);
          });
      }
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
