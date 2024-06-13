import { TonConnectButton } from '@tonconnect/ui-react';
import { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import WelcomeBonus from '../components/WelcomeBonus';
import { useUser } from '../contexts/UserContext';

const Home: NextPage = () => {
  const { user, loading } = useUser();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      setUserName(user.firstName || '');
    }
  }, [user]);

  if (loading) {
    return (
      <div className="bg-telegram-bg flex min-h-screen flex-col items-center justify-center">
        <Head>
          <title>Loading...</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="text-telegram-text flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
          <h1 className="text-4xl font-bold">Loading...</h1>
        </main>
      </div>
    );
  }

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
