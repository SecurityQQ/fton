import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import withMiddleware from '@/utils/withMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
  } else if (req.method === 'PATCH') {
    const { walletAddress } = req.body;

    try {
      const updatedUser = await prisma.user.update({
        where: { id: String(id) },
        data: { walletAddress },
      });

      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default withMiddleware(handler);
