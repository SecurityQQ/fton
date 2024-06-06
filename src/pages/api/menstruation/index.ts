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
      console.error('Error fetching menstruations:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const { date, userId } = req.body;

    if (!date || !userId) {
      return res.status(400).json({ error: 'Date and userId are required' });
    }

    try {
      const newDate = new Date(date);

      // Check if the new date is different from the current last period date
      const user = await prisma.user.findUnique({ where: { id: userId } });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      if (user.lastPeriodDate && new Date(user.lastPeriodDate).getTime() === newDate.getTime()) {
        return res
          .status(200)
          .json({ message: 'Date is the same as the current last period date' });
      }

      const newMenstruation = await prisma.menstruation.create({
        data: {
          date: newDate,
          userId,
        },
      });

      // Update the user's lastPeriodDate
      await prisma.user.update({
        where: { id: userId },
        data: { lastPeriodDate: newDate },
      });

      res.status(201).json(newMenstruation);
    } catch (error) {
      console.error('Error creating menstruation:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' }); // Method Not Allowed
  }
}
