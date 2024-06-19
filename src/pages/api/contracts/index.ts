// pages/api/contracts.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { KeyPair, mnemonicToPrivateKey } from '@ton/crypto';
import { Address, Dictionary, Sender, TonClient, WalletContractV3R2, toNano } from '@ton/ton';
import assert from 'assert';
import { ApiError } from 'types/ApiError';
import { Account, PeriodDataItem } from 'src/ton_client/tact_Account';
import { MonthPeriodData } from 'src/ton_client/tact_MonthPeriodData';
import { decryptData, derivePublicKey, encryptData } from '@/lib/encryption';

const tonClient = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  apiKey: process.env.TON_API_KEY,
});

async function getBotKeyPair(): Promise<KeyPair> {
  const mnemonics = process.env.WALLET_MNEMONIC?.split(' ') ?? [];
  assert(mnemonics.length > 0, 'Mnemonic is not provided');
  return await mnemonicToPrivateKey(mnemonics);
}

async function getBotSender(): Promise<Sender> {
  const keyPair = await getBotKeyPair();
  const wallet = WalletContractV3R2.create({
    workchain: 0,
    publicKey: keyPair.publicKey,
  });
  const provider = tonClient.provider(wallet.address, wallet.init);
  return wallet.sender(provider, keyPair.secretKey);
}

async function waitForAction(
  checkCondition: () => Promise<boolean>,
  attempts = 50,
  sleepDuration = 500
) {
  if (attempts <= 0) {
    throw new Error('Attempt number must be positive');
  }
  for (let i = 0; i < attempts; i++) {
    const isDone = await checkCondition();
    if (isDone) return;
    await new Promise((resolve) => {
      setTimeout(resolve, sleepDuration);
    });
  }
  throw new Error("Contract was not deployed. Check your wallet's transactions");
}

let blockchainLogicInited = false;
let initing: Promise<void> | null = null;

async function initBlockchainLogic(userAddress: string, publicKey: string) {
  if (!blockchainLogicInited) {
    if (initing === null) {
      initing = new Promise(async (resolve) => {
        try {
          const contract = await Account.fromInit(userAddress);
          const deployed = await tonClient.isContractDeployed(contract.address);
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
  await waitForAction(async () => (await openedContract.getPublicKey()) === publicKey);
  console.log('Public key set');
}

async function getPublicKey(userAddress: string): Promise<string> {
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const publicKey = await openedContract.getPublicKey();
  return publicKey;
}

interface OneMonthDataUpdate {
  toAdd: Date[];
  toDelete: Date[];
}

function getMonthIndex(date: Date): number {
  const yearSinceEpoch = date.getFullYear() - 1970;
  return yearSinceEpoch * 12 + date.getMonth();
}

function getMonthDataUpdates(toAdd: Date[], toDelete: Date[]): Map<number, OneMonthDataUpdate> {
  const updates = new Map<number, OneMonthDataUpdate>();
  for (const date of toAdd) {
    const month = getMonthIndex(date);
    const update = updates.get(month) || { toAdd: [], toDelete: [] };
    update.toAdd.push(date);
    updates.set(month, update);
  }
  for (const date of toDelete) {
    const month = getMonthIndex(date);
    const update = updates.get(month) || { toAdd: [], toDelete: [] };
    update.toDelete.push(date);
    updates.set(month, update);
  }
  return updates;
}

async function getEncryptedItemsToDelete(
  userAddress: string,
  privateKey: string,
  toDelete: Date[]
): Promise<string[]> {
  const dataOwnerAddress = Address.parse(userAddress);
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordsCount = await getFilledMonthsCount(userAddress);
  const encryptedDates: string[] = [];
  for (let seqno = 1; seqno <= recordsCount; seqno++) {
    const recordContractAddress = await openedContract.getMonthPeriodDataAddress(
      BigInt(seqno),
      dataOwnerAddress
    );
    const recordContract = MonthPeriodData.fromAddress(recordContractAddress);
    const openedRecordContract = tonClient.open(recordContract);
    const dataMap = await openedRecordContract.getData();
    for (let i = 1; i <= dataMap.size; i++) {
      const item = dataMap.get(BigInt(i));
      if (item) {
        const decryptedDate = Date.parse(decryptData(item.date, privateKey));
        if (toDelete.findIndex((d) => d.getTime() === decryptedDate) !== -1) {
          encryptedDates.push(item.date);
        }
      }
    }
  }
  return encryptedDates;
}

async function updateMonthPeriodData(
  userAddress: string,
  changes: { date: Date; action: 'add' | 'delete' }[],
  privateKey: string
): Promise<Date[]> {
  const savedData = await getMonthPeriodData(userAddress, privateKey);
  const toAdd: Date[] = [];
  const toDelete: Date[] = [];
  for (const change of changes) {
    if (change.action === 'add') {
      toAdd.push(change.date);
    } else if (change.action === 'delete') {
      toDelete.push(change.date);
    }
  }
  const expectedDateArray = [...savedData];
  for (const date of toDelete) {
    const index = expectedDateArray.findIndex((d) => d.getTime() === date.getTime());
    if (index !== -1) {
      expectedDateArray.splice(index, 1);
    }
  }
  expectedDateArray.push(...toAdd);
  const publicKey = derivePublicKey(privateKey);
  await runUpdateMonthPeriodData(userAddress, toAdd, toDelete, privateKey);
  await waitForAction(async () => {
    try {
      const savedData = await getMonthPeriodData(userAddress, privateKey);
      console.log('Saved data:', savedData);
      console.log('Expected data:', expectedDateArray);
      for (const date of expectedDateArray) {
        if (savedData.findIndex((d) => d.getTime() === date.getTime()) === -1) {
          console.log('Date not found:', date);
          return false;
        }
      }
      return true;
    } catch (e) {
      return false;
    }
  });
  return expectedDateArray;
}

async function runUpdateMonthPeriodData(
  userAddress: string,
  toAdd: Date[],
  toDelete: Date[],
  privateKey: string
) {
  assert(
    blockchainLogicInited,
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const publicKey = derivePublicKey(privateKey);
  const dataOwnerAddress = Address.parse(userAddress);
  console.log('Saving users health data');
  const sender = await getBotSender();
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const months = getMonthDataUpdates(toAdd, toDelete);
  months.forEach(async (monthData, monthIndex) => {
    const toAdd = Dictionary.empty<bigint, PeriodDataItem>();
    for (let i = 1; i <= monthData.toAdd.length; i++) {
      const date = monthData.toAdd[i - 1].toISOString();
      const encryptedDate = encryptData(date, publicKey);
      toAdd.set(BigInt(i), {
        $$type: 'PeriodDataItem',
        date: encryptedDate,
      });
    }
    const toDelete = Dictionary.empty<bigint, PeriodDataItem>();
    const encodedToDelete = await getEncryptedItemsToDelete(
      userAddress,
      privateKey,
      monthData.toDelete
    );
    console.log('Items to delete:', monthData.toDelete);
    console.log('Encoded to delete:', encodedToDelete);
    for (let i = 1; i <= encodedToDelete.length; i++) {
      const encryptedDate = encodedToDelete[i - 1];
      toDelete.set(BigInt(i), {
        $$type: 'PeriodDataItem',
        date: encryptedDate,
      });
    }
    await openedContract.send(
      sender,
      { value: toNano('0.04') },
      {
        $$type: 'UpdateMonthPeriodData',
        accessedAddress: dataOwnerAddress,
        monthIndex: BigInt(monthIndex),
        toAdd,
        toDelete,
      }
    );
  });
}

async function getFilledMonthsCount(userAddress: string): Promise<bigint> {
  assert(
    blockchainLogicInited,
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordsCount = await openedContract.getNumFilledMonths();
  return recordsCount;
}

async function getMonthPeriodData(userAddress: string, privateKey: string): Promise<Date[]> {
  assert(
    blockchainLogicInited,
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const dataOwnerAddress = Address.parse(userAddress);
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordsCount = await getFilledMonthsCount(userAddress);
  const data: Date[] = [];
  for (let seqno = 1; seqno <= recordsCount; seqno++) {
    const recordContractAddress = await openedContract.getMonthPeriodDataAddress(
      BigInt(seqno),
      dataOwnerAddress
    );
    const recordContract = MonthPeriodData.fromAddress(recordContractAddress);
    const openedRecordContract = tonClient.open(recordContract);
    const dataMap = await openedRecordContract.getData();
    for (let i = 1; i <= dataMap.size; i++) {
      const item = dataMap.get(BigInt(i));
      if (item) {
        const decryptedDate = decryptData(item.date, privateKey);
        data.push(new Date(Date.parse(decryptedDate)));
      }
    }
  }
  return data;
}

async function initAndGetMonthPeriodData(userAddress: string, publicKey: string, privateKey: string): Promise<Date[]> {
  await initBlockchainLogic(userAddress, publicKey);
  const monthPeriodData = await getMonthPeriodData(userAddress, privateKey);
  return monthPeriodData;
}

// Next.js API handler
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { action, userAddress, publicKey, privateKey, changes } = req.body;
  try {
    switch (action) {
      case 'initBlockchainLogic':
        await initBlockchainLogic(userAddress, publicKey);
        res.status(200).json({ message: 'Blockchain logic initialized' });
        break;
      case 'isContractDeployed':
        const isDeployed = await tonClient.isContractDeployed(userAddress);
        res.status(200).json({ isDeployed });
        break;
      case 'updateMonthPeriodData':
        const updatedDates = await updateMonthPeriodData(userAddress, changes, privateKey);
        res.status(200).json({ updatedDates });
        break;
      case 'getMonthPeriodData':
        const monthPeriodData = await getMonthPeriodData(userAddress, privateKey);
        res.status(200).json({ monthPeriodData });
        break;

      case 'initAndGetMonthPeriodData':
        const monthPeriodDataResponse = await initAndGetMonthPeriodData(userAddress, publicKey, privateKey);
        res.status(200).json({ monthPeriodDataResponse });
        break;

      default:
        res.status(400).json({ message: 'Invalid action' });
    }
  } catch (error: unknown) {
    console.error(error);
    const apiError = error as ApiError;
    if (apiError.response?.status === 429) {
      res.status(429).json({ error: 'Ton Blockchain слишком нагружен, попробуйте позже или переключите на традиционный режим' });
    } else if (apiError instanceof Error) {
      res.status(500).json({ error: apiError.message });
    } else {
      res.status(500).json({ error: 'An unknown error occurred' });
    }
  }
};
