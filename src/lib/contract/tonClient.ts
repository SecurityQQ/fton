import { TonClient } from '@ton/ton';

export const tonClient = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  apiKey: process.env.NEXT_PUBLIC_TON_API_KEY,
});
