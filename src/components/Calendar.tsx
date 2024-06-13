import React, { useState, useEffect } from 'react';

type CalendarProps = {
  periodDays: Date[]; // Array of period days
  cycleLength: number;
  isEditing: boolean;
  onEdit: () => void;
  onSave: (changes: { date: Date; action: 'add' | 'delete' }[]) => Promise<void>;
};

const Calendar: React.FC<CalendarProps> = ({
  periodDays,
  cycleLength,
  isEditing,
  onEdit,
  onSave,
}) => {
  const [months, setMonths] = useState<Date[]>([]);
  const [changes, setChanges] = useState<{ date: Date; action: 'add' | 'delete' }[]>([]);

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
    const daysInCurrentMonth = daysInMonth(month);

    const dates = [];

    // Fill dates from current month
    for (let i = 1; i <= daysInCurrentMonth; i++) {
      dates.push(new Date(month.getFullYear(), month.getMonth(), i));
    }

    return dates;
  };

  const today = new Date();

  const isFutureDate = (date: Date) => date > today;

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

  const predictOvulationAndPeriod = (date: Date) => {
    if (!isFutureDate(date)) {
      return { isPeriod: false, isOvulation: false };
    }

    const lastPeriodDate = periodDays[periodDays.length - 1];
    const daysSinceLastPeriod = Math.floor(
      (date.getTime() - new Date(lastPeriodDate).getTime()) / (1000 * 60 * 60 * 24)
    );

    const cycleDay = daysSinceLastPeriod % cycleLength;
    const isPeriod = cycleDay >= 0 && cycleDay < 5;
    const isOvulation = cycleDay >= 12 && cycleDay < 17;

    return { isPeriod, isOvulation };
  };

  const renderCalendar = () => {
    return months.map((month, index) => (
      <div key={index} className="w-full px-4">
        <header className="bg-telegram-secondary flex w-full items-center justify-center py-2">
          <h1 className="text-telegram-text text-lg font-semibold">
            {month.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </h1>
        </header>

        <div className="grid w-full grid-cols-7 gap-1">
          {generateDates(month).map((date, index) => {
            const isCurrentMonth = date.getMonth() === month.getMonth();
            const isPeriodDay = periodDays.some(
              (periodDate) => periodDate.toDateString() === date.toDateString()
            );
            const { isPeriod, isOvulation } = predictOvulationAndPeriod(date);
            const isToday = date.toDateString() === today.toDateString();
            const futurePeriod = isPeriod && isFutureDate(date);
            const futureOvulation = isOvulation && isFutureDate(date);
            const showPeriod = isPeriodDay || isPeriod;
            const showOvulation = isOvulation;
            const isInChanges = changes.some(
              (change) => change.date.toDateString() === date.toDateString()
            );

            const getBackgroundColor = () => {
              if (isEditing) {
                if (isPeriodDay) {
                  return isInChanges
                    ? 'bg-transparent'
                    : 'bg-gradient-to-b from-[#FF668A] to-[#FF4EB8]';
                } else if (isInChanges) {
                  return 'bg-gradient-to-b from-[#FF668A] to-[#FF4EB8]';
                }
                return 'border-2 border-[rgba(12,47,85,0.2)]';
              }
              if (showPeriod) {
                return futurePeriod
                  ? 'border-2 border-dashed border-[#FF4EB8]'
                  : 'bg-gradient-to-b from-[#FF668A] to-[#FF4EB8]';
              }
              if (showOvulation) {
                return futureOvulation
                  ? 'border-2 border-dashed border-[#32B3EA]'
                  : 'bg-gradient-to-b from-[#007AFF] to-[#32B3EA]';
              }
              if (isToday) {
                return 'bg-[#DCF2FF]';
              }
              return 'bg-transparent';
            };

            const getTextColor = () => {
              if (isEditing) {
                if (isPeriodDay) {
                  return isInChanges ? 'text-telegram-text' : 'text-white';
                }
                if (isInChanges) {
                  return 'text-white';
                }
              }
              if (showPeriod && !futurePeriod) {
                return 'text-white';
              }
              if (isToday) {
                return 'text-[#0C2F55]';
              }
              return isCurrentMonth ? 'text-telegram-text' : 'text-gray-400';
            };

            return (
              <div key={index} className="relative flex flex-col items-center">
                <div
                  className={`flex size-8 items-center justify-center rounded-full ${getBackgroundColor()} ${
                    !isCurrentMonth ? 'text-gray-400' : 'text-telegram-text'
                  }`}
                  onClick={() => handleDateClick(date)}>
                  <span
                    className={`absolute left-1/2 top-1/2 flex h-6 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-lg font-medium${getTextColor()}`}>
                    {date.getDate()}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    ));
  };

  const handleSaveChanges = async () => {
    await onSave(changes);
    setChanges([]);
  };

  return (
    <div className="bg-telegram-bg flex h-full flex-col items-center gap-2 overflow-y-scroll">
      {renderCalendar()}
      <div className="fixed bottom-16 mb-4 flex w-full justify-center">
        <button
          className="text-telegram-button-text flex h-9 w-64 items-center justify-center rounded-full bg-bright-blue p-0 text-sm font-semibold"
          onClick={isEditing ? handleSaveChanges : onEdit}>
          {isEditing ? 'СОХРАНИТЬ' : 'ИЗМЕНИТЬ ДАТЫ МЕСЯЧНЫХ'}
        </button>
      </div>
    </div>
  );
};

export default Calendar;
