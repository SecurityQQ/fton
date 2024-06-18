import React, { useEffect, useState } from 'react';

import MiniCalendar from './MiniCalendar';
import Button from './ui/Button';
import recommendationsData from '../assets/recommendations.json';

type HeaderSectionProps = {
  lastMenstruationDate?: Date;
  onPeriodDateChange: () => void;
};

type ButtonType = 'blue' | 'pink' | 'purple' | 'orange' | 'dark' | 'ghost' | undefined;

const getDayLabel = (days: number) => {
  if (days === 1) return 'день';
  if (days >= 2 && days <= 4) return 'дня';
  return 'дней';
};

const calculateNextEvent = (daysSinceLastPeriod: number, cycleLength: number) => {
  const daysUntilNextPeriod = cycleLength - (daysSinceLastPeriod % cycleLength);

  if (daysSinceLastPeriod < 5) {
    return {
      eventName: 'menstruation',
      eventMessage: 'Месячные будут',
      daysUntilNextEvent: 5 - daysSinceLastPeriod,
      pregnancyChance: 'Есть вероятность забеременеть',
      eventColor: 'text-gradient-pink',
      pregnancyChanceColor: 'text-[var(--font-pink-primary)]',
      buttonType: 'pink' as ButtonType,
      buttonText: 'ИЗМЕНИТЬ ДАТЫ МЕСЯЧНЫХ',
    };
  } else if (daysSinceLastPeriod >= 12 && daysSinceLastPeriod < 17) {
    return {
      eventName: 'ovulation',
      eventMessage: 'Овуляция через',
      daysUntilNextEvent: 17 - daysSinceLastPeriod,
      pregnancyChance: 'Высокая вероятность забеременеть',
      eventColor: 'text-gradient-blue',
      pregnancyChanceColor: 'text-[var(--font-blue-primary)]',
      buttonType: 'blue' as ButtonType,
      buttonText: 'ОТКРЫТЬ КАЛЕНДАРЬ',
    };
  } else if (daysUntilNextPeriod <= 5) {
    return {
      eventName: 'menstruation',
      eventMessage: 'Месячные через',
      daysUntilNextEvent: daysUntilNextPeriod,
      pregnancyChance: 'Низкая вероятность забеременеть',
      eventColor: 'text-gradient-pink',
      pregnancyChanceColor: 'text-[var(--font-pink-primary)]',
      buttonType: 'pink' as ButtonType,
      buttonText: 'ОТМЕТИТЬ МЕСЯЧНЫЕ',
    };
  } else {
    return {
      eventName: 'default',
      eventMessage: 'Месячные через',
      daysUntilNextEvent: daysUntilNextPeriod,
      pregnancyChance: 'Низкая вероятность забеременеть',
      eventColor: 'text-[var(--font-dark-primary)]',
      pregnancyChanceColor: 'text-[var(--font-dark-primary)]',
      buttonType: 'pink' as ButtonType,
      buttonText: 'ОТКРЫТЬ КАЛЕНДАРЬ',
    };
  }
};

const HeaderTracker: React.FC<HeaderSectionProps> = ({
  lastMenstruationDate,
  onPeriodDateChange,
}) => {
  const [recommendation, setRecommendation] = useState<string>('');
  const [daysSinceLastPeriod, setDaysSinceLastPeriod] = useState<number>(0);
  const [nextEvent, setNextEvent] = useState<ReturnType<typeof calculateNextEvent> | null>(null);

  const cycleLength = 28;

  useEffect(() => {
    if (!lastMenstruationDate) {
      setRecommendation('Чтобы воспользоваться трекером, обновите дату последних месячных');
      setNextEvent({
        eventName: 'Чтобы воспользоваться приложением введите дату',
        eventMessage: 'Дата последних месячных не указана',
        daysUntilNextEvent: 0,
        pregnancyChance: '',
        eventColor: 'text-[var(--font-dark-primary)]',
        pregnancyChanceColor: 'text-[var(--font-dark-primary)]',
        buttonType: 'dark' as ButtonType,
        buttonText: 'ОТКРЫТЬ КАЛЕНДАРЬ',
      });
      return;
    }

    const today = new Date();
    const daysSinceLastPeriodCalc = Math.floor(
      (today.getTime() - new Date(lastMenstruationDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    setDaysSinceLastPeriod(daysSinceLastPeriodCalc);

    const phaseIndex = (daysSinceLastPeriodCalc + 24) % recommendationsData.recommendations.length;
    setRecommendation(recommendationsData.recommendations[phaseIndex]);

    const calculatedEvent = calculateNextEvent(daysSinceLastPeriodCalc, cycleLength);
    setNextEvent(calculatedEvent);
  }, [lastMenstruationDate]);

  if (!nextEvent) return null;

  return (
    <div className="relative flex w-full flex-col items-center overflow-hidden pb-4">
      <img src="/bgelipse.svg" alt="Background" className="object-overlay absolute z-0 size-full" />
      <div className="relative z-10 flex w-full flex-col items-center px-4">
        {lastMenstruationDate ? (
          <div className="w-full">
            <MiniCalendar lastMenstruationDate={lastMenstruationDate} cycleLength={cycleLength} />
          </div>
        ) : null}
        <div className="mb-4 w-full max-w-md p-2 text-center">
          <p className={`${nextEvent.pregnancyChanceColor} text-lg`}>{nextEvent.pregnancyChance}</p>
          <p className="text-xl text-[var(--font-dark-primary)]">{nextEvent.eventMessage}</p>
          {lastMenstruationDate && (
            <h2 className={`mt-2 text-5xl font-bold ${nextEvent.eventColor}`}>
              {nextEvent.daysUntilNextEvent} {getDayLabel(nextEvent.daysUntilNextEvent)}
            </h2>
          )}
          <Button
            onClick={onPeriodDateChange}
            type={nextEvent.buttonType}
            subtype="primary"
            className="mx-auto my-2 w-fit min-w-[80%] px-4">
            {nextEvent.buttonText}
          </Button>
          <Button type={nextEvent.buttonType} subtype="secondary" className="mx-auto w-3/4">
            СМОТРЕТЬ СОВЕТ ДНЯ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTracker;
