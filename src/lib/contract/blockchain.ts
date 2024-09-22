import { Cell, beginCell, toNano } from '@ton/ton';
import { SendTransactionResponse } from '@tonconnect/ui-react';

import { UserTransaction } from '@/hooks/useTonConnect';
import { waitForAction } from '@/lib/contract/utils';
import { Account, storeDeploy, storeSetPublicKey } from 'src/ton_client/tact_Account';

import { tonClient } from './tonClient';

let blockchainLogicInited = false;
let initing: Promise<void> | null = null;

export function isBlockchainLogicInited() {
  return blockchainLogicInited;
}

export async function isContractDeployed(userAddress: string) {
  const contract = await Account.fromInit(userAddress);
  return await tonClient.isContractDeployed(contract.address);
}

export async function initBlockchainLogic(
  send: (transactions: UserTransaction[]) => Promise<SendTransactionResponse>,
  userAddress: string,
  publicKey: string
) {
  if (!blockchainLogicInited) {
    if (initing === null) {
      initing = new Promise(async (resolve) => {
        try {
          const contract = await Account.fromInit(userAddress);
          const deployed = await isDeployed(userAddress);
          const deployTransaction = {
            contract,
            amount: toNano('0.008'),
            payload: getDeployPayload(),
          };
          const publicKeyTransaction = {
            contract,
            amount: toNano('0.008'),
            payload: getPublicKeyPayload(publicKey),
          };
          console.log('Deployed:', deployed);
          if (!deployed) {
            const res = await send([deployTransaction, publicKeyTransaction]);
            console.log('Deploy response:', res);
          } else {
            const contractPublicKey = await getPublicKey(userAddress);
            console.log('Contract public key:', contractPublicKey);
            console.log('Public key:', publicKey);
            const savedKeyIsEqual = contractPublicKey === publicKey;
            console.log('Saved key is equal:', savedKeyIsEqual);
            if (!savedKeyIsEqual) {
              await send([publicKeyTransaction]);
            }
          }
          console.log('Waiting for blockchain logic init');
          await waitForAction(async () => await isInited(userAddress, publicKey));
          console.log('Blockchain logic inited');
          blockchainLogicInited = true;
        } catch (e) {
          console.error('Failed to init blockchain logic', e);
        } finally {
          resolve();
        }
      });
    }
    return initing;
  }
}

function getDeployPayload(): Cell {
  return beginCell()
    .store(
      storeDeploy({
        $$type: 'Deploy',
        queryId: BigInt(0),
      })
    )
    .endCell();
}

function getPublicKeyPayload(publicKey: string): Cell {
  return beginCell()
    .store(
      storeSetPublicKey({
        $$type: 'SetPublicKey',
        publicKey,
      })
    )
    .endCell();
}

async function isInited(userAddress: string, expectedPublicKey: string) {
  const deployed = await isDeployed(userAddress);
  if (!deployed) return false;
  const publicKey = await getPublicKey(userAddress);
  return publicKey === expectedPublicKey;
}

export async function getPublicKey(userAddress: string): Promise<string> {
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const publicKey = await openedContract.getPublicKey();
  return publicKey;
}

export async function isDeployed(userAddress: string): Promise<boolean> {
  const contract = await Account.fromInit(userAddress);
  return await tonClient.isContractDeployed(contract.address);
}
