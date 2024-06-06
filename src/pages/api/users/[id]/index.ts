import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const user = await prisma.user.findUnique({
        where: { id: String(id) },
        include: {
          menstruations: true,
          invitationsSent: true,
          invitationsReceived: true,
          socialMedia: true,
        },
      });

      if (!user) {
        res.status(404).json({ error: 'User not found' });
      } else {
        res.status(200).json(user);
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
