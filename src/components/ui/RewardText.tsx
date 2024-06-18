import React from 'react';

import Coin from '@/components/ui/Coin';

interface RewardTextProps {
  value: string;
  size?: 's' | 'm' | 'l' | 'xl';
  label?: string;
  type?: 'default' | 'white';
  gradient?: 'blue' | 'pink' | 'purple' | 'orange' | 'green';
  className?: string;
}

const RewardText: React.FC<RewardTextProps> = ({
  value,
  label,
  size = 'xl',
  type = 'white',
  gradient,
  className,
}) => {
  const typeStyles = {
    s: {
      text: 'text-sm',
      coinSize: 'w-4 h-4',
    },
    m: {
      text: 'text-lg',
      coinSize: 'w-6 h-6',
    },
    l: {
      text: 'text-xl',
      coinSize: 'w-8 h-8',
    },
    xl: {
      text: 'text-4xl',
      coinSize: 'w-10 h-10',
    },
  };

  return (
    <div
      className={`relative flex w-full items-center justify-center gap-2 ${typeStyles[size].text}`}>
      <span className="font-bold">{value}</span>
      <Coin label={label} type={type} gradient={gradient} className={typeStyles[size].coinSize} />
    </div>
  );
};

export default RewardText;
