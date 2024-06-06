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

  const dayNames = ['П', 'Вт', 'Ср', 'Че', 'П', 'Сб', 'Во'];

  const getOrderedDayNames = () => {
    const startIndex = (today.getDay() + 6) % 7; // getDay() returns 0 for Sunday, so adjust
    const orderedDays = [...dayNames.slice(startIndex), ...dayNames.slice(0, startIndex)];
    return orderedDays;
  };

  const orderedDayNames = getOrderedDayNames();

  return (
    <div className="mt-4 flex flex-col items-center gap-4">
      <div className="flex w-full justify-between px-4">
        {orderedDayNames.map((day, index) => {
          const daysFromStartOfCycle = (daysSinceLastPeriod + index) % cycleLength;
          const isPeriod = daysFromStartOfCycle >= 0 && daysFromStartOfCycle < 5;
          const isToday = index === 0; // First element corresponds to today

          return (
            <span
              key={index}
              className={`w-10 text-center text-sm ${
                isPeriod
                  ? isToday
                    ? 'text-[#F76F45]'
                    : 'text-[#F76F45]'
                  : isToday
                  ? 'text-[#007AFF]'
                  : 'text-[#65C7FF]'
              }`}>
              {isToday ? 'СЕГОДНЯ' : day}
            </span>
          );
        })}
      </div>
      <div className="grid w-full grid-cols-7 gap-6 px-4">
        {dates.map((date, index) => {
          const daysFromStartOfCycle = (daysSinceLastPeriod + index) % cycleLength;
          const isPeriod = daysFromStartOfCycle >= 0 && daysFromStartOfCycle < 5;
          const isOvulation = daysFromStartOfCycle >= 12 && daysFromStartOfCycle < 17;
          const isToday = date.toDateString() === today.toDateString();

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex size-10 items-center justify-center rounded-full ${
                  isPeriod
                    ? 'bg-[#FFD3C6]'
                    : isOvulation
                    ? 'bg-gradient-to-b from-[#A3CFFF] to-[#3290F8]'
                    : isToday
                    ? 'bg-[#DCF2FF] font-bold text-[#007AFF]'
                    : 'bg-transparent'
                } ${!isPeriod && !isOvulation && !isToday ? 'text-[#65C7FF]' : 'text-black'}`}>
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniCalendar;
