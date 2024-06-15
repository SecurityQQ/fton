import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

export interface TelegramMessage {
  message_id: number;
  chat: {
    id: number;
  };
  text: string;
}

export interface TelegramResponse<T> {
  ok: boolean;
  result: T;
}

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message, callback_query } = req.body;

    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      const text = `Дорогая,

💡 Удобно: не нужно отдельное приложение
🔒 Безопасно: данные зашифрованы смартконтрактом
🌿 Умно: Персональные рекомендации по well-being на основе цикла через бота

С любовью, твоя команда @femaleton`;

      const sentMessage = (await sendMessage(chatId, text)) as TelegramResponse<TelegramMessage>;
      if (sentMessage.ok) {
        await pinMessage(chatId, sentMessage.result.message_id);
      }
    }

    res.status(200).send('OK');
  } else {
    res.status(405).send('Method Not Allowed');
  }
};

const sendMessage = async (chatId: number, text: string) => {
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
              text: '🌀 Tracker',
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
