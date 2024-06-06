import React from 'react';

type CalendarProps = {
  lastMenstruationDate: Date;
  cycleLength: number;
  mode: 'mini' | 'full';
};

const Calendar: React.FC<CalendarProps> = ({ lastMenstruationDate, cycleLength, mode }) => {
  const daysSinceLastPeriod = Math.floor(
    (new Date().getTime() - new Date(lastMenstruationDate).getTime()) / (1000 * 60 * 60 * 24)
  );

  const today = new Date();
  let dates = [];

  if (mode === 'mini') {
    dates = Array.from({ length: 7 }, (_, index) => {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      return date;
    });
  } else {
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    const daysInMonth = endOfMonth.getDate();

    dates = Array.from({ length: daysInMonth }, (_, index) => {
      const date = new Date(startOfMonth);
      date.setDate(startOfMonth.getDate() + index);
      return date;
    });
  }

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="mt-4 flex flex-col items-center gap-2">
      <div className="flex items-center gap-2">
        {dayNames.map((day, index) => (
          <span key={index} className="w-8 text-center text-gray-400">
            {day}
          </span>
        ))}
      </div>
      <div className={`grid ${mode === 'mini' ? 'grid-cols-7' : 'grid-cols-7 gap-1'}`}>
        {dates.map((date, index) => {
          const cycleDay =
            (daysSinceLastPeriod + (mode === 'mini' ? index : date.getDate() - 1)) % cycleLength;
          const isOvulation = cycleDay >= 12 && cycleDay <= 17;
          const isPeriod = cycleDay >= 1 && cycleDay <= 5;
          const isToday = date.toDateString() === today.toDateString();

          return (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`flex size-8 items-center justify-center rounded-full ${
                  isToday
                    ? 'bg-gradient-to-b from-[#A3CFFF] to-[#3290F8] text-white'
                    : isPeriod
                    ? 'bg-gradient-to-b from-[#FFA3A3] to-[#F83232] text-white'
                    : isOvulation
                    ? 'bg-gradient-to-b from-[#A3FFA3] to-[#32F832] text-white'
                    : 'bg-transparent'
                } ${isToday ? 'text-white' : isOvulation ? 'text-white' : 'text-gray-400'}`}>
                {date.getDate()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
