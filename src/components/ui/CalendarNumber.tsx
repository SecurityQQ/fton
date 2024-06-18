import classNames from 'classnames';
import React from 'react';

type CalendarNumberProps = {
  type:
    | 'default'
    | 'today'
    | 'periodPast'
    | 'periodFuture'
    | 'ovulationPast'
    | 'ovulationFuture'
    | 'select'
    | 'selected';
  number: number;
  className?: string;
};

const CalendarNumber: React.FC<CalendarNumberProps> = ({ type, number, className }) => {
  const baseStyles =
    'w-8 h-8 flex items-center justify-center rounded-full font-medium text-lg relative';

  const typeStyles = {
    default: 'text-[var(--font-dark-primary)]',
    today: 'bg-[var(--font-blue-secondary)] text-[var(--font-dark-primary)]',
    periodPast: 'bg-gradient-pink text-white',
    periodFuture:
      'text-[var(--font-pink-primary)] relative before:content-[""] before:border-dashed before:border-[0.95px] before:border-[var(--font-pink-primary)] before:rounded-full before:absolute before:inset-0 before:m-[2px] before:h-[calc(100%-4px)] before:w-[calc(100%-4px)]',
    ovulationPast: 'bg-gradient-blue text-white',
    ovulationFuture:
      'text-[var(--font-blue-primary)] relative before:content-[""] before:border-dashed before:border-[0.95px] before:border-[var(--font-blue-primary)] before:rounded-full before:absolute before:inset-0 before:m-[2px] before:h-[calc(100%-4px)] before:w-[calc(100%-4px)]',
    select: 'border-2 border-[var(--font-dark-secondary)] text-[var(--font-dark-primary)]',
    selected:
      'border-2 border-[var(--font-pink-primary)] bg-[var(--font-pink-secondary)] text-[var(--font-pink-primary)]',
  };

  return <div className={classNames(baseStyles, typeStyles[type], className)}>{number}</div>;
};

export default CalendarNumber;
