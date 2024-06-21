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

  const dayNames = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'];

  const getOrderedDayNames = () => {
    const startIndex = (today.getDay() + 6) % 7; // getDay() returns 0 for Sunday, so adjust
    const orderedDays = [...dayNames.slice(startIndex), ...dayNames.slice(0, startIndex)];
    return orderedDays;
  };

  const orderedDayNames = getOrderedDayNames();

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
              {isToday ? 'СЕГОДНЯ' : day}
            </span>
            <CalendarNumber type={type} number={date.getDate()} />
          </div>
        );
      })}
    </div>
  );
};

export default MiniCalendar;
