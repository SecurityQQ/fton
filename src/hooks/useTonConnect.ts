import { Sender, SenderArguments } from '@ton/core';
import { CHAIN } from '@tonconnect/protocol';
import { Wallet, useTonAddress, useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';

export function useTonConnect(): {
  sender: Sender;
  connected: boolean;
  wallet: string | null;
  walletObject: Wallet | null;
  network: CHAIN | null;
  address: string | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();

  return {
    sender: {
      send: async (args: SenderArguments) => {
        tonConnectUI.sendTransaction({
          messages: [
            {
              address: args.to.toString(),
              amount: args.value.toString(),
              payload: args.body?.toBoc().toString('base64'),
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
        });
      },
    },
    connected: !!wallet?.account.address,
    wallet: wallet?.account.address ?? null,
    walletObject: wallet ?? null,
    network: wallet?.account.chain ?? null,
    address: address ?? null,
  };
}
