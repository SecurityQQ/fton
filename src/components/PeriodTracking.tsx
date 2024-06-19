import React from 'react';

import ActionCard from '@/components/ActionCard';
import BalanceSection from '@/components/BalanceSection';
import Farming from '@/components/Farming';
import HeaderTracker from '@/components/HeaderTracker';
import InviteUserCard from '@/components/InviteUserCard';
import SubscribeChannelsCard from '@/components/SubscribeChannelsCard';
import TellAboutYourselfCard from '@/components/TellAboutYourselfCard';
import Card from '@/components/ui/Card';

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
    <div className="flex min-h-screen flex-col items-center bg-white text-gray-900">
      <header className="w-full">
        <HeaderTracker
          lastMenstruationDate={lastMenstruationDate}
          onPeriodDateChange={onPeriodDateChange}
        />
      </header>
      <main className="flex w-full flex-1 flex-col items-center px-4 py-8">
        <Farming
          tokenBalance={tokenBalance}
          onStartFarming={onStartFarming}
          onViewInfo={onViewInfo}
        />
        <div className="mb-20 mt-6 w-full max-w-md space-y-4">
          <InviteUserCard />
          <SubscribeChannelsCard />
          <TellAboutYourselfCard />
        </div>
      </main>
    </div>
  );
};

export default PeriodTracking;
