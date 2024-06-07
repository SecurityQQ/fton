import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton } from '@tonconnect/ui-react';
import Head from 'next/head';
import React from 'react';

import {
  addHealthData,
  getHealthDataAddress,
  getPublicKey,
  getRecordsCount,
  initBlockchainLogic,
} from './api/contracts';
import Navigation from '../components/Navigation';
import { Button } from '../components/styled/styled';
import { useTonConnect } from '../hooks/useTonConnect';

const mockPublicKey = 'test_key';

const EarnPage: React.FC = () => {
  const { network, wallet, address } = useTonConnect();

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
        <button onClick={() => initBlockchainLogic(address!, mockPublicKey)}>
          Init Blockchain Logic
        </button>
        <button onClick={() => getPublicKey(address!)}>Check publicKey</button>
        <button onClick={() => getRecordsCount(address!)}>Get Records Count</button>
        <button
          onClick={async () =>
            addHealthData(address!, 'This is data ' + (await getRecordsCount(address!)).toString())
          }>
          Add Health Data
        </button>
        <button
          onClick={async () => getHealthDataAddress(address!, await getRecordsCount(address!))}>
          Get Last Health Data
        </button>
      </main>
      <Navigation />
    </div>
  );
};

export default EarnPage;
