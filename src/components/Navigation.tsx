import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import React from 'react';

const Navigation: React.FC = () => {
  const router = useRouter();
  const t = useTranslations('navigation');

  return (
    <footer className="fixed bottom-0 flex w-full justify-around border-t border-gray-300 bg-white py-4">
      <button
        onClick={() => router.push('/period-tracker')}
        className={`flex flex-col items-center ${
          router.pathname === '/period-tracker' ? 'text-blue-500' : 'text-gray-500'
        }`}>
        <Image src="/icon-home.svg" alt="Home" width={40} height={40} />
        <span className="text-bottomBar">{t('home')}</span>
      </button>
      <button
        onClick={() => router.push('/calendar')}
        className={`flex flex-col items-center ${
          router.pathname === '/calendar' ? 'text-blue-500' : 'text-gray-500'
        }`}>
        <Image src="/icon-calendar.svg" alt="Calendar" width={40} height={40} />
        <span className="text-bottomBar">{t('calendar')}</span>
      </button>
      <button
        onClick={() => router.push('/earn')}
        className={`flex flex-col items-center ${
          router.pathname === '/earn' ? 'text-blue-500' : 'text-gray-500'
        }`}>
        <Image src="/toncoin.svg" alt="Earn" width={30} height={30} />
        <span className="mt-0.5 text-bottomBar">{t('earn')}</span>
      </button>
    </footer>
  );
};

export default Navigation;
