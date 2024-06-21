import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import withMiddleware from '@/utils/withMiddleware';

type Change = {
  date: string; // Use string because dates are usually sent as strings in JSON
  action: 'add' | 'delete';
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
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
    const { changes, userId }: { changes: Change[]; userId: string } = req.body;

    if (!changes || !userId) {
      return res.status(400).json({ error: 'Changes and userId are required' });
    }

    try {
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      const addedDates = changes
        .filter((change) => change.action === 'add')
        .map((change) => new Date(change.date));
      const deletedDates = changes
        .filter((change) => change.action === 'delete')
        .map((change) => new Date(change.date));

      if (addedDates.length > 0) {
        await prisma.menstruation.createMany({
          data: addedDates.map((date) => ({
            date,
            userId,
          })),
        });
      }

      if (deletedDates.length > 0) {
        await prisma.menstruation.deleteMany({
          where: {
            date: {
              in: deletedDates,
            },
            userId,
          },
        });
      }

      // Fetch the last 5 menstruation dates for the user
      const lastMenstruations = await prisma.menstruation.findMany({
        where: { userId },
        orderBy: { date: 'desc' },
        take: 5,
      });

      if (lastMenstruations.length > 0) {
        const sortedLastMenstruations = lastMenstruations.sort(
          (a, b) => a.date.getTime() - b.date.getTime()
        );
        const lastPeriodStart = sortedLastMenstruations[0].date;

        // Update the user's lastPeriodDate to the first day of the last menstruation
        await prisma.user.update({
          where: { id: userId },
          data: { lastPeriodDate: lastPeriodStart },
        });
      }

      res.status(200).json({ message: 'Menstruation dates updated successfully' });
    } catch (error) {
      console.error('Error updating menstruation dates:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
};

export default withMiddleware(handler);
