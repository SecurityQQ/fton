// utils/challenges.ts
export interface Challenge {
  id: string;
  name: string;
  description: string;
  reward: number;
  refLink: string;
  image: string;
  chatId: string;
  status?: string;
}

export interface ChallengeWithStatus extends Challenge {
  isCompleted: boolean;
}

const challenges: Challenge[] = [
  {
    id: '1',
    name: 'Подпишись на FemaleTon',
    description: 'Telegram-канал проекта с апдейтами продукта и новостями в сфере Femtech',
    reward: 300,
    refLink: 'https://t.me/femaleton',
    image: '/images/femaleton.jpg',
    chatId: '-1002238000433',
  },
  {
    id: '2',
    name: 'Подпишись на Women’s HealthQlub',
    description:
      'Наталья Молчанова — Автор канала для женщин об управлении капиталом здоровья и качеством жизни',
    reward: 300,
    refLink: 'https://t.me/+z3Kw2MCvEsVkNzcy',
    image: '/images/womenshealth.jpg',
    chatId: '-1001620399228',
  },
  {
    id: '3',
    name: 'Подпишись на Burning Anna',
    description: 'Сооснователь проекта Female TON, продакт-менеджер, рассказывает про AI и web3',
    reward: 300,
    refLink: 'https://t.me/burninganna',
    image: '/images/anna-channel.jpg',
    chatId: '-1001661583277',
  },
];

export default challenges;

// to get a chatId forward any message from the chat to https://t.me/chatIDrobot, for public channels you can use "@channel_name"
