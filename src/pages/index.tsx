import { Prisma } from '@prisma/client';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import { useEffect, useState } from 'react';

type User = Prisma.UserGetPayload<object>;

const Home: NextPage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check if Telegram Web App SDK is available
    if (window.Telegram?.WebApp) {
      const tg = window.Telegram.WebApp;
      tg.ready(); // Tell Telegram that the web app is ready

      // Get user's name from Telegram
      const user = tg.initDataUnsafe?.user;
      if (user) {
        setUserName(user.first_name + ' ' + (user.last_name || ''));
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-telegram-white">
      <Head>
        <title>Welcome to the App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold">Welcome, {userName}</h1>
        <p className="mt-4 text-xl">Get started with our app by clicking the button below.</p>
        <Link href="/period-tracker">Go to Period Tracker</Link>
      </main>
    </div>
  );
};

export default Home;
