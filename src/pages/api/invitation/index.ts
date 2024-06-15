import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import withMiddleware from '@/utils/withMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const invitations = await prisma.invitation.findMany({
        include: {
          inviter: true,
          invitee: true,
        },
      });
      res.status(200).json(invitations);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { inviterId, inviteeId } = req.body;
    try {
      const newInvitation = await prisma.invitation.create({
        data: {
          inviterId,
          inviteeId,
        },
      });
      res.status(201).json(newInvitation);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default withMiddleware(handler);
