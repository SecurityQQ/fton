import React from 'react';

type MiniCalendarProps = {
  lastMenstruationDate: Date;
  cycleLength: number;
};

const MiniCalendar: React.FC<MiniCalendarProps> = ({ lastMenstruationDate, cycleLength }) => {
  const today = new Date();
  const daysSinceLastPeriod = Math.floor(
    (today.getTime() - new Date(lastMenstruationDate).getTime()) / (1000 * 60 * 60 * 24)
  );

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
    <div className="flex w-full items-center justify-between px-4">
      {orderedDayNames.map((day, index) => {
        const daysFromStartOfCycle = (daysSinceLastPeriod + index) % cycleLength;
        const isPeriod = daysFromStartOfCycle >= 0 && daysFromStartOfCycle < 5;
        const isOvulation = daysFromStartOfCycle >= 12 && daysFromStartOfCycle < 17;
        const date = dates[index];
        const isToday = date.toDateString() === today.toDateString();

        return (
          <div className="mt-7 flex flex-col gap-2" key={index}>
            <span
              key={index}
              className={`w-10 text-center text-sm ${
                isPeriod
                  ? isToday
                    ? 'text-bright-orange'
                    : 'text-bright-orange opacity-60'
                  : isToday
                  ? 'text-blue-bright'
                  : 'text-blue-bright opacity-60'
              }`}>
              {isToday ? 'СЕГОДНЯ' : day}
            </span>
            <div className={`${isToday ? 'pl-3' : ''}`}>
              <div
                className={`pad flex size-10 items-center justify-center rounded-full ${
                  isPeriod
                    ? 'border border-dashed border-bright-orange bg-transparent'
                    : isOvulation
                    ? 'border border-dashed border-blue-bright bg-transparent'
                    : 'bg-transparent'
                } ${
                  isPeriod ? 'text-bright-orange' : isOvulation ? 'text-blue-bright' : 'text-black'
                }`}>
                {date.getDate()}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MiniCalendar;
