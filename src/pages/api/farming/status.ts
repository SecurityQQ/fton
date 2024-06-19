import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma'; // Assuming you have a Prisma client setup in lib/prisma.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId } = req.query;

    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      const farmingSession = await prisma.farmingSession.findFirst({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      if (!farmingSession) {
        return res.status(404).json({ error: 'No farming session found for this user' });
      }

      const now = new Date();

      if (now > farmingSession.timeFinish && !farmingSession.prizeReceived) {
        await prisma.farmingSession.update({
          where: { id: farmingSession.id },
          data: { prizeReceived: true },
        });

        const { NEXT_PUBLIC_BASE_URL, AUTH_KEY } = process.env;
        const absoluteUrl = `${NEXT_PUBLIC_BASE_URL}/api/user/${userId}/balance`;

        await fetch(absoluteUrl, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            'x-auth-key': AUTH_KEY || '',
          },
          body: JSON.stringify({ amount: farmingSession.totalReward }),
        });
      }

      return res.status(200).json(farmingSession);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
