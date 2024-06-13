import { AppRoot, SegmentedControl } from '@telegram-apps/telegram-ui';
import { TonConnectButton } from '@tonconnect/ui-react';
import { Check, ChevronRight, Server as ServerIcon, Star, Wallet } from 'lucide-react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import { getFromTelegramStorage, saveToTelegramStorage } from 'src/hooks/useTelegramStorage';

import { initBlockchainLogic, isBlockchainLogicInited } from './api/contracts';
import Navigation from '../components/Navigation';
import { useUser } from '../contexts/UserContext';
import { useTonConnect } from '../hooks/useTonConnect';

const EarnPage: React.FC = () => {
  const { network, wallet, address } = useTonConnect();
  const { user } = useUser();
  const [isBlockchainInited, setIsBlockchainInited] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tokenBalance, setTokenBalance] = useState(0);
  const [publicKey, setPublicKey] = useState(
    getFromTelegramStorage(window, 'publicKey') ?? 'publicKey'
  );
  const [selected, setSelected] = useState(getSaveStorageType());

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
      await initBlockchainLogic(address!, publicKey);
      setIsBlockchainInited(true);
      await updateTokenBalance(1000); // Award 1000 tokens
    } catch (error) {
      console.error('Failed to initialize blockchain logic:', error);
    } finally {
      setLoading(false);
    }
  };

  function getSaveStorageType(): number {
    const type = getFromTelegramStorage(window, 'dataStorageType');
    switch (type) {
      case 'backend+ton':
        return 1;
      case 'ton':
        return 2;
      default:
        return 0;
    }
  }

  const handleSelect = (index: number) => {
    setSelected(index);
    let selectedValue = 'backend';
    switch (index) {
      case 1:
        selectedValue = 'backend+ton';
        break;
      case 2:
        selectedValue = 'ton';
        break;
    }
    saveToTelegramStorage(window, 'dataStorageType', selectedValue);
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
          <ServerIcon className="text-purple-500" size={32} />
          <p className="mx-4 flex-1 text-header2 text-deep-dark">
            Где ты хочешь хранить свои данные?
          </p>
          <AppRoot>
            <SegmentedControl className="relative mx-auto flex max-w-lg justify-between overflow-hidden rounded-lg bg-white p-3 shadow-md">
              <SegmentedControl.Item
                className={`relative z-10 text-center ${
                  selected === 0 ? 'bg-blue-500 text-white' : ''
                }`}
                selected={selected === 0}
                onClick={() => handleSelect(0)}
                style={{ borderRadius: '8px' }}>
                <label
                  className={`block cursor-pointer p-2 font-semibold transition-colors duration-200 ${
                    selected === 0 ? 'text-white' : ''
                  }`}>
                  Her
                </label>
                <input
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                  type="radio"
                />
              </SegmentedControl.Item>
              <SegmentedControl.Item
                className={`relative z-10 text-center ${
                  selected === 1 ? 'bg-blue-500 text-white' : ''
                }`}
                selected={selected === 1}
                onClick={() => handleSelect(1)}
                style={{ borderRadius: '8px' }}>
                <label
                  className={`block cursor-pointer p-2 font-semibold transition-colors duration-200 ${
                    selected === 1 ? 'text-white' : ''
                  }`}>
                  Her+TON
                </label>
                <input
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                  type="radio"
                />
              </SegmentedControl.Item>
              <SegmentedControl.Item
                className={`relative z-10 text-center ${
                  selected === 2 ? 'bg-blue-500 text-white' : ''
                }`}
                selected={selected === 2}
                onClick={() => handleSelect(2)}
                style={{ borderRadius: '8px' }}>
                <label
                  className={`block cursor-pointer p-2 font-semibold transition-colors duration-200 ${
                    selected === 2 ? 'text-white' : ''
                  }`}>
                  TON
                </label>
                <input
                  className="absolute inset-0 size-full cursor-pointer opacity-0"
                  type="radio"
                />
              </SegmentedControl.Item>
            </SegmentedControl>
          </AppRoot>
        </div>
      </main>
      <Navigation />
    </div>
  );
};

export default EarnPage;
