import React, { useState, useEffect } from 'react';

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
  const [changes, setChanges] = useState<{ date: Date; action: 'add' | 'delete' }[]>([]);
  const [firstDayOfLastPeriod, setFirstDayOfLastPeriod] = useState<Date | null>(null);

  useEffect(() => {
    const initialMonths = [];
    for (let i = -1; i <= 1; i++) {
      initialMonths.push(new Date(new Date().getFullYear(), new Date().getMonth() + i, 1));
    }
    setMonths(initialMonths);
  }, []);

  useEffect(() => {
    setFirstDayOfLastPeriod(getFirstDayOfLastPeriod());
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

  const daysInMonth = (date: Date) =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

  const generateDates = (month: Date) => {
    const daysInCurrentMonth = daysInMonth(month);
    const dates = [];

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

  const getFirstDayOfLastPeriod = () => {
    if (periodDays.length === 0) return null;

    const sortedPeriodDays = [...periodDays].sort((a, b) => a.getTime() - b.getTime());
    let firstDayOfLastPeriod = sortedPeriodDays[sortedPeriodDays.length - 1];

    const maxCheckDays = Math.min(5, sortedPeriodDays.length);

    for (let i = 1; i < maxCheckDays; i++) {
      const currentDay = sortedPeriodDays[sortedPeriodDays.length - i];
      const previousDay = sortedPeriodDays[sortedPeriodDays.length - i - 1];

      if ((currentDay.getTime() - previousDay.getTime()) / (1000 * 60 * 60 * 24) >= 2) {
        break;
      }

      firstDayOfLastPeriod = previousDay;
    }

    return firstDayOfLastPeriod;
  };

  const predictOvulationAndPeriod = (date: Date) => {
    if (!isFutureDate(date) || !firstDayOfLastPeriod) {
      return { isPeriod: false, isOvulation: false, isMaybePeriod: false };
    }

    const daysSinceFirstPeriod = Math.floor(
      (date.getTime() - new Date(firstDayOfLastPeriod).getTime()) / (1000 * 60 * 60 * 24)
    );

    const cycleDay = daysSinceFirstPeriod % cycleLength;
    const isPeriod = cycleDay >= 0 && cycleDay < 5;
    const isMaybePeriod = cycleDay === 5;
    const isOvulation = cycleDay >= 12 && cycleDay < 17;

    return { isPeriod, isOvulation, isMaybePeriod };
  };

  const renderCalendar = () => {
    const weekDays = ['П', 'В', 'С', 'Ч', 'П', 'С', 'В'];

    return months.map((month, index) => (
      <div key={index} className="w-full px-4">
        <header className="bg-telegram-bg flex w-full items-center justify-center py-2">
          <h1 className="text-telegram-text text-lg font-semibold">
            {month.toLocaleString('default', { month: 'long' })}
          </h1>
        </header>

        <div className="grid w-full grid-cols-7 gap-1">
          {generateDates(month).map((date, index) => {
            const isCurrentMonth = date.getMonth() === month.getMonth();
            const isPeriodDay = periodDays.some(
              (periodDate) => periodDate.toDateString() === date.toDateString()
            );
            const { isPeriod, isOvulation, isMaybePeriod } = predictOvulationAndPeriod(date);
            const isToday = date.toDateString() === today.toDateString();
            const futurePeriod = isPeriod && isFutureDate(date);
            const futureOvulation = isOvulation && isFutureDate(date);
            const futureMaybePeriod = isMaybePeriod && isFutureDate(date);
            const showPeriod = isPeriodDay || isPeriod;
            const showOvulation = isOvulation;
            const showMaybePeriod = isMaybePeriod;
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
              if (showMaybePeriod) {
                return 'border-2 border-dashed border-grey-700';
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
                return 'text-black';
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
                    className={`absolute left-1/2 top-1/2 flex h-6 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center text-lg font-medium ${getTextColor()}`}>
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

  const handleCancelChanges = () => {
    setChanges([]);
    onCancel();
  };

  return (
    <div className="relative h-screen w-full">
      <div className="fixed left-0 top-0 z-10 h-[56px] w-full bg-gradient-to-b from-white to-[#EEF6F8]" />
      <div className="fixed top-0 z-20 flex h-[56px] w-full items-center justify-between px-4">
        <div className="grid w-full grid-cols-7 gap-1">
          {['П', 'В', 'С', 'Ч', 'П', 'С', 'В'].map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-[12px] font-semibold text-text-dark opacity-60">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-telegram-bg mt-[56px] flex h-full flex-col items-center gap-2 overflow-y-scroll">
        {renderCalendar()}
        {isEditing ? (
          <div className="absolute bottom-[91px] left-1/2 flex h-[33px] w-[259px] -translate-x-1/2 flex-row items-start gap-2">
            <button
              className="flex h-[33px] w-[128.5px] items-center justify-center gap-1.5 rounded-l-[30px] rounded-r-[4px] bg-[#DCF2FF] px-5 py-2 text-[14px] font-semibold uppercase"
              onClick={handleCancelChanges}>
              <span className="bg-gradient-to-b from-[#007AFF] to-[#32B3EA] bg-clip-text text-transparent">
                Отмена
              </span>
            </button>
            <button
              className="flex h-[33px] w-[128.5px] items-center justify-center gap-1.5 rounded-l-[4px] rounded-r-[30px] bg-gradient-to-b from-[#007AFF] to-[#32B3EA] px-5 py-2 text-[14px] font-semibold uppercase text-white"
              onClick={handleSaveChanges}>
              Сохранить
            </button>
          </div>
        ) : (
          <div className="fixed bottom-[91px] flex w-full justify-center">
            <button
              className="flex h-[33px] w-[243px] items-center justify-center gap-1.5 rounded-[30px] bg-gradient-to-b from-[#007AFF] to-[#32B3EA] px-5 py-2 text-[14px] font-semibold uppercase text-white"
              onClick={onEdit}>
              ИЗМЕНИТЬ ДАТЫ МЕСЯЧНЫХ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
