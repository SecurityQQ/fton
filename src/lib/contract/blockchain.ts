import { toNano } from '@ton/ton';

import { waitForAction } from '@/lib/contract/utils';
import { Account } from 'src/ton_client/tact_Account';

import { getBotSender } from './bot';
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

export async function initBlockchainLogic(userAddress: string, publicKey: string) {
  if (!blockchainLogicInited) {
    if (initing === null) {
      initing = new Promise(async (resolve) => {
        try {
          const contract = await Account.fromInit(userAddress);
          const deployed = await isDeployed(userAddress);
          if (!deployed) {
            await deployContract(userAddress);
          }
          const contractPublicKey = await getPublicKey(userAddress);
          if (contractPublicKey !== publicKey) {
            await setPublicKey(userAddress, publicKey);
          }
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

async function deployContract(userAddress: string) {
  const sender = await getBotSender();
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  console.log('Contract deploying');
  await openedContract.send(
    sender,
    { value: toNano('0.008') },
    {
      $$type: 'Deploy',
      queryId: BigInt(0),
    }
  );
  console.log('Contract deployment initiated');

  //TODO: get rid of it?
  await waitForAction(() => tonClient.isContractDeployed(contract.address));
  console.log('Contract deployed');
  console.log('Address:', contract.address.toString());
}

async function setPublicKey(userAddress: string, publicKey: string) {
  const sender = await getBotSender();
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  console.log('Setting public key...');
  await openedContract.send(
    sender,
    { value: toNano('0.008') },
    {
      $$type: 'SetPublicKey',
      publicKey,
    }
  );
  console.log('Public key set');

  //TODO: get rid of it?
  await waitForAction(async () => (await openedContract.getPublicKey()) === publicKey);
  console.log('Public key set');
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

export async function deploy(userAddress: string) {
  await deployContract(userAddress);
}
