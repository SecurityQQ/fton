import { Cell, Contract, beginCell, storeStateInit } from '@ton/core';
import { CHAIN } from '@tonconnect/protocol';
import {
  SendTransactionResponse,
  Wallet,
  useTonAddress,
  useTonConnectUI,
  useTonWallet,
} from '@tonconnect/ui-react';

export interface UserTransaction {
  contract: Contract;
  amount: bigint;
  payload?: Cell | null;
}

export function useTonConnect(): {
  send: (transactions: UserTransaction[]) => Promise<SendTransactionResponse>;
  connected: boolean;
  wallet: string | null;
  walletObject: Wallet | null;
  network: CHAIN | null;
  address: string | null;
} {
  const [tonConnectUI] = useTonConnectUI();
  const wallet = useTonWallet();
  const address = useTonAddress();

  const send = (transactions: UserTransaction[]) => {
    return tonConnectUI.sendTransaction(
      {
        messages: transactions.map((transaction) => {
          const address = transaction.contract.address.toString();
          const amount = transaction.amount.toString();
          const init = transaction.contract.init;
          const payload = transaction.payload?.toBoc().toString('base64');
          if (init == null) {
            return {
              address,
              amount,
              payload,
            };
          }
          const stateInit = beginCell()
            .store(storeStateInit(init))
            .endCell()
            .toBoc()
            .toString('base64');
          return {
            address,
            amount,
            stateInit,
            payload,
          };
        }),
        from: wallet?.account.address,
        network: wallet?.account.chain,
        validUntil: Date.now() + 5 * 60 * 1000, // 5 minutes for user to approve
      },
      {
        modals: 'all',
      }
    );
  };

  return {
    send,
    connected: !!wallet?.account.address,
    wallet: wallet?.account.address ?? null,
    walletObject: wallet ?? null,
    network: wallet?.account.chain ?? null,
    address: address ?? null,
  };
}
