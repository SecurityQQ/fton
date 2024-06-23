import { useTranslations } from 'next-intl';
import React, { useState, useEffect, useLayoutEffect } from 'react';

import Loader from '@/components/Loader';
import Button from '@/components/ui/Button';
import CalendarNumber from '@/components/ui/CalendarNumber';
import HorizontalButton from '@/components/ui/HorizontalButton';
import { useUser } from '@/contexts/UserContext';
import { isUseTon } from '@/hooks/useTelegramStorage';
import {
  daysInMonth,
  generateDates,
  isFutureDate,
  getFirstDayOfLastPeriod,
  predictOvulationAndPeriod,
  getCalendarNumberType,
} from '@/utils/periodDates';

type CalendarProps = {
  periodDays: Date[];
  cycleLength: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (changes: { date: Date; action: 'add' | 'delete' }[]) => Promise<void>;
  onCancel: () => void;
};

const Calendar: React.FC<CalendarProps> = ({
  periodDays,
  cycleLength,
  isEditing,
  onEdit,
  onSave,
  onCancel,
}) => {
  const [months, setMonths] = useState<Date[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [useTon, setUseTon] = useState<boolean>(false);
  const { menstruationsLoading } = useUser();
  const [changes, setChanges] = useState<{ date: Date; action: 'add' | 'delete' }[]>([]);
  const [firstDayOfLastPeriod, setFirstDayOfLastPeriod] = useState<Date | null>(null);
  const today = new Date();
  const t = useTranslations('calendar');

  useEffect(() => {
    const initialMonths = [];
    for (let i = -4; i <= 2; i++) {
      initialMonths.push(new Date(new Date().getFullYear(), new Date().getMonth() + i, 1));
    }
    setMonths(initialMonths);

    const fetchUseTon = async () => {
      const result = await isUseTon();
      setUseTon(result);
    };

    fetchUseTon();
  }, []);

  useLayoutEffect(() => {
    const currentMonthIndex = 3; // The index of the current month in the initialMonths array
    document.getElementById(`month-${currentMonthIndex}`)?.scrollIntoView();
  }, [months]);

  useEffect(() => {
    const fd = getFirstDayOfLastPeriod(periodDays);
    setFirstDayOfLastPeriod(fd);
  }, [periodDays]);

  const loadPreviousMonth = () => {
    setMonths((prev) => [new Date(prev[0].getFullYear(), prev[0].getMonth() - 1, 1), ...prev]);
  };

  const loadNextMonth = () => {
    setMonths((prev) => [
      ...prev,
      new Date(prev[prev.length - 1].getFullYear(), prev[prev.length - 1].getMonth() + 1, 1),
    ]);
  };

  const handleDateClick = (date: Date) => {
    if (isEditing) {
      const exists = periodDays.some(
        (periodDate) => periodDate.toDateString() === date.toDateString()
      );

      if (exists) {
        setChanges((prev) =>
          prev.some((change) => change.date.toDateString() === date.toDateString())
            ? prev.filter((change) => change.date.toDateString() !== date.toDateString())
            : [...prev, { date, action: 'delete' }]
        );
      } else {
        setChanges((prev) =>
          prev.some((change) => change.date.toDateString() === date.toDateString())
            ? prev.filter((change) => change.date.toDateString() !== date.toDateString())
            : [...prev, { date, action: 'add' }]
        );
      }
    }
  };

  const weekDays = [
    t('week_days.0'),
    t('week_days.1'),
    t('week_days.2'),
    t('week_days.3'),
    t('week_days.4'),
    t('week_days.5'),
    t('week_days.6'),
  ];

  const monthNames = [
    t('month_names.0'),
    t('month_names.1'),
    t('month_names.2'),
    t('month_names.3'),
    t('month_names.4'),
    t('month_names.5'),
    t('month_names.6'),
    t('month_names.7'),
    t('month_names.8'),
    t('month_names.9'),
    t('month_names.10'),
    t('month_names.11'),
  ];

  const renderCalendar = () => {
    return months.map((month, index) => (
      <div key={index} id={`month-${index}`} className="w-full px-4">
        <header className="bg-telegram-bg flex w-full items-center justify-center py-2">
          <h1 className="text-telegram-text text-lg font-semibold">
            {monthNames[month.getMonth()]}
          </h1>
        </header>

        <div className="grid w-full grid-cols-7 gap-1">
          {generateDates(month).map((date, index) => {
            const type = getCalendarNumberType(
              date,
              periodDays,
              firstDayOfLastPeriod,
              cycleLength,
              today,
              isEditing,
              changes
            );

            const isCurrentMonth = date.getMonth() === month.getMonth();

            return (
              <div key={index} className="relative flex flex-col items-center">
                <div
                  className={`flex size-8 items-center justify-center rounded-full ${
                    !isCurrentMonth ? 'text-gray-400' : 'text-telegram-text'
                  }`}
                  onClick={() => handleDateClick(date)}>
                  <CalendarNumber
                    type={type}
                    number={date.getDate()}
                    className={!isCurrentMonth ? 'text-gray-400' : ''}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    await onSave(changes);
    setChanges([]);
    setIsSaving(false);
  };

  const handleCancelChanges = () => {
    setChanges([]);
    onCancel();
  };

  return (
    <div className="relative h-screen w-full">
      <div className="fixed left-0 top-0 z-10 h-[56px] w-full bg-gradient-to-b from-white to-[#EEF6F8]" />
      <div className="fixed top-0 z-20 flex h-[56px] w-full items-center justify-between px-4">
        <div className="grid w-full grid-cols-7 gap-1">
          {weekDays.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-[12px] font-semibold text-text-dark opacity-60">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-telegram-bg mt-[56px] flex h-full flex-col items-center gap-2 overflow-y-scroll pb-20 pt-4">
        {renderCalendar()}
        {isSaving && <Loader />}
        <div className="fixed bottom-[91px]">
          {isEditing ? (
            <HorizontalButton
              type="blue"
              leftText={t('cancel')}
              rightText={t('save')}
              leftOnClick={handleCancelChanges}
              rightOnClick={handleSaveChanges}
            />
          ) : (
            <Button type={isSaving ? 'ghost' : 'blue'} subtype="primary" onClick={onEdit}>
              {isSaving
                ? useTon
                  ? t('saving_to_blockchain')
                  : t('saving_data')
                : t('edit_period_dates')}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;

// BUGFIX: condition isSaving for button names do not work
