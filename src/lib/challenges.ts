import prisma from '@/lib/prisma';
import challenges from '@/utils/challenges';

export async function getUserChallenges(userId: string) {
  const userChallenges = await prisma.userChallenge.findMany({
    where: { userId },
  });

  const completedChallenges = userChallenges.filter((uc) => uc.completed);
  const completedChallengeIds = completedChallenges.map((uc) => uc.challengeId);

  const availableChallenges = challenges.filter(
    (challenge) => !completedChallengeIds.includes(challenge.id)
  );

  return {
    completedChallenges,
    availableChallenges,
  };
}
