import { NextApiRequest, NextApiResponse } from 'next';
import fetch from 'node-fetch';

const TELEGRAM_API = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

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

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (message && message.text === '/start') {
      const chatId = message.chat.id;
      const text = 'Tracker: t.me/FemaleTonBot/tracker';

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
