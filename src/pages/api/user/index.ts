import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: {
          invitationsSent: true,
          invitationsReceived: true,
          socialMedia: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('GET /api/user error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { name, walletAddress, telegramHandle, telegramId } = req.body;

    try {
      // Check if the user already exists, prioritizing telegramId
      let user = await prisma.user.findFirst({
        where: {
          telegramId,
        },
      });

      // If not found by telegramId, try finding by walletAddress (only if walletAddress is provided)
      if (!user && walletAddress) {
        user = await prisma.user.findFirst({
          where: {
            walletAddress,
          },
        });
      }

      if (!user) {
        // Create a new user if not found
        const userData = {
          name,
          telegramHandle,
          telegramId,
          birthdate: new Date(), // Placeholder for now, replace with actual data if available
          lastPeriodDate: new Date(), // Placeholder for now, replace with actual data if available
          walletAddress: walletAddress || null,
        };

        user = await prisma.user.create({
          data: userData,
        });
      }

      res.status(201).json(user);
    } catch (error) {
      console.error(
        'POST /api/user error:',
        error,
        name,
        walletAddress,
        telegramHandle,
        telegramId
      );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
