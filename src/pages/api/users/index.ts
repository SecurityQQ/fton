import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: {
          menstruations: true,
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
    const { name, walletAddress, telegramHandle, birthdate } = req.body;
    try {
      const newUser = await prisma.user.create({
        data: {
          name,
          walletAddress,
          telegramHandle,
          birthdate: new Date(birthdate),
        },
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
