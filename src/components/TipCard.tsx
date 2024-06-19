import React from 'react';

import Button from '@/components/ui/Button';

interface TipCardProps {
  title: string;
  day: string;
  advice: string;
  buttonText: string;
  onButtonClick: () => void;
}

const TipCard: React.FC<TipCardProps> = ({ title, day, advice, buttonText, onButtonClick }) => {
  return (
    <div>
      <div className="flex w-full flex-col items-center gap-2 p-0">
        <h3 className="text-[17px] font-medium text-white">{title}</h3>
        <h2 className="text-[38px] font-bold text-white">{day}</h2>
      </div>
      <div className="flex w-full flex-col items-center gap-2 p-2">
        <p className="text-center text-[14px] font-medium leading-[17px] text-white text-opacity-90">
          {advice}
        </p>
      </div>
      <div className="flex w-full flex-col items-center gap-[9px] p-1">
        <Button type="dark" subtype="white" onClick={onButtonClick}>
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default TipCard;
