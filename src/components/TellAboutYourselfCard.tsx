import React from 'react';

import CardWithMenu from '@/components/ui/CardWithMenu';
import RewardText from '@/components/ui/RewardText';

const handleClick = () => {
  console.log('MenuItem clicked');
};

const TellAboutYourselfCard: React.FC = () => {
  const menuItems = [
    {
      image: '/anna-channel.jpg',
      title: 'malo',
      reward: '+1000',
      onClick: handleClick,
    },
    {
      image: '/anna-channel.jpg',
      title: 'Подпишись на FemaleTon и получи 2',
      reward: '+1000',
      onClick: handleClick,
    },
  ];

  const renderContent = () => (
    <>
      <span className="text-lg font-semibold">Расскажи о себе</span>
      <RewardText value="+ 1000" label="F" type="white" gradient="blue" />
      <span className="px-2 text-sm">Получай награду за взаимодействие с брендами!</span>
    </>
  );

  return <CardWithMenu gradient="blue" renderContent={renderContent} menuItems={menuItems} />;
};

export default TellAboutYourselfCard;
