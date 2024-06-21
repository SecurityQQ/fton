import classNames from 'classnames';
import React from 'react';

type CoinProps = {
  label?: string;
  className?: string;
  type?: 'default' | 'white';
  gradient?: 'blue' | 'pink' | 'purple' | 'orange' | 'green';
};

const Coin: React.FC<CoinProps> = ({
  label = 'F',
  className,
  type = 'default',
  gradient = 'purple',
}) => {
  const baseClass = 'relative rounded-full flex justify-center items-center';

  const typeClasses = {
    default:
      'w-10 h-10 border-4 border-[var(--font-purple-secondary)] bg-gradient-purple text-white',
    white: ``,
    // white: `border-4 border-[var(--font-${gradient}-secondary)] border-opacity-60 bg-white text-transparent`
  };

  const gradientTextStyles = {
    blue: 'text-[var(--font-blue-primary)]',
    pink: 'text-[var(--font-pink-primary)]',
    purple: '',
    orange: 'text-[var(--font-orange-primary)]',
    green: 'text-[var(--font-green-primary)]',
  };

  return (
    <div className={classNames(baseClass, typeClasses[type], className)}>
      {type === 'white' ? (
        <img src="/ftoken.svg" alt="coin" className={classNames('rounded-full', className)} />
      ) : (
        <>
          <div className="absolute rounded-full" />
          <span
            className={classNames(
              'absolute left-[44%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 italic font-bold text-xl',
              gradientTextStyles[gradient]
            )}>
            {label}
          </span>
        </>
      )}
    </div>
  );
};

export default Coin;
