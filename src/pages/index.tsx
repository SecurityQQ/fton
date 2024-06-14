import { Lock, Coins, Heart } from 'lucide-react';
import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import FeatureSection from '../components/FeatureSection';
import Loader from '../components/Loader';
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

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center bg-white p-4">
      <div className="flex flex-col items-center gap-6 p-0">
        <div className="relative flex size-28 items-center justify-center">
          <Image src="/logo.png" alt="Logo" layout="fill" className="rounded-2xl" />
        </div>
        <div className="text-2xl font-semibold text-blue-900">Female TON</div>
      </div>
      <div className="flex w-full max-w-md flex-col items-center gap-4 p-4">
        <FeatureSection
          icon={Heart}
          title="Трекер женского здоровья"
          description="Следи за своим циклом прямо в Telegram"
          bgColor="bg-orange-500"
        />
        <FeatureSection
          icon={Lock}
          title="Анонимность"
          description="Функция шифрования с помощью смарт-контрактов гарантирует, что данные принадлежат только тебе"
          bgColor="bg-green-500"
        />
        <FeatureSection
          icon={Coins}
          title="Получай токены"
          description="За заботу о здоровье, участие в программах лояльности и подписку на каналы врачей"
          bgColor="bg-pink-500"
        />
      </div>
      <button
        onClick={handleButtonClick}
        className="fixed bottom-4 left-1/2 flex -translate-x-1/2 flex-row items-center justify-center gap-1 rounded-full bg-gradient-to-b from-blue-500 to-blue-300 px-5 py-2 font-bold uppercase text-white">
        Продолжить
      </button>
    </div>
  );
};

export default Home;
