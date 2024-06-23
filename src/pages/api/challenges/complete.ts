// pages/api/challenges/complete.ts
import { NextApiRequest, NextApiResponse } from 'next';

import { updateBalance } from '@/lib/balance';
import prisma from '@/lib/prisma';
import challenges from '@/utils/challenges';
import { isUserSubscribed } from '@/utils/isSubscribed';
import withMiddleware from '@/utils/withMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { userId, challengeId, telegramId } = req.body;

    console.log(' complete: ', userId, challengeId, telegramId);

    try {
      const challenge = challenges.find((ch) => ch.id === challengeId);

      if (!challenge) {
        return res.status(404).json({ error: 'Challenge not found' });
      }

      const userChallenge = await prisma.userChallenge.findUnique({
        where: { userId_challengeId: { userId, challengeId } },
      });

      if (userChallenge && userChallenge.completed) {
        return res.status(400).json({ error: 'Challenge already completed' });
      }

      const isSubscribed = await isUserSubscribed(telegramId, challenge.chatId);

      console.log(' isSubscribed: ', isSubscribed);

      if (!isSubscribed) {
        return res.status(400).json({ error: 'User is not subscribed to the channel' });
      }

      if (!userChallenge) {
        await prisma.userChallenge.create({
          data: {
            userId,
            challengeId,
            completed: true,
          },
        });
      } else {
        await prisma.userChallenge.update({
          where: { userId_challengeId: { userId, challengeId } },
          data: { completed: true },
        });
      }

      await updateBalance(userId, challenge.reward, `${challenge.name}`, challenge.refLink);

      res.status(200).json({ message: 'Challenge completed and reward granted' });
    } catch (error) {
      console.error('Error completing challenge:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default withMiddleware(handler);
