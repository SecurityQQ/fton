import prisma from '@/lib/prisma';

export async function updateBalance(
  userId: string,
  amount: number,
  reason: string,
  refLink?: string
) {
  const user = await prisma.user.update({
    where: { id: userId },
    data: { tokenBalance: { increment: amount } },
  });

  await prisma.balanceHistory.create({
    data: {
      userId,
      amount,
      reason,
      refLink,
    },
  });

  return user;
}
