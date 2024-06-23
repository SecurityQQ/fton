import { useTranslations } from 'next-intl';
import React from 'react';

import CalendarNumber from '@/components/ui/CalendarNumber';
import {
  getCalendarNumberType,
  predictOvulationAndPeriod,
  isFutureDate,
} from '@/utils/periodDates';

type MiniCalendarProps = {
  lastMenstruationDate: Date;
  cycleLength: number;
};

const MiniCalendar: React.FC<MiniCalendarProps> = ({ lastMenstruationDate, cycleLength }) => {
  const today = new Date();
  const periodDays = [lastMenstruationDate]; // Assuming lastMenstruationDate is the only period day for this context
  const firstDayOfLastPeriod = lastMenstruationDate;
  const isEditing = false; // Assuming MiniCalendar is not in editing mode
  const changes: { date: Date; action: 'add' | 'delete' }[] = []; // Assuming no changes for this context

  const t = useTranslations();
  const dayNames = [
    t('mini_calendar.day_names.0'),
    t('mini_calendar.day_names.1'),
    t('mini_calendar.day_names.2'),
    t('mini_calendar.day_names.3'),
    t('mini_calendar.day_names.4'),
    t('mini_calendar.day_names.5'),
    t('mini_calendar.day_names.6'),
  ];

  const generateNext7Days = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const dates = generateNext7Days();

  const getOrderedDayNames = () => {
    const startIndex = today.getDay(); // getDay() returns 0 for Sunday, so adjust
    const orderedDays = [...dayNames.slice(startIndex), ...dayNames.slice(0, startIndex)];
    return orderedDays;
  };

  const orderedDayNames = getOrderedDayNames();

  console.log('orderedDayNames', orderedDayNames);

  return (
    <div className="flex w-full justify-between">
      {orderedDayNames.map((day, index) => {
        const date = dates[index];
        const type = getCalendarNumberType(
          date,
          periodDays,
          firstDayOfLastPeriod,
          cycleLength,
          today,
          isEditing,
          changes
        );

        const isToday = date.toDateString() === today.toDateString();

        return (
          <div className="mt-7 flex flex-col items-center gap-1.5" key={index}>
            <span
              key={index}
              className={`w-10 text-center text-calendarDays ${
                isToday ? 'text-bright-blue' : 'text-bright-blue opacity-60'
              }`}>
              {isToday ? t('mini_calendar.today') : day}
            </span>
            <CalendarNumber type={type} number={date.getDate()} />
          </div>
        );
      })}
    </div>
  );
};

export default MiniCalendar;
