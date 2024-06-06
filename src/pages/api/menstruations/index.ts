import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const menstruations = await prisma.menstruation.findMany({
        include: {
          user: true,
        },
      });
      res.status(200).json(menstruations);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { date, userId } = req.body;
    try {
      const newMenstruation = await prisma.menstruation.create({
        data: {
          date: new Date(date),
          userId,
        },
      });
      res.status(201).json(newMenstruation);
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
}
