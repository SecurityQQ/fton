// components/Farming.tsx
import { MessageSquareHeart, Rss, UserPlus } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import FarmingTracker from '@/components/ui/FarmingTracker';
import { useUser } from '@/contexts/UserContext';

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

const Farming: React.FC<object> = () => {
  const { user, refetchUser, farmingSession, farmingSessionLoading, refetchFarmingSession } =
    useUser();
  const [isFarming, setIsFarming] = useState(false);
  const [timeStart, setTimeStart] = useState<Date | null>(null);
  const [timeFinish, setTimeFinish] = useState<Date | null>(null);

  useEffect(() => {
    if (farmingSession) {
      const now = new Date().getTime();
      const finishTime = new Date(farmingSession.timeFinish).getTime();
      const startTime = finishTime - 8 * 60 * 60 * 1000; // 8 hours before finish
      if (now < finishTime) {
        setIsFarming(true);
        setTimeStart(new Date(startTime));
        setTimeFinish(new Date(finishTime));
      }
    } else {
      setIsFarming(false);
    }
  }, [farmingSession]);

  const handleFarmingStart = async () => {
    if (!user) return;
    try {
      const response = await fetch('/api/farming/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: user.id }),
      });
      if (response.ok) {
        refetchFarmingSession(); // Refresh session data
      } else {
        console.error('Failed to start farming session');
      }
    } catch (error) {
      console.error('Error starting farming session:', error);
    }
  };

  const handleViewInfo = (type: 'details' | 'history') => {
    // Handle view info logic
  };

  const handleFarmingFinish = async () => {
    setIsFarming(false);
    await refetchFarmingSession(); // Refetch the latest farming session
    await refetchUser();
  };

  return (
    <div className="relative mx-auto flex w-full flex-col gap-2 p-0">
      <FarmingTracker
        tokenBalance={user?.tokenBalance ?? 0}
        isFarming={isFarming}
        timeStart={timeStart}
        timeFinish={timeFinish}
        onStartFarming={handleFarmingStart}
        onViewInfo={handleViewInfo}
        setIsFarming={setIsFarming}
        onFinishFarming={handleFarmingFinish} // Forward the finish handler
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
