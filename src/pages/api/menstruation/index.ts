import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { userId, months } = req.query;

    if (!userId || !months) {
      return res.status(400).json({ error: 'UserId and months are required' });
    }

    try {
      const monthsAgo = new Date();
      monthsAgo.setMonth(monthsAgo.getMonth() - parseInt(months as string));

      const menstruations = await prisma.menstruation.findMany({
        where: {
          userId: userId as string,
          date: {
            gte: monthsAgo,
          },
        },
        orderBy: {
          date: 'asc',
        },
      });

      res.status(200).json(menstruations);
    } catch (error) {
      console.error('Error fetching menstruations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { changes, userId } = req.body;

    if (!changes || !userId) {
      return res.status(400).json({ error: 'Changes and userId are required' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      for (const change of changes) {
        if (change.action === 'add') {
          await prisma.menstruation.create({
            data: {
              date: new Date(change.date),
              userId,
            },
          });
        } else if (change.action === 'delete') {
          await prisma.menstruation.deleteMany({
            where: {
              date: new Date(change.date),
              userId,
            },
          });
        }
      }

      res.status(200).json({ message: 'Menstruation dates updated successfully' });
    } catch (error) {
      console.error('Error updating menstruation dates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
