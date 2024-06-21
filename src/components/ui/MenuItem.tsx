import { ChevronRightIcon } from 'lucide-react';
import React from 'react';

import Coin from '@/components/ui/Coin';

interface MenuItemProps {
  image: string;
  title: string;
  reward: string;
  onClick?: () => void;
  color?: 'blue' | 'pink' | 'purple' | 'orange' | 'dark' | 'green';
}

const MenuItem: React.FC<MenuItemProps> = ({ image, title, reward, onClick, color }) => {
  const defaultBackground = 'rgba(255, 255, 255, 0.15)';
  const backgroundColor = color ? `var(--font-${color}-secondary)` : defaultBackground;

  // TODO: this class is not adaptive for smaller screens, a fix is needed

  return (
    <div
      className="flex w-full cursor-pointer items-center gap-4 rounded-2xl p-4 transition duration-300 ease-in-out hover:bg-opacity-80"
      style={{ backgroundColor }}
      onClick={onClick}>
      <img src={image} alt="Avatar" className="size-10 shrink-0 rounded-full md:size-12" />
      <div className="flex flex-1 items-center justify-between overflow-hidden">
        <div
          className="flex max-w-[200px] flex-1 flex-col gap-1 overflow-hidden"
          style={{
            maxWidth: window.innerWidth <= 375 ? '160px' : '200px',
          }}>
          <p className="truncate whitespace-nowrap text-left text-sm font-medium">{title}</p>
          <div className="flex items-center">
            <span className="pr-1 text-lg font-bold md:text-xl">{reward}</span>
            <Coin className="size-6 md:size-8" type="white" />
          </div>
        </div>
        <ChevronRightIcon className="size-5 shrink-0 text-white opacity-90 md:size-6" />
      </div>
    </div>
  );
};

export default MenuItem;
