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
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { name, walletAddress, telegramHandle, telegramId } = req.body;

    try {
      // Check if the user already exists
      let user = await prisma.user.findFirst({
        where: {
          OR: [{ walletAddress }, { telegramId }],
        },
      });

      if (!user) {
        // Create a new user if not found
        user = await prisma.user.create({
          data: {
            name,
            walletAddress,
            telegramHandle,
            telegramId,
            birthdate: new Date(), // Placeholder for now, replace with actual data if available
            lastPeriodDate: new Date(), // Placeholder for now, replace with actual data if available
          },
        });
      }

      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
