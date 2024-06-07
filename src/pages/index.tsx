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
        name: 'Alex M',
        telegramHandle: 'aleksandr_malyshev',
        telegramId: '3с',
      };
    };

    const isLocalhost = window.location.hostname === 'localhost';
    const user = isLocalhost ? mockUser() : fetchUserFromTelegram();

    if (user) {
      setUserName(user.name);
      const storedUserId = localStorage.getItem('userId');

      if (storedUserId) {
        setUserId(storedUserId);
      } else {
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
            setUserId(data.id); // Store user ID
            localStorage.setItem('userId', data.id);
          });
      }
    }
  }, [setUserId]);

  useEffect(() => {
    if (connected && wallet) {
      const storedUserId = localStorage.getItem('userId');

      if (storedUserId && wallet.trim() !== '') {
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
        {/*<Link href="/period-tracker" className="text-telegram-link mt-4">
          Перейти к трекеру цикла
        </Link>*/}
        <TonConnectButton className="pt-4" />
        <WelcomeBonus />
      </main>
    </div>
  );
};

export default Home;
