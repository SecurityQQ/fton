import Link from 'next/link';
import React from 'react';

const WelcomeBonus: React.FC = () => {
  return (
    <div className="mx-auto mt-8 flex h-60 w-full max-w-xs flex-col items-center justify-center gap-4 rounded-2xl bg-gradient-to-b from-[#CA6AE2] to-[#F3C2FF] p-6 text-center">
      <h2 className="font-sfpro text-lg font-medium leading-5 text-white">Велком Бонус</h2>
      <div className="flex h-14 w-52 items-center justify-center gap-3">
        <span className="font-sfpro leading-14 text-4xl font-bold text-white">+1000</span>
        <div className="relative size-9 rounded-full border-4 border-white/60">
          <div className="absolute inset-0 rounded-full bg-white" />
          <span className="font-adonis font-italic leading-14 absolute inset-0 flex items-center justify-center text-2xl font-bold text-[#CA6AE2]">
            F
          </span>
        </div>
      </div>
      <p className="h-13 font-sfpro w-72 text-sm font-medium leading-5 text-white/60">
        Зарабатывайте Fem Coin и обменивайте его на другие токены или получайте скидку на
        консультации и многое другое
      </p>
      <Link
        href="/period-tracker"
        className="font-sfpro flex h-8 w-52 items-center justify-center rounded-full bg-white text-sm font-semibold uppercase leading-5 text-[#CD70E4]">
        Перейти к трекеру цикла
      </Link>
    </div>
  );
};

export default WelcomeBonus;
