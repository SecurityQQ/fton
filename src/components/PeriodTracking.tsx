import React, { useState, useEffect } from 'react';

import MiniCalendar from './MiniCalendar';
import recommendationsData from '../assets/recommendations.json';
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

const getDayLabel = (days: number) => {
  if (days === 1) return 'день';
  if (days >= 2 && days <= 4) return 'дня';
  return 'дней';
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
  const [isEditing, setIsEditing] = useState(false);
  const [recommendation, setRecommendation] = useState('');
  const [daysUntilNextEvent, setDaysUntilNextEvent] = useState(0);
  const [eventMessage, setEventMessage] = useState('');
  const [bgColor, setBgColor] = useState('bg-blue-100');
  const [textColor, setTextColor] = useState('text-blue-500');

  const cycleLength = 28;
  const daysSinceLastPeriod = Math.floor(
    (new Date().getTime() - new Date(lastMenstruationDate).getTime()) / (1000 * 60 * 60 * 24)
  );
  const daysUntilNextPeriod = cycleLength - (daysSinceLastPeriod % cycleLength);

  useEffect(() => {
    const phaseIndex = daysSinceLastPeriod % recommendationsData.recommendations.length;
    setRecommendation(recommendationsData.recommendations[phaseIndex]);

    if (daysSinceLastPeriod < 5) {
      setDaysUntilNextEvent(5 - daysSinceLastPeriod);
      setEventMessage('Месячные будут');
      setBgColor('bg-ffd3c6');
      setTextColor('text-f77047');
    } else if (daysSinceLastPeriod >= 5 && daysSinceLastPeriod < 14) {
      setDaysUntilNextEvent(14 - daysSinceLastPeriod);
      setEventMessage('Овуляция через');
      setBgColor('bg-blue-100');
      setTextColor('text-blue-500');
    } else {
      setDaysUntilNextEvent(daysUntilNextPeriod);
      setEventMessage('Месячные через');
      setBgColor('bg-blue-100');
      setTextColor('text-blue-500');
    }
  }, [daysSinceLastPeriod]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <header className="relative flex h-24 w-full items-center justify-between bg-white px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <button className="text-blue-500">Cancel</button>
          <h1 className="pl-8 text-xl text-blue-500">Female TON</h1>
        </div>
        <button className="text-blue-500">...</button>
      </header>

      <main className="flex w-full flex-1 flex-col items-center">
        <MiniCalendar lastMenstruationDate={lastMenstruationDate} cycleLength={cycleLength} />

        <div
          className={`mt-8 w-full max-w-md rounded-2xl p-4 ${bgColor}`}
          style={{ backgroundColor: daysSinceLastPeriod < 5 ? '#FFD3C6' : undefined }}>
          <p className={`text-lg ${textColor}`}>{eventMessage}</p>
          <h2 className={`mt-2 text-5xl font-bold ${textColor}`}>
            {daysUntilNextEvent} {getDayLabel(daysUntilNextEvent)}
          </h2>
          <p className={`mt-2 ${textColor}`}>{recommendation}</p>
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
