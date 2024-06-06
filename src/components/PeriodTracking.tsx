import React from 'react';

import Calendar from './Calendar';
import { useTonConnect } from '../hooks/useTonConnect';

type PeriodTrackingProps = {
  userName: string;
  lastMenstruationDate: Date;
  tokenBalance: number;
  onPeriodDateChange: () => void;
  onStartFarming: () => void;
  onViewInfo: () => void;
  onShareData: () => void;
  onInviteUser: () => void;
  onSubscribeChannels: () => void;
};

const PeriodTracking: React.FC<PeriodTrackingProps> = ({
  userName,
  lastMenstruationDate,
  tokenBalance,
  onPeriodDateChange,
  onStartFarming,
  onViewInfo,
  onShareData,
  onInviteUser,
  onSubscribeChannels,
}) => {
  const { network, wallet, address } = useTonConnect();

  // Calculate days until next period assuming a 28-day cycle
  const cycleLength = 28;
  const daysSinceLastPeriod = Math.floor(
    (new Date().getTime() - new Date(lastMenstruationDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysUntilNextPeriod = cycleLength - (daysSinceLastPeriod % cycleLength);

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
        <Calendar
          lastMenstruationDate={lastMenstruationDate}
          cycleLength={cycleLength}
          mode="mini"
        />
        {/* You can change mode to "full" to display the full calendar */}
        {/* <Calendar lastMenstruationDate={lastMenstruationDate} cycleLength={cycleLength} mode="full" /> */}

        <div className="mt-8 w-full max-w-md rounded-2xl bg-blue-100 p-4">
          <p className="text-lg text-blue-500">Месячные через</p>
          <h2 className="mt-2 text-5xl font-bold text-blue-500">{daysUntilNextPeriod} дней</h2>
          <p className="mt-2 text-blue-500 opacity-60">Низкая вероятность забеременеть</p>
          <button
            onClick={onPeriodDateChange}
            className="mt-4 rounded-full bg-white px-6 py-2 text-blue-500">
            ИЗМЕНИТЬ ДАТЫ МЕСЯЧНЫХ
          </button>
        </div>

        <div className="mt-8 w-full max-w-md rounded-2xl bg-blue-500 p-4 text-white">
          <p className="text-lg">Текущий баланс</p>
          <h2 className="mt-2 text-5xl font-bold">{tokenBalance} FHC</h2>
          <p className="mt-2 opacity-80">
            Зарабатывайте Fem Coin и обменяйте его на другие токены или получайте скидку на
            консультации и многое другое
          </p>
          <button
            onClick={onStartFarming}
            className="mt-4 rounded-full bg-white px-6 py-2 text-blue-500">
            НАЧАТЬ ФАРМИТЬ
          </button>
          <button
            onClick={onViewInfo}
            className="mt-2 rounded-full bg-white px-6 py-2 text-blue-500">
            СМОТРЕТЬ ИНФО
          </button>
        </div>

        <div className="mt-8 w-full max-w-md">
          <div onClick={onShareData} className="mb-2 cursor-pointer rounded-2xl bg-white p-4">
            <p className="text-gray-500">Поделиться данными</p>
            <p className="text-xl font-bold">4 600 FHC</p>
          </div>
          <div onClick={onInviteUser} className="mb-2 cursor-pointer rounded-2xl bg-white p-4">
            <p className="text-gray-500">Пригласить пользователя</p>
            <p className="text-xl font-bold">300-600 FHC</p>
          </div>
          <div onClick={onSubscribeChannels} className="cursor-pointer rounded-2xl bg-white p-4">
            <p className="text-gray-500">Подписаться на каналы</p>
            <p className="text-xl font-bold">100 FHC</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PeriodTracking;
