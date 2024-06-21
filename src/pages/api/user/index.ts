import { NextApiRequest, NextApiResponse } from 'next';

import prisma from '@/lib/prisma';
import withMiddleware from '@/utils/withMiddleware';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const users = await prisma.user.findMany({
        include: {
          invitationsSent: true,
          invitationsReceived: true,
          socialMedia: true,
        },
      });
      res.status(200).json(users);
    } catch (error) {
      console.error('GET /api/user error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else if (req.method === 'POST') {
    const {
      name,
      firstName,
      lastName,
      username,
      photoUrl,
      isBot,
      isPremium,
      languageCode,
      allowsWriteToPm,
      addedToAttachmentMenu,
      walletAddress,
      telegramHandle,
      telegramId,
      birthdate,
      lastPeriodDate,
    } = req.body;

    try {
      let user = await prisma.user.findFirst({
        where: {
          telegramId,
        },
      });

      if (!user && walletAddress) {
        user = await prisma.user.findFirst({
          where: {
            walletAddress,
          },
        });
      }

      if (!user) {
        const userData = {
          name,
          firstName, // Added to handle properties from Telegram
          lastName, // Added to handle properties from Telegram
          username, // Added to handle properties from Telegram
          photoUrl, // Added to handle properties from Telegram
          isBot, // Added to handle properties from Telegram
          isPremium, // Added to handle properties from Telegram
          languageCode, // Added to handle properties from Telegram
          allowsWriteToPm, // Added to handle properties from Telegram
          addedToAttachmentMenu, // Added to handle properties from Telegram
          walletAddress: walletAddress || null,
          telegramHandle,
          telegramId,
          birthdate: birthdate ? new Date(birthdate) : null,
          lastPeriodDate: lastPeriodDate ? new Date(lastPeriodDate) : null,
        };

        user = await prisma.user.create({
          data: userData,
        });
      }

      res.status(201).json(user);
    } catch (error) {
      console.error(
        'POST /api/user error:',
        error,
        name,
        firstName,
        lastName,
        username,
        photoUrl,
        isBot,
        isPremium,
        languageCode,
        allowsWriteToPm,
        addedToAttachmentMenu,
        walletAddress,
        telegramHandle,
        telegramId,
        birthdate,
        lastPeriodDate
      );
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default withMiddleware(handler);
