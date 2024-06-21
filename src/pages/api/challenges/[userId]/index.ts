import { UserChallenge } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import challenges from '@/utils/challenges';
import withMiddleware from '@/utils/withMiddleware';

async function getUserChallenges(userId: string) {
  const userChallenges = await prisma.userChallenge.findMany({
    where: { userId },
  });

  const completedChallengeIds = new Set(
    userChallenges
      .filter((uc: UserChallenge) => uc.completed)
      .map((uc: UserChallenge) => uc.challengeId)
  );

  const allChallenges = challenges.map((challenge) => ({
    ...challenge,
    isCompleted: completedChallengeIds.has(challenge.id),
  }));

  return { challenges: allChallenges };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { userId } = req.query;

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const challenges = await getUserChallenges(String(userId));
    res.status(200).json(challenges);
  } catch (error) {
    console.error('Error fetching challenges:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export default withMiddleware(handler);
