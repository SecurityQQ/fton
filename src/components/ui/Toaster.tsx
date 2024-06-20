// components/ui/Toaster.tsx
import classNames from 'classnames';
import React from 'react';

type ToasterProps = {
  message: string;
  className?: string;
};

const Toaster: React.FC<ToasterProps> = ({ message, className }) => {
  return (
    <div
      className={classNames(
        'flex flex-row justify-center items-center p-2.5 gap-2.5',
        'relative w-[361px] h-[54px]',
        'bg-[#FFDEED] rounded-[20px]',
        className
      )}>
      <span
        className={classNames(
          'w-[349px] h-[34px]',
          'font-medium text-[14px] leading-[17px] text-center',
          'bg-clip-text text-transparent bg-gradient-to-b from-[#FF668A] to-[#FF4EB8]'
        )}>
        {message}
      </span>
    </div>
  );
};

export default Toaster;
