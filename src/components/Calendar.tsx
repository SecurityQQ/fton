import React, { useState, useEffect } from 'react';

import MiniCalendar from './MiniCalendar';

type CalendarProps = {
  lastMenstruationDate?: Date; // Made optional
  cycleLength: number;
  mode: 'mini' | 'full';
  isEditing: boolean;
  onEdit: () => void;
  onSave: (date: Date) => Promise<void>;
};

const Calendar: React.FC<CalendarProps> = ({
  lastMenstruationDate,
  cycleLength,
  mode,
  isEditing,
  onEdit,
  onSave,
}) => {
  const [months, setMonths] = useState<Date[]>([]);
  const [currentPeriodDate, setCurrentPeriodDate] = useState<Date | undefined>(
    lastMenstruationDate
  );

  useEffect(() => {
    const initialMonths = [];
    for (let i = -1; i <= 1; i++) {
      initialMonths.push(new Date(new Date().getFullYear(), new Date().getMonth() + i, 1));
    }
    setMonths(initialMonths);
  }, []);

  const loadPreviousMonth = () => {
    setMonths((prev) => [new Date(prev[0].getFullYear(), prev[0].getMonth() - 1, 1), ...prev]);
  };

  const loadNextMonth = () => {
    setMonths((prev) => [
      ...prev,
      new Date(prev[prev.length - 1].getFullYear(), prev[prev.length - 1].getMonth() + 1, 1),
    ]);
  };

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const generateDates = (month: Date) => {
    const startOfMonth = new Date(month.getFullYear(), month.getMonth(), 1);
    const endOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0);
    const daysInPrevMonth = daysInMonth(new Date(month.getFullYear(), month.getMonth() - 1));
    const startDay = startOfMonth.getDay();
    const daysInCurrentMonth = daysInMonth(month);

    const dates = [];

    // Fill dates from previous month
    for (let i = startDay - 1; i >= 0; i--) {
      dates.push(new Date(month.getFullYear(), month.getMonth() - 1, daysInPrevMonth - i));
    }

    // Fill dates from current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      dates.push(new Date(month.getFullYear(), month.getMonth(), i));
    }

    // Fill dates from next month
    const nextMonthDays = 42 - dates.length; // 42 to fill the calendar grid
    for (let i = 1; i <= nextMonthDays; i++) {
      dates.push(new Date(month.getFullYear(), month.getMonth() + 1, i));
    }

    return dates;
  };

  const today = new Date();
  const daysSinceLastPeriod = currentPeriodDate
    ? Math.floor((today.getTime() - new Date(currentPeriodDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  const isFutureDate = (date: Date) => date > today;

  const handleDateClick = async (date: Date) => {
    if (isEditing) {
      setCurrentPeriodDate(date);
      await onSave(date);
    }
  };

  if (mode === 'mini') {
    return (
      <MiniCalendar
        lastMenstruationDate={currentPeriodDate || new Date()} // Default to current date if not set
        cycleLength={cycleLength}
      />
    );
  }

  return (
    <div className="bg-telegram-bg flex h-full flex-col items-center gap-2 overflow-y-scroll">
      {months.map((month, index) => (
        <div key={index} className="w-full px-4">
          <header className="bg-telegram-secondary flex w-full items-center justify-center py-2">
            <h1 className="text-telegram-text text-lg font-semibold">
              {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </h1>
          </header>

          <div className="grid w-full grid-cols-7 gap-1">
            {generateDates(month).map((date, index) => {
              const isCurrentMonth = date.getMonth() === month.getMonth();
              const daysFromStartOfCycle = currentPeriodDate
                ? Math.floor(
                    (date.getTime() - new Date(currentPeriodDate).getTime()) / (1000 * 60 * 60 * 24)
                  ) % cycleLength
                : undefined;
              const isPeriod =
                daysFromStartOfCycle !== undefined &&
                daysFromStartOfCycle >= 0 &&
                daysFromStartOfCycle < 5;
              const isOvulation =
                daysFromStartOfCycle !== undefined &&
                daysFromStartOfCycle >= 12 &&
                daysFromStartOfCycle < 17;
              const isToday = date.toDateString() === today.toDateString();
              const futurePeriod = isPeriod && isFutureDate(date);
              const futureOvulation = isOvulation && isFutureDate(date);
              const showPeriod = isPeriod && date >= (currentPeriodDate || date);
              const showOvulation = isOvulation && date >= (currentPeriodDate || date);

              return (
                <div key={index} className="flex flex-col items-center">
                  <div
                    className={`flex size-10 items-center justify-center rounded-full ${
                      isEditing
                        ? 'border-2 border-gray-300'
                        : showPeriod
                        ? futurePeriod
                          ? 'border-2 border-dashed border-[#F67DBE]'
                          : 'bg-gradient-to-b from-[#E494BF4D] to-[#F67DBE]'
                        : showOvulation
                        ? futureOvulation
                          ? 'border-2 border-dashed border-[#3290F8]'
                          : 'bg-gradient-to-b from-[#A3CFFF] to-[#3290F8]'
                        : isToday
                        ? 'bg-[#DCF2FF] font-bold text-bright-blue'
                        : 'bg-transparent'
                    } ${!isCurrentMonth ? 'text-gray-400' : 'text-telegram-text'}`}
                    onClick={() => handleDateClick(date)}>
                    {date.getDate()}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
      <div className="fixed bottom-16 mb-4 flex w-full justify-center">
        <button
          className="text-telegram-button-text flex h-9 w-64 items-center justify-center rounded-full bg-bright-blue p-0 text-sm font-semibold"
          onClick={isEditing ? () => onSave(currentPeriodDate || new Date()) : onEdit}>
          {isEditing ? 'СОХРАНИТЬ' : 'ИЗМЕНИТЬ ДАТЫ МЕСЯЧНЫХ'}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
