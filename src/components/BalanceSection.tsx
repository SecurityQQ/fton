import Image from 'next/image';
import React from 'react';

type BalanceSectionProps = {
  tokenBalance: number;
  onStartFarming: () => void;
  onViewInfo: () => void;
};

const BalanceSection: React.FC<BalanceSectionProps> = ({
  tokenBalance,
  onStartFarming,
  onViewInfo,
}) => {
  return (
    <div className="mt-8 w-full max-w-md rounded-3xl bg-gradient-to-b from-green1 to-green2 p-8 text-white">
      <p className="text-header2">Текущий баланс</p>
      <div className="flex flex-row place-content-center place-items-center">
        <h2 className="mr-2 mt-2 text-header1 font-bold">{tokenBalance || '1257'}</h2>
        <div className="mt-1">
          <Image src="/ftoken.svg" alt="Chevron" width={38} height={38} />
        </div>
      </div>
      <p className="mt-2 text-body2 opacity-60">
        Зарабатывайте Fem Coin и обменяйте его на другие токены или получайте скидку на консультации
        и многое другое
      </p>
      <div className="flex flex-col items-center">
        <button
          onClick={onStartFarming}
          className="mt-4 rounded-full bg-white px-6 py-2 text-button font-medium text-text-green">
          УВЕЛИЧИТЬ
        </button>
        <button
          onClick={onViewInfo}
          className="mt-2 rounded-full bg-white/20 px-6 py-2 text-button font-medium text-white">
          ИСТОРИЯ ПОПОЛНЕНИЯ
        </button>
      </div>
    </div>
  );
};

export default BalanceSection;
