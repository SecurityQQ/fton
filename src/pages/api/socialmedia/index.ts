import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import withMiddleware from '@/utils/withMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const socialMediaInteractions = await prisma.socialMedia.findMany({
        include: {
          user: true,
        },
      });
      res.status(200).json(socialMediaInteractions);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { platform, handle, userId } = req.body;
    try {
      const newSocialMediaInteraction = await prisma.socialMedia.create({
        data: {
          platform,
          handle,
          userId,
        },
      });
      res.status(201).json(newSocialMediaInteraction);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default withMiddleware(handler);
