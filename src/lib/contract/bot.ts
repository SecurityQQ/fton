import { KeyPair, mnemonicToPrivateKey } from '@ton/crypto';
import { WalletContractV3R2, Sender } from '@ton/ton';
import assert from 'assert';

import { tonClient } from './tonClient';

export async function getBotKeyPair(): Promise<KeyPair> {
  const mnemonics = process.env.NEXT_PUBLIC_WALLET_MNEMONIC?.split(' ') ?? [];
  assert(mnemonics.length > 0, 'Mnemonic is not provided');
  return await mnemonicToPrivateKey(mnemonics);
}

export async function getBotSender(): Promise<Sender> {
  const keyPair = await getBotKeyPair();
  const wallet = WalletContractV3R2.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });
  const provider = tonClient.provider(wallet.address, wallet.init);
  return wallet.sender(provider, keyPair.secretKey);
}
