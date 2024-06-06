import { Prisma } from '@prisma/client';
import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton } from '@tonconnect/ui-react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useEffect, useState } from 'react';

import GithubSvg from '../assets/GithubSvg';
import { Button } from '../components/styled/styled';
import { useTonConnect } from '../hooks/useTonConnect';

type User = Prisma.UserGetPayload<object>;

const Home: NextPage = () => {
  const [alice, setAlice] = useState<User | null>(null);
  const { network } = useTonConnect();

  useEffect(() => {
    const fetchAlice = async () => {
      const response = await fetch('/api/users/clx25i2rm0000zf1o1ao1wof7'); // Replace 'alice-id' with Alice's actual ID
      const data: User = await response.json();
      setAlice(data);
    };

    fetchAlice();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-telegram-white">
      <Head>
        <title>Next.js + Tailwind CSS + Telegram&apos;s Web App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <TonConnectButton />
        <Button>{network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A'}</Button>
        <span className="text-2xl font-bold text-telegram-black">
          This is a starter template using Next.js and Tailwind CSS for Telegram&apos;s Web Apps.
        </span>
        {alice && (
          <div className="mt-4 rounded border border-telegram-black p-4">
            <h2 className="text-xl font-bold">Alice&apos;s Info</h2>
            <p>
              <strong>Name:</strong> {alice.name}
            </p>
            <p>
              <strong>Wallet Address:</strong> {alice.walletAddress}
            </p>
            <p>
              <strong>Telegram Handle:</strong> {alice.telegramHandle}
            </p>
            <p>
              <strong>Birthdate:</strong> {new Date(alice.birthdate).toLocaleDateString()}
            </p>
            <p>
              <strong>Token Balance:</strong> {alice.tokenBalance}
            </p>
          </div>
        )}
      </main>

      <footer className="flex h-20 w-full items-center justify-center border-t border-t-telegram-black">
        <a
          className="flex items-center justify-center gap-2 text-telegram-black"
          href="https://github.com/mauriciobraz/next.js-telegram-webapp"
          target="_blank"
          rel="noopener noreferrer">
          Powered by{' '}
          <span className="text-telegram-link">mauriciobraz/next.js-telegram-webapp</span>
          <GithubSvg className="size-6 fill-telegram-link" />
        </a>
      </footer>
    </div>
  );
};

export default Home;
