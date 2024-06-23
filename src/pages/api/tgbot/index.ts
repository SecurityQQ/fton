import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export interface TelegramMessage {
  message_id: number;
  chat: {
    id: number;
  };
  from: {
    language_code: string;
  };
  text: string;
}

export interface TelegramResponse<T> {
  ok: boolean;
  result: T;
}

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;
const allowedLocales = ['en', 'ru'];

function getNestedValue(obj: any, keyPath: string): any {
  return keyPath.split('.').reduce((acc, key) => acc && acc[key], obj);
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message, callback_query } = req.body;

    let locale = 'en'; // default locale
    if (message && message.from && message.from.language_code) {
      locale = message.from.language_code;
    }

    if (!allowedLocales.includes(locale)) {
      locale = 'en';
    }

    try {
      const messages = await import(`../../locales/${locale}/common.json`);
      const text = getNestedValue(messages.default, 'telegram.start_message');
      const buttonText = getNestedValue(messages.default, 'telegram.button_text');

      if (message && message.text === '/start') {
        const chatId = message.chat.id;

        const sentMessage = (await sendMessage(
          chatId,
          text,
          buttonText
        )) as TelegramResponse<TelegramMessage>;
        if (sentMessage.ok) {
          await pinMessage(chatId, sentMessage.result.message_id);
        }
      }

      res.status(200).send('OK');
    } catch (error) {
      console.error('Error loading locale messages:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

const sendMessage = async (chatId: number, text: string, buttonText: string) => {
  const url = `${TELEGRAM_API}/sendMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      text,
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: buttonText,
              url: 'https://t.me/FemaleTonBot/tracker',
            },
          ],
        ],
      },
    }),
  });

  return response.json();
};

const pinMessage = async (chatId: number, messageId: number) => {
  const url = `${TELEGRAM_API}/pinChatMessage`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      chat_id: chatId,
      message_id: messageId,
    }),
  });

  return response.json();
};

export default handler;
