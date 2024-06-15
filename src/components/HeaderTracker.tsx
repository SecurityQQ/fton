import React, { useEffect, useState } from 'react';

import MiniCalendar from './MiniCalendar';
import recommendationsData from '../assets/recommendations.json';

type HeaderSectionProps = {
  lastMenstruationDate?: Date;
  onPeriodDateChange: () => void;
};

const getDayLabel = (days: number) => {
  if (days === 1) return 'день';
  if (days >= 2 && days <= 4) return 'дня';
  return 'дней';
};

const HeaderTracker: React.FC<HeaderSectionProps> = ({
  lastMenstruationDate,
  onPeriodDateChange,
}) => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [daysUntilNextEvent, setDaysUntilNextEvent] = useState<number>(0);
  const [eventMessage, setEventMessage] = useState<string>('');
  const [bgColor, setBgColor] = useState<string>('bg-blue-100');
  const [textColor, setTextColor] = useState<string>('text-blue-500');

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

    const phaseIndex = (daysSinceLastPeriod + 24) % recommendationsData.recommendations.length;
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
  );
};

export default HeaderTracker;
