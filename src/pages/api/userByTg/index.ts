import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import { serializeUser } from '@/lib/serializeUser';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'PATCH') {
    const { walletAddress, telegramId, ...rest } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { telegramId: BigInt(telegramId as string) },
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
          telegramId: BigInt(telegramId as string),
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
