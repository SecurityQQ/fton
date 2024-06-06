import { Prisma } from '@prisma/client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useTonConnect } from '../hooks/useTonConnect';
import batteryIcon from '../public/battery-icon.png';
import cellularIcon from '../public/cellular-icon.png';
import dynamicIslandImage from '../public/dynamic-island.png'; // replace with actual image paths
import wifiIcon from '../public/wifi-icon.png';

type User = Prisma.UserGetPayload<object>;

const PeriodTracking: React.FC = () => {
  const [alice, setAlice] = useState<User | null>(null);
  const { network, wallet, address } = useTonConnect();
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchAlice = async () => {
      const response = await fetch('/api/users/clx25i2rm0000zf1o1ao1wof7'); // Replace 'alice-id' with Alice's actual ID
      const data: User = await response.json();
      setAlice(data);
    };

    fetchAlice();
  }, []);

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
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <header className="relative flex h-24 w-full items-center justify-between bg-white px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-blue-500">Cancel</button>
          <h1 className="text-xl text-blue-500">Fem Health</h1>
        </div>
        <button className="text-blue-500">...</button>
      </header>

      <main className="flex w-full flex-1 flex-col items-center">
        <div className="mt-4 flex items-center gap-2">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-gray-400">{day}</span>
              <div
                className={`size-8 rounded-full ${
                  index === 2 ? 'bg-blue-500 text-white' : 'text-gray-400'
                }`}>
                <span className="flex h-full items-center justify-center">{index + 1}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 w-full max-w-md rounded-2xl bg-blue-100 p-4">
          <p className="text-lg text-blue-500">Месячные через</p>
          <h2 className="mt-2 text-5xl font-bold text-blue-500">5 дней</h2>
          <p className="mt-2 text-blue-500 opacity-60">Низкая вероятность забеременеть</p>
          <button className="mt-4 rounded-full bg-white px-6 py-2 text-blue-500">
            ИЗМЕНИТЬ ДАТЫ МЕСЯЧНЫХ
          </button>
        </div>

        <div className="mt-8 w-full max-w-md rounded-2xl bg-blue-500 p-4 text-white">
          <p className="text-lg">Текущий баланс</p>
          <h2 className="mt-2 text-5xl font-bold">12 086 FHC</h2>
          <p className="mt-2 opacity-80">
            Зарабатывайте Fem Coin и обменяйте его на другие токены или получайте скидку на
            консультации и многое другое
          </p>
          <button className="mt-4 rounded-full bg-white px-6 py-2 text-blue-500">
            НАЧАТЬ ФАРМИТЬ
          </button>
          <button className="mt-2 rounded-full bg-white px-6 py-2 text-blue-500">
            СМОТРЕТЬ ИНФО
          </button>
        </div>

        <div className="mt-8 w-full max-w-md">
          <div className="mb-2 rounded-2xl bg-white p-4">
            <p className="text-gray-500">Поделиться данными</p>
            <p className="text-xl font-bold">4 600 FHC</p>
          </div>
          <div className="mb-2 rounded-2xl bg-white p-4">
            <p className="text-gray-500">Пригласить пользователя</p>
            <p className="text-xl font-bold">300-600 FHC</p>
          </div>
          <div className="rounded-2xl bg-white p-4">
            <p className="text-gray-500">Подписаться на каналы</p>
            <p className="text-xl font-bold">100 FHC</p>
          </div>
        </div>
      </main>

      <footer className="fixed bottom-0 flex w-full justify-around border-t border-gray-300 bg-white py-4">
        <button className="flex flex-col items-center text-blue-500">
          <Image src="/home-icon.svg" alt="Home" width={24} height={24} />
          <span className="text-sm">Главная</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Image src="/earn-icon.svg" alt="Earn" width={24} height={24} />
          <span className="text-sm">Заработать</span>
        </button>
        <button className="flex flex-col items-center text-gray-500">
          <Image src="/calendar-icon.svg" alt="Calendar" width={24} height={24} />
          <span className="text-sm">Календарь</span>
        </button>
      </footer>
    </div>
  );
};

export default PeriodTracking;
