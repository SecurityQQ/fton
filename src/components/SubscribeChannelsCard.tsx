// examples/SubscribeChannelsCardExample.tsx
import React from 'react';

import CardWithMenu from '@/components/ui/CardWithMenu';
import RewardText from '@/components/ui/RewardText';

const handleClick = () => {
  console.log('MenuItem clicked');
};

const SubscribeChannelsCard: React.FC = () => {
  const menuItems = [
    {
      image: '/anna-channel.jpg',
      title: 'Подпишись на Huggies и стань счастливой мамой',
      reward: '+300',
      onClick: handleClick,
    },
    {
      image: '/anna-channel.jpg',
      title: 'Нет Вариантов не стать победителем в этой игре',
      reward: '+300',
      onClick: handleClick,
    },
  ];

  const renderContent = () => (
    <>
      <span className="text-lg font-semibold">Подписаться на каналы</span>
      <RewardText value="+ 300" label="F" type="white" gradient="green" />
      <span className="px-2 text-sm">
        Зарабатывайте Fem Coin и обменивайте его на другие токены или получайте скидку на
        консультации и многое другое
      </span>
    </>
  );

  return <CardWithMenu gradient="green" renderContent={renderContent} menuItems={menuItems} />;
};

export default SubscribeChannelsCard;
