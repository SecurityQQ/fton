import { Lock, Coins, Heart } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

import FeatureSection from '@/components/FeatureSection';
import Button from '@/components/ui/Button';

import { useUser } from '../contexts/UserContext';

const Home: NextPage = () => {
  const { user, loading } = useUser();
  const [userName, setUserName] = useState('');
  const router = useRouter();

  const t = useTranslations();

  useEffect(() => {
    if (user) {
      setUserName(user.firstName || '');
    }
  }, [user]);

  const handleButtonClick = () => {
    router.push('/period-tracker');
  };

  return (
    <div
      className="relative flex min-h-screen flex-col items-center bg-white p-4"
      onClick={handleButtonClick}>
      <div className="flex flex-col items-center gap-6 p-0">
        <div className="relative flex size-28 items-center justify-center">
          <Image src="/logo.png" alt="Logo" layout="fill" className="rounded-2xl" />
        </div>
        <div className="text-2xl font-semibold text-blue-900">{t('home.titles.main')}</div>
      </div>
      <div className="flex w-full max-w-md flex-col items-center gap-2 p-4">
        <FeatureSection
          icon={Heart}
          title={t('home.titles.feature1')}
          description={t('home.descriptions.feature1')}
          color="orange"
        />
        <FeatureSection
          icon={Lock}
          title={t('home.titles.feature2')}
          description={t('home.descriptions.feature2')}
          color="green"
        />
        <FeatureSection
          icon={Coins}
          title={t('home.titles.feature3')}
          description={t('home.descriptions.feature3')}
          color="pink"
        />
      </div>
      <Button onClick={handleButtonClick} type="blue" className="">
        {t('home.buttons.continue')}
      </Button>
    </div>
  );
};

export default Home;
