import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton, useTonConnectUI } from '@tonconnect/ui-react';
import Head from 'next/head';
import React from 'react';

import { deployContract } from './api/contracts/index';
import Navigation from '../components/Navigation';
import { Button } from '../components/styled/styled';
import { useTonConnect } from '../hooks/useTonConnect';

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
        <button onClick={() => deployContract(tonConnectUI)}>Deploy contract</button>
        {/* <button onClick={() => address == null ? null : sendPublicKey(sender, walletObject!.account.address, 'lol')}>
          Set public token
        </button> */}
      </main>
      <Navigation />
    </div>
  );
};

export default EarnPage;
