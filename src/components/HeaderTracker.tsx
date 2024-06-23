import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';

import TipCard from '@/components/TipCard';
import {
  DefaultEvent,
  getDayLabel,
  calculateNextEvent,
  CalendarEventButtonType,
} from '@/utils/periodDates';

import MiniCalendar from './MiniCalendar';
import Button from './ui/Button';
import { useModal } from '../contexts/ModalContext';

type HeaderSectionProps = {
  lastMenstruationDate?: Date;
  onPeriodDateChange: () => void;
};

const HeaderTracker: React.FC<HeaderSectionProps> = ({
  lastMenstruationDate,
  onPeriodDateChange,
}) => {
  const { openModal, closeModal } = useModal();
  const t = useTranslations();

  const [recommendation, setRecommendation] = useState<string>('');
  const [daysSinceLastPeriod, setDaysSinceLastPeriod] = useState<number>(0);
  const [nextEvent, setNextEvent] = useState<ReturnType<typeof calculateNextEvent> | null>(null);

  const cycleLength = 28;

  useEffect(() => {
    if (!lastMenstruationDate) {
      setRecommendation(t('header_tracker.no_last_period_date'));
      setNextEvent(DefaultEvent);
      return;
    }

    const today = new Date();
    const daysSinceLastPeriodCalc = Math.floor(
      (today.getTime() - new Date(lastMenstruationDate).getTime()) / (1000 * 60 * 60 * 24)
    );
    setDaysSinceLastPeriod(daysSinceLastPeriodCalc);

    const phaseIndex = daysSinceLastPeriodCalc % t('header_tracker.recommendations').length;

    setRecommendation(t(`header_tracker.recommendations.${phaseIndex}`));

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
          <p className={`${nextEvent.pregnancyChanceColor} text-lg`}>
            {t(nextEvent.pregnancyChance)}
          </p>
          <p className="text-xl text-[var(--font-dark-primary)]">{t(nextEvent.eventMessage)}</p>
          {lastMenstruationDate && (
            <h2 className={`mt-2 text-5xl font-bold ${nextEvent.eventColor}`}>
              {nextEvent.daysUntilNextEvent}{' '}
              {t('header_tracker.day_label', { days: nextEvent.daysUntilNextEvent })}
            </h2>
          )}
          <Button
            onClick={onPeriodDateChange}
            type={nextEvent.buttonType}
            subtype="primary"
            className="mx-auto my-2 w-fit min-w-[80%] px-4">
            {t(nextEvent.buttonText)}
          </Button>
          <Button
            type={nextEvent.buttonType}
            subtype="secondary"
            className="mx-auto w-3/4"
            onClick={() =>
              openModal(
                <TipCard
                  title={t('header_tracker.tip_of_the_day')}
                  day={t('header_tracker.day_of_cycle', {
                    day: (daysSinceLastPeriod + 1) % t.raw('header_tracker.recommendations').length,
                  })}
                  advice={recommendation}
                  buttonText={t('header_tracker.tip_button_text')}
                  onButtonClick={closeModal}
                />
              )
            }>
            {t('header_tracker.view_tip_of_the_day')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeaderTracker;
