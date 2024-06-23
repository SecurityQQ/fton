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
    name: 'challenges.challenge1.name',
    description: 'challenges.challenge1.description',
    reward: 300,
    refLink: 'https://t.me/femaleton',
    image: '/images/femaleton.jpg',
    chatId: '-1002238000433',
  },
  {
    id: '2',
    name: 'challenges.challenge2.name',
    description: 'challenges.challenge2.description',
    reward: 300,
    refLink: 'https://t.me/+z3Kw2MCvEsVkNzcy',
    image: '/images/womenshealth.jpg',
    chatId: '-1001620399228',
  },
  {
    id: '3',
    name: 'challenges.challenge3.name',
    description: 'challenges.challenge3.description',
    reward: 300,
    refLink: 'https://t.me/burninganna',
    image: '/images/anna-channel.jpg',
    chatId: '-1001661583277',
  },
];

export default challenges;

// to get a chatId forward any message from the chat to https://t.me/chatIDrobot, for public channels you can use "@channel_name"
