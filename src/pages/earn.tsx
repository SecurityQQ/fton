import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import Head from 'next/head';
import React from 'react';

import {
  addHealthData,
  createAccount,
  getHealthDataAddress,
  getPublicKey,
  getRecordsCount,
} from './api/contracts';
import Navigation from '../components/Navigation';
import { Button } from '../components/styled/styled';
import { useTonConnect } from '../hooks/useTonConnect';

const mockUserAddress = 'test7';
const mockPublicKey = 'test_key';

const EarnPage: React.FC = () => {
  const { sender, network, wallet, walletObject, address } = useTonConnect();
  const [tonConnectUI] = useTonConnectUI();

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Earn</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center px-4 text-center">
        <TonConnectButton />
        <Button>{network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A'}</Button>
        <p>
          <strong>Wallet:</strong> {wallet} <br />
          <strong>Address:</strong> {address} <br />
        </p>
        <button onClick={() => createAccount(mockUserAddress, mockPublicKey)}>
          Create Account
        </button>
        <button onClick={() => getPublicKey(mockUserAddress)}>Check publicKey</button>
        <button onClick={() => getRecordsCount(mockUserAddress)}>Get Records Count</button>
        <button
          onClick={async () =>
            addHealthData(
              mockUserAddress,
              'This is data ' + (await getRecordsCount(mockUserAddress)).toString()
            )
          }>
          Add Health Data
        </button>
        <button
          onClick={async () =>
            getHealthDataAddress(mockUserAddress, await getRecordsCount(mockUserAddress))
          }>
          Get Last Health Data
        </button>
      </main>
      <Navigation />
    </div>
  );
};

export default EarnPage;
