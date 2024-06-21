import type { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma'; // Assuming you have a Prisma client setup in lib/prisma.ts

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ error: 'userId is required' });
    }

    try {
      // Check if there is an existing session with prizeReceived = false
      const existingSession = await prisma.farmingSession.findFirst({
        where: { userId, prizeReceived: false },
      });

      if (existingSession) {
        return res
          .status(400)
          .json({ error: 'An existing farming session is already in progress' });
      }

      const timeStart = new Date();
      const timeFinish = new Date(timeStart.getTime() + 8 * 60 * 60 * 1000); // 8 hours from start

      const farmingSession = await prisma.farmingSession.create({
        data: {
          userId,
          timeFinish,
          totalReward: 7200,
          prizeReceived: false,
        },
      });

      return res.status(200).json(farmingSession);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
