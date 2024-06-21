// utils/isSubscribed.ts
import axios from 'axios';

const TELEGRAM_API_URL = 'https://api.telegram.org';

export async function isUserSubscribed(telegramId: string, chatId: string): Promise<boolean> {
  try {
    const url = `${TELEGRAM_API_URL}/bot${process.env.BOT_CHECKER_TOKEN}/getChatMember`;
    const response = await axios.post(url, {
      chat_id: chatId,
      user_id: telegramId,
    });

    if (
      response.data.ok &&
      response.data.result.status !== 'left' &&
      response.data.result.status !== 'kicked'
    ) {
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error checking subscription status:', error);
    return false;
  }
}
