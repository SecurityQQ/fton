import React, { useEffect, useState } from 'react';

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
  const [bgColor, setBgColor] = useState('blue-light');
  const [textColor, setTextColor] = useState('bright-blue');

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
      setBgColor('orange-light');
      setTextColor('bright-orange');
    } else if (daysSinceLastPeriod >= 5 && daysSinceLastPeriod < 14) {
      setDaysUntilNextEvent(14 - daysSinceLastPeriod);
      setEventMessage('Овуляция через');
      setBgColor('blue-light');
      setTextColor('bright-blue');
    } else {
      setDaysUntilNextEvent(daysUntilNextPeriod);
      setEventMessage('Месячные через');
      setBgColor('blue-light');
      setTextColor('bright-blue');
    }
  }, [daysSinceLastPeriod]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <main className="flex w-full flex-1 flex-col items-center">
        <div className={`bg- w-full${bgColor} rounded-b-3xl`}>
          <div className="flex flex-col items-center">
            <MiniCalendar lastMenstruationDate={lastMenstruationDate} cycleLength={cycleLength} />
            <div className="mt-8 w-full max-w-md p-4">
              <p className="text-header2 text-text-dark">{eventMessage}</p>
              <h2 className={`text- mt-2 text-header1 font-bold${textColor}`}>
                {daysUntilNextEvent || '26'} {getDayLabel(daysUntilNextEvent)}
              </h2>
              <p className={`text- mt-2 text-header2${textColor}`}>{recommendation}</p>
              <button
                onClick={onPeriodDateChange}
                className="my-4 rounded-full bg-bright-blue px-6 py-2 text-white">
                ОБНОВИТЬ ДАТУ
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-md rounded-2xl bg-blue-500 p-4 text-white">
          <p className="text-lg">Текущий баланс</p>
          <h2 className="mt-2 text-5xl font-bold">{tokenBalance || '6'} FHC</h2>
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
