import { NextApiRequest, NextApiResponse } from 'next';

const allowedLocales = ['en', 'ru'];

function getNestedValue(obj: any, keyPath: string): any {
  return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    const { locale = 'en', key = 'telegram.start_message' } = req.query;

    if (typeof locale !== 'string' || !allowedLocales.includes(locale)) {
      return res.status(400).json({ error: 'Invalid or missing locale' });
    }

    try {
      const messages = await import(`../../locales/${locale}/common.json`);
      const translation = getNestedValue(messages.default, key as string);

      if (!translation) {
        return res.status(404).json({ error: 'Translation key not found' });
      }

      res.status(200).json({ translation });
    } catch (error) {
      console.error('Error loading locale messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

export default handler;
