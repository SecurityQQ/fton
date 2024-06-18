// components/Farming.tsx
import { MessageSquareHeart, Rss, UserPlus } from 'lucide-react';
import React from 'react';

import FarmingTracker from '@/components/ui/FarmingTracker';

type FarmingProps = {
  tokenBalance: number;
  onStartFarming: () => void;
  onViewInfo: (type: 'details' | 'history') => void;
};

const cardClassName =
  'flex flex-col justify-between items-center p-3 gap-2 bg-[var(--font-dark-secondary)] rounded-[4px] flex-1';

const SubscribeCard: React.FC = () => {
  return (
    <div className={`${cardClassName} rounded-[4px_4px_4px_20px]`}>
      <Rss className="size-5 text-[var(--font-pink-primary)]" />
      <div className="flex grow flex-col items-center text-center">
        <h4 className="text-base font-extrabold text-[var(--font-dark-primary)] sm:text-sm">
          +300 HC
        </h4>
        <p className="text-sm font-medium text-[var(--font-dark-primary)]">Подписаться на каналы</p>
      </div>
    </div>
  );
};

const ShareCard: React.FC = () => {
  return (
    <div className={cardClassName}>
      <MessageSquareHeart className="size-5 text-[var(--font-blue-primary)]" />
      <div className="flex grow flex-col items-center text-center">
        <h4 className="text-base font-extrabold text-[var(--font-dark-primary)] sm:text-sm">
          +600 HC
        </h4>
        <p className="text-sm font-medium text-[var(--font-dark-primary)]">Рассказать о себе</p>
      </div>
    </div>
  );
};

const InviteCard: React.FC = () => {
  return (
    <div className={`${cardClassName} rounded-[4px_4px_20px_4px]`}>
      <UserPlus className="size-5 text-[var(--font-orange-primary)]" />
      <div className="flex grow flex-col items-center text-center">
        <h4 className="text-base font-extrabold text-[var(--font-dark-primary)] sm:text-sm">
          +600 HC
        </h4>
        <p className="text-sm font-medium text-[var(--font-dark-primary)]">
          Пригласить пользователя
        </p>
      </div>
    </div>
  );
};

const Farming: React.FC<FarmingProps> = ({ tokenBalance, onStartFarming, onViewInfo }) => {
  return (
    <div className="relative mx-auto flex w-full flex-col gap-2 p-0">
      <FarmingTracker
        tokenBalance={tokenBalance}
        onStartFarming={onStartFarming}
        onViewInfo={onViewInfo}
      />
      {/* Bottom Section */}
      <div className="flex size-full flex-row items-stretch gap-2 p-0">
        <SubscribeCard />
        <ShareCard />
        <InviteCard />
      </div>
    </div>
  );
};

export default Farming;
