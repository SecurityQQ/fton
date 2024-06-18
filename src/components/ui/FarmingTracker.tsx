// components/ui/FarmingTracker.tsx
import React, { useState, useEffect } from 'react';

import Button from '@/components/ui/Button';
import Coin from '@/components/ui/Coin';
import HorizontalButton from '@/components/ui/HorizontalButton';

import styles from './FarmingTracker.module.css';

type FarmingTrackerProps = {
  tokenBalance: number;
  onStartFarming: () => void;
  onViewInfo: (type: 'details' | 'history') => void;
};

const FarmingTracker: React.FC<FarmingTrackerProps> = ({ tokenBalance, onViewInfo }) => {
  const [isFarming, setIsFarming] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [farmingCounter, setFarmingCounter] = useState(tokenBalance || 0);
  const [previousCounter, setPreviousCounter] = useState(tokenBalance || 0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isFarming && timeLeft > 0) {
      timer = setInterval(() => {
        setPreviousCounter(farmingCounter);
        setFarmingCounter((prev) => prev + 1); // Increment the counter as time progresses
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isFarming, timeLeft, farmingCounter]);

  const handleStartFarming = () => {
    setIsFarming(true);
    setTimeLeft(3600); // Set the farming duration to 1 hour (3600 seconds)
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s
      .toString()
      .padStart(2, '0')}`;
  };

  const renderDigit = (digit: number, index: number) => {
    const previousDigit = previousCounter.toString().padStart(6, '0')[index];
    const currentDigit = digit.toString().padStart(6, '0')[index];

    return (
      <span key={index} className="relative inline-block h-10 w-6 overflow-hidden">
        <span
          className={`text-gradient-purple absolute inset-x-0 ${
            previousDigit !== currentDigit ? styles.spinAnimation : ''
          }`}>
          {currentDigit}
        </span>
      </span>
    );
  };

  return (
    <div className="flex h-auto w-full flex-col items-center justify-center gap-1.5 rounded-b-[4px] rounded-t-[40px] bg-[var(--font-dark-secondary)] p-4">
      {/* Title Section */}
      <div className="flex w-full max-w-[313px] flex-col items-center gap-2 p-0">
        <div className="flex flex-row items-center gap-2 p-0">
          <h3 className="text-base font-medium text-[var(--font-dark-primary)]">
            Баланс заботы к себе
          </h3>
        </div>
        <div className="flex h-10 w-full flex-row items-center justify-center gap-2 p-0">
          <span className="text-4xl font-bold">
            {farmingCounter
              .toString()
              .padStart(Math.min(6, farmingCounter.toString().length), '0')
              .split('')
              .map((digit, index) => (
                <span key={index} className="relative inline-block h-8 w-6 overflow-hidden">
                  <span
                    className={`text-gradient-purple absolute inset-x-0 ${
                      previousCounter
                        .toString()
                        .padStart(Math.min(6, previousCounter.toString().length), '0')[index] !==
                      digit
                        ? styles.spinAnimation
                        : ''
                    }`}>
                    {digit}
                  </span>
                </span>
              ))}
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
      <div className="flex w-full flex-row justify-center gap-1.5 p-0">
        <HorizontalButton
          type="purpleSecondary"
          leftText="ПОДРОБНЕЕ"
          rightText="ИСТОРИЯ"
          leftOnClick={() => onViewInfo('details')}
          rightOnClick={() => onViewInfo('history')}
        />
      </div>
    </div>
  );
};

export default FarmingTracker;
