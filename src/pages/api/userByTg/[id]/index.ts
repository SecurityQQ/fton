import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { serializeUser } from '@/lib/serializeUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { telegramId: BigInt(id as string) },
        include: {
          menstruations: true,
          invitationsSent: true,
          invitationsReceived: true,
          socialMedia: true,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      return res.status(200).json(serializeUser(user));
    } catch (error) {
      console.error('Error fetching user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'PATCH') {
    const { walletAddress, ...rest } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { telegramId: BigInt(id as string) },
        data: { walletAddress, ...rest },
      });

      return res.status(200).json(serializeUser(updatedUser));
    } catch (error) {
      console.error('Error updating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { telegramId, ...rest } = req.body;

    try {
      const newUser = await prisma.user.create({
        data: {
          telegramId: BigInt(telegramId),
          ...rest,
          walletAddress: '', // Initialize with empty wallet address
        },
      });

      return res.status(201).json(serializeUser(newUser));
    } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
