import React, { useState, useEffect } from 'react';

import Button from '@/components/ui/Button';
import Coin from '@/components/ui/Coin';

import styles from './FarmingTracker.module.css';

type FarmingTrackerProps = {
  tokenBalance: number;
  isFarming: boolean;
  timeStart: Date | null;
  timeFinish: Date | null;
  onStartFarming: () => void;
  onViewInfo: (type: 'details' | 'history') => void;
  setIsFarming: (isFarming: boolean) => void;
  onFinishFarming: () => void; // Added prop to handle farming finish
};

const FarmingTracker: React.FC<FarmingTrackerProps> = ({
  tokenBalance,
  isFarming,
  timeStart,
  timeFinish,
  onStartFarming,
  onViewInfo,
  setIsFarming,
  onFinishFarming,
}) => {
  const [timeLeft, setTimeLeft] = useState(0);
  const [farmingCounter, setFarmingCounter] = useState(Math.round(tokenBalance) || 0);
  const [previousCounter, setPreviousCounter] = useState(Math.round(tokenBalance) || 0);
  const rewardRate = 7200 / (8 * 60 * 60); // Assuming reward is 7200 for 8 hours
  const rewardRatePerHour = 7200 / (8 * 60); // Assuming reward is 7200 for 8 hours

  useEffect(() => {
    const calculateTimeLeft = () => {
      if (timeFinish) {
        const now = new Date().getTime();
        const finishTime = new Date(timeFinish).getTime();
        const tls = Math.max(Math.floor((finishTime - now) / 1000), 0); // time left in seconds
        return tls;
      }
      return 0;
    };

    setTimeLeft(calculateTimeLeft());

    let timer: NodeJS.Timeout;
    if (isFarming) {
      timer = setInterval(() => {
        const newTimeLeft = calculateTimeLeft();
        if (newTimeLeft <= 0 && timeFinish) {
          setIsFarming(false);

          console.log('time is over: almost ready to onFinishFarming', newTimeLeft, timeFinish);
          onFinishFarming(); // Call onFinishFarming when farming is done
          clearInterval(timer);
        } else {
          const secondsElapsed = 8 * 60 * 60 - newTimeLeft; // 8 hours in seconds minus time left
          const newCounter = Math.round(tokenBalance + secondsElapsed * rewardRate);
          setPreviousCounter(farmingCounter);
          setFarmingCounter(newCounter);
          setTimeLeft(newTimeLeft);
        }
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [
    isFarming,
    timeStart,
    timeFinish,
    farmingCounter,
    tokenBalance,
    setIsFarming,
    onFinishFarming,
  ]);

  const handleStartFarming = () => {
    onStartFarming();
    setIsFarming(true);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const renderDigit = (digit: string, index: number) => {
    const previousDigit = previousCounter.toString().padStart(6, '0')[index];

    return (
      <span key={index} className="relative inline-block h-10 w-6 overflow-hidden">
        <span
          className={`text-gradient-purple absolute inset-x-0 ${
            previousDigit !== digit ? styles.spinAnimation : ''
          }`}>
          {digit}
        </span>
      </span>
    );
  };

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center gap-1.5 rounded-b-[4px] rounded-t-[40px] bg-[var(--font-dark-secondary)] p-4">
      {/* Title Section */}
      <div className="flex w-full max-w-[313px] flex-col items-center gap-2 p-0">
        <div className="flex flex-row items-center gap-2 p-0">
          {!isFarming && (
            <h3 className="text-gradient-purple text-base font-medium">Баланс заботы к себе</h3>
          )}
          {isFarming && (
            <h3 className="text-gradient-purple text-base font-medium">
              Добываем заботу: {`${rewardRatePerHour.toFixed(1)} в час`}
            </h3>
          )}
        </div>
        <div className="flex h-10 w-full flex-row items-center justify-center gap-2 p-0">
          <span className="text-4xl font-bold">
            {farmingCounter.toString().padStart(6, '0').split('').map(renderDigit)}
          </span>
          <Coin label="F" type="default" />
        </div>
      </div>
      {isFarming && (
        <Button type="purple" subtype="light">
          Следующая забота через {formatTime(timeLeft)}
        </Button>
      )}
      {!isFarming && (
        <Button type="purple" onClick={handleStartFarming}>
          Получить дневную заботу
        </Button>
      )}
      {/*<div className="flex flex-row justify-center p-0 gap-1.5 w-full">
        <HorizontalButton 
          type="purpleSecondary" 
          leftText="ПОДРОБНЕЕ" 
          rightText="ИСТОРИЯ" 
          leftOnClick={() => onViewInfo('details')} 
          rightOnClick={() => onViewInfo('history')} 
        />
      </div>*/}
    </div>
  );
};

export default FarmingTracker;
