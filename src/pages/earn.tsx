import { CHAIN } from '@tonconnect/protocol';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Check, Star, Wallet, ToggleRight as SwitchIcon, ChevronRight } from 'lucide-react';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState, useEffect } from 'react';
import Switch from 'react-switch';

import {
  isBlockchainLogicInited,
  addHealthData,
  getHealthDataAddress,
  getPublicKey,
  getRecordsCount,
  initBlockchainLogic,
} from './api/contracts';
import Navigation from '../components/Navigation';
import { Button } from '../components/styled/styled';
import { useUser } from '../contexts/UserContext';
import { useTonConnect } from '../hooks/useTonConnect';

const mockPublicKey = 'test_key';

const EarnPage: React.FC = () => {
  const { network, wallet, address } = useTonConnect();
  const { user } = useUser();
  const [isBlockchainInited, setIsBlockchainInited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [useBlockchain, setUseBlockchain] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkBlockchainInited = async () => {
      if (address) {
        const inited = isBlockchainLogicInited();
        setIsBlockchainInited(inited);
      }
    };

    checkBlockchainInited();
  }, [address]);

  const updateTokenBalance = async (amount: number) => {
    if (user && user.id) {
      try {
        const response = await fetch(`/api/user/${user.id}/balance`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ amount }),
        });

        if (response.ok) {
          const data = await response.json();
          setTokenBalance(data.tokenBalance);
        } else {
          console.error('Failed to update token balance:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating token balance:', error);
      }
    }
  };

  const handleInitBlockchain = async () => {
    setLoading(true);
    try {
      await initBlockchainLogic(address!, mockPublicKey);
      setIsBlockchainInited(true);
      await updateTokenBalance(1000); // Award 1000 tokens
    } catch (error) {
      console.error('Failed to initialize blockchain logic:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleUseBlockchain = () => {
    setUseBlockchain((prev) => !prev);
  };

  return (
    <div className="flex h-screen flex-col">
      <Head>
        <title>Earn</title>
      </Head>
      <main className="flex w-full flex-1 flex-col items-center justify-center space-y-4 px-4 text-center">
        <div className="flex w-full max-w-lg items-center justify-between rounded-3xl bg-pink-100 p-4">
          <Wallet className="text-pink-500" size={32} />
          <p className="mx-4 flex-1 text-header2 text-deep-dark">Подключи свой кошелек</p>
          <TonConnectButton />
          <ChevronRight className="text-pink-500" size={24} />
        </div>

        {isBlockchainInited ? (
          <div className="flex w-full max-w-lg flex-col items-center justify-center rounded-3xl bg-green-100 p-4">
            <div className="flex w-full items-center justify-between">
              <Check className="text-green-500" size={32} />
              <p className="text-lg font-semibold text-green-500">Challenge Completed</p>
              <ChevronRight className="text-green-500" size={24} />
            </div>
            <p className="mt-2 text-xl font-semibold text-green-500">+ 1 000 FHC</p>
          </div>
        ) : (
          <div
            className="mb-4 flex w-full max-w-lg flex-col items-center justify-between rounded-3xl bg-blue-100 p-4"
            onClick={handleInitBlockchain}>
            <div className="flex w-full items-center justify-between">
              {loading ? (
                <div className="size-8 animate-spin rounded-full border-y-2 border-blue-500" />
              ) : (
                <Star className="text-blue-500" size={32} />
              )}
              <p className="mx-4 flex-1 text-header2 text-deep-dark">
                Создай первую запись Blockchain (около 30 секунд)
              </p>
              <ChevronRight className="text-blue-500" size={24} />
            </div>
            <p className="mt-2 text-xl font-semibold text-blue-500">+ 1 000 FHC</p>
          </div>
        )}
        <div className="mb-4 flex w-full max-w-lg items-center justify-between rounded-3xl bg-purple-100 p-4">
          <SwitchIcon className="text-purple-500" size={32} />
          <p className="mx-4 flex-1 text-header2 text-deep-dark">
            Использовать блокчейн в твоих транзакциях
          </p>
          <Switch
            onChange={handleToggleUseBlockchain}
            checked={useBlockchain}
            offColor="#888"
            onColor="#0b8"
            checkedIcon={false}
            uncheckedIcon={false}
            className="react-switch"
          />
          <ChevronRight className="text-purple-500" size={24} />
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default EarnPage;

{
  /*<Button>{network ? (network === CHAIN.MAINNET ? 'mainnet' : 'testnet') : 'N/A'}</Button>
        <p>
          <strong>Wallet:</strong> {wallet} <br />
          <strong>Address:</strong> {address} <br />
          <strong>Token Balance:</strong> {tokenBalance} FHC <br />
        </p>*/
}

{
  /*<button onClick={() => initBlockchainLogic(address!, mockPublicKey)}>
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
        </button>*/
}
