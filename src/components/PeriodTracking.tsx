import React from 'react';

import ActionCard from './ActionCard';
import BalanceSection from './BalanceSection';
import HeaderTracker from './HeaderTracker';
import { useTonConnect } from '../hooks/useTonConnect';

type PeriodTrackingProps = {
  lastMenstruationDate?: Date;
  tokenBalance: number;
  onPeriodDateChange: () => void;
  onStartFarming: () => void;
  onViewInfo: () => void;
  onShareData: () => void;
  onInviteUser: () => void;
  onSubscribeChannels: () => void;
};

const PeriodTracking: React.FC<PeriodTrackingProps> = ({
  lastMenstruationDate,
  tokenBalance,
  onPeriodDateChange,
  onStartFarming,
  onViewInfo,
  onShareData,
  onInviteUser,
  onSubscribeChannels,
}) => {
  const { network, wallet, address } = useTonConnect();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 text-center">
      <main className="flex w-full flex-1 flex-col items-center">
        <HeaderTracker
          lastMenstruationDate={lastMenstruationDate}
          onPeriodDateChange={onPeriodDateChange}
        />

        <BalanceSection
          tokenBalance={tokenBalance}
          onStartFarming={onStartFarming}
          onViewInfo={onViewInfo}
        />

        <div className="mb-20 mt-1 w-full max-w-md">
          <ActionCard
            onClick={onShareData}
            link="/earn"
            imgSrc="/star.svg"
            imgAlt="Star"
            title="Погрузись на блокчейн"
            description="/ 1 раз"
            rewards="+ 1 000 FHC"
            bgColor="bg-orange-light"
          />
          <ActionCard
            onClick={onInviteUser}
            link="https://t.me/femaleton"
            imgSrc="/star-violet.svg"
            imgAlt="Star"
            title="Подписаться на каналы"
            description="/ канал"
            rewards="+ 300 FHC"
            bgColor="bg-violet-light/30"
          />
          <ActionCard
            onClick={onSubscribeChannels}
            link="#"
            imgSrc="/star-blue.svg"
            imgAlt="Star"
            title="Поделиться данными (скоро!)"
            description="/ бренд"
            rewards="+ 4 600 FHC"
            bgColor="bg-deep-light/30"
          />
        </div>
      </main>
    </div>
  );
};

export default PeriodTracking;
