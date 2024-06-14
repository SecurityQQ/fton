import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import MiniCalendar from './MiniCalendar';
import recommendationsData from '../assets/recommendations.json';
import { useTonConnect } from '../hooks/useTonConnect';

type PeriodTrackingProps = {
  lastMenstruationDate?: Date; // Made optional
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

  useEffect(() => {
    if (!lastMenstruationDate) {
      setRecommendation('Чтобы воспользоваться трекером, обновите дату последних месячных');
      setEventMessage('Дата последних месячных не указана');
      setBgColor('bg-red-100');
      setTextColor('text-red-500');
      return;
    }

    const today = new Date();
    const daysSinceLastPeriod = Math.floor(
      (today.getTime() - new Date(lastMenstruationDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    const daysUntilNextPeriod = cycleLength - (daysSinceLastPeriod % cycleLength);

    const phaseIndex = (daysSinceLastPeriod + 24) % recommendationsData.recommendations.length; // 24 is a legacy because we stored lastPeriodDay, now it is first day of last period (28 - 4 days)
    setRecommendation(recommendationsData.recommendations[phaseIndex]);

    if (daysSinceLastPeriod < 5) {
      setDaysUntilNextEvent(5 - daysSinceLastPeriod);
      setEventMessage('Месячные будут');
      setBgColor('bg-orange-100');
      setTextColor('text-orange-500');
    } else if (daysSinceLastPeriod >= 12 && daysSinceLastPeriod < 17) {
      setDaysUntilNextEvent(17 - daysSinceLastPeriod);
      setEventMessage('Овуляция через');
      setBgColor('bg-blue-100');
      setTextColor('text-blue-500');
    } else if (daysUntilNextPeriod <= 5) {
      setDaysUntilNextEvent(daysUntilNextPeriod);
      setEventMessage('Месячные через');
      setBgColor('bg-orange-100');
      setTextColor('text-orange-500');
    } else {
      setDaysUntilNextEvent(daysUntilNextPeriod);
      setEventMessage('Месячные через');
      setBgColor('bg-blue-100');
      setTextColor('text-blue-500');
    }
  }, [lastMenstruationDate]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <main className="flex w-full flex-1 flex-col items-center">
        <div className={`${bgColor} w-full rounded-b-3xl`}>
          <div className="flex flex-col items-center">
            {lastMenstruationDate ? (
              <MiniCalendar lastMenstruationDate={lastMenstruationDate} cycleLength={cycleLength} />
            ) : null}
            <div className="mt-0 w-full max-w-md p-4">
              <p className="text-header2 text-text-dark">{eventMessage}</p>
              {lastMenstruationDate && (
                <h2 className={`text- mt-2 text-header1 font-bold ${textColor}`}>
                  {daysUntilNextEvent} {getDayLabel(daysUntilNextEvent)}
                </h2>
              )}
              <p className={`text- mt-2 text-header2 ${textColor}`}>{recommendation}</p>
              <button
                onClick={onPeriodDateChange}
                className="my-4 rounded-full bg-bright-blue px-6 py-2 text-white">
                ОБНОВИТЬ ДАТУ
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8 w-full max-w-md rounded-3xl bg-gradient-to-b from-green1 to-green2 p-8 text-white">
          <p className="text-header2">Текущий баланс</p>
          <div className="flex flex-row place-content-center place-items-center">
            <h2 className="mr-2 mt-2 text-header1 font-bold">{tokenBalance || '1257'}</h2>
            <div className="mt-1">
              <Image src="/ftoken.svg" alt="Chevron" width={38} height={38} />
            </div>
          </div>
          <p className="mt-2 text-body2 opacity-60">
            Зарабатывайте Fem Coin и обменяйте его на другие токены или получайте скидку на
            консультации и многое другое
          </p>
          <div className="flex flex-col items-center">
            <button
              onClick={onStartFarming}
              className="mt-4 rounded-full bg-white px-6 py-2 text-button font-medium text-text-green">
              УВЕЛИЧИТЬ
            </button>
            <button
              onClick={onViewInfo}
              className="mt-2 rounded-full bg-white/20 px-6 py-2 text-button font-medium text-white">
              ИСТОРИЯ ПОПОЛНЕНИЯ
            </button>
          </div>
        </div>

        <div className="mt-1 w-full max-w-md">
          <div
            onClick={onShareData}
            className="mb-1 flex cursor-pointer flex-row content-between rounded-3xl bg-orange-light p-4">
            <Link href="/earn" className="flex flex-1 flex-row items-stretch">
              <Image src="/star.svg" alt="Star" width={32} height={32} />
              <div className="ml-2 flex flex-col items-stretch">
                <p className="self-start text-header2 text-sunny-dark">Погрузись на блокчейн</p>
                <div className="flex flex-row">
                  <p className="self-start text-body1 font-medium text-sunny-dark">+ 1 000 FHC </p>
                  <p className="ml-1 mt-1 self-start text-body2B font-medium text-sunny-dark">
                    / 1 раз
                  </p>
                </div>
              </div>
            </Link>
            <div className="self-center">
              <Image src="/chevron-right.svg" alt="Chevron" width={32} height={32} />
            </div>
          </div>
          <div
            onClick={onInviteUser}
            className="mb-1 flex cursor-pointer flex-row content-between rounded-3xl bg-violet-light/30 p-4">
            <Link href="https://t.me/femaleton" className="flex flex-1 flex-row items-stretch">
              <Image src="/star-violet.svg" alt="Star" width={32} height={32} />
              <div className="ml-2 flex flex-col items-stretch">
                <p className="self-start text-header2 text-violet-dark">Подписаться на каналы</p>
                <div className="flex flex-row">
                  <p className="self-start text-body1 font-medium text-violet-dark">+ 300 FHC </p>
                  <p className="ml-1 mt-1 self-start text-body2B font-medium text-violet-dark">
                    / канал
                  </p>
                </div>
              </div>
            </Link>
            <div className="self-center">
              <Image src="/chevron-right-violet.svg" alt="Chevron" width={32} height={32} />
            </div>
          </div>

          <div
            onClick={onSubscribeChannels}
            className="mb-24 flex cursor-pointer flex-row content-between rounded-3xl bg-deep-light/30 p-4">
            <div className="flex flex-1 flex-row items-stretch">
              <Image src="/star-blue.svg" alt="Star" width={32} height={32} />
              <div className="ml-2 flex flex-col items-stretch">
                <p className="self-start text-header2 text-deep-dark">
                  Поделиться данными (скоро!)
                </p>
                <div className="flex flex-row">
                  <p className="self-start text-body1 font-medium text-deep-dark">+ 4 600 FHC </p>
                  <p className="ml-1 mt-1 self-start text-body2B font-medium text-deep-dark">
                    / бренд
                  </p>
                </div>
              </div>
            </div>
            <div className="self-center">
              <Image src="/chevron-right-blue.svg" alt="Chevron" width={32} height={32} />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PeriodTracking;
