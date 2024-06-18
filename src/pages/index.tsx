import { Lock, Coins, Heart } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import FeatureSection from '@/components/FeatureSection';
import Button from '@/components/ui/Button';

import { useUser } from '../contexts/UserContext';

const Home: NextPage = () => {
  const { user, loading } = useUser();
  const [userName, setUserName] = useState('');
  const router = useRouter();

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
        <div className="text-2xl font-semibold text-blue-900">Female TON</div>
      </div>
      <div className="flex w-full max-w-md flex-col items-center gap-2 p-4">
        <FeatureSection
          icon={Heart}
          title="Трекер женского здоровья"
          description="Следи за своим циклом прямо в Telegram"
          color="orange"
        />
        <FeatureSection
          icon={Lock}
          title="Анонимность"
          description="Функция шифрования с помощью смарт-контрактов гарантирует, что данные принадлежат только тебе"
          color="green"
        />
        <FeatureSection
          icon={Coins}
          title="Получай токены"
          description="За заботу о здоровье, участие в программах лояльности и подписку на каналы врачей"
          color="pink"
        />
      </div>
      <Button onClick={handleButtonClick} type="blue" className="">
        Продолжить
      </Button>
    </div>
  );
};

export default Home;
