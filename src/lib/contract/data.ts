import { Address, Dictionary, toNano } from '@ton/ton';
import assert from 'assert';
import axios from 'axios';

import { decryptData, encryptData, derivePublicKey } from '@/lib/encryption';
import { Account, PeriodDataItem } from 'src/ton_client/tact_Account';
import { MonthPeriodData } from 'src/ton_client/tact_MonthPeriodData';

import { isContractDeployed } from './blockchain';
import { getBotSender } from './bot';
import { tonClient } from './tonClient';
import { getMonthDataUpdates, waitForAction } from './utils';

export async function updateMonthPeriodData(
  userAddress: string,
  changes: { date: Date; action: 'add' | 'delete' }[],
  privateKey: string
): Promise<{ success: boolean; error?: string; statusCode?: number; data?: Date[] }> {
  console.log('updateMonthPeriodData');
  try {
    const savedData = await getMonthPeriodData(userAddress, privateKey);
    console.log('savedData');
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
    const result = await runUpdateMonthPeriodData(userAddress, toAdd, toDelete, privateKey);
    if (!result.success) {
      return { success: false, error: result.error, statusCode: result.statusCode };
    }
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
    return { success: true, data: expectedDateArray };
  } catch (error) {
    console.error('Failed to update month period data:', error);
    return { success: false, error: 'TON перегружен, не смогли обновить данные' };
  }
}

export async function runUpdateMonthPeriodData(
  userAddress: string,
  toAdd: Date[],
  toDelete: Date[],
  privateKey: string
): Promise<{ success: boolean; error?: string; statusCode?: number }> {
  assert(
    await isContractDeployed(userAddress),
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const publicKey = derivePublicKey(privateKey);
  const dataOwnerAddress = Address.parse(userAddress);
  console.log('Saving users health data');
  const sender = await getBotSender();
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const months = getMonthDataUpdates(toAdd, toDelete);

  const monthEntries = months.entries();
  let monthEntry;
  while (!(monthEntry = monthEntries.next()).done) {
    // es5 safe iteration instead of  (const [monthIndex, monthData] of months.entries()) {
    const monthIndex = monthEntry.value[0];
    const monthData = monthEntry.value[1];

    const toAddDict = Dictionary.empty<bigint, PeriodDataItem>();
    for (let i = 1; i <= monthData.toAdd.length; i++) {
      const date = monthData.toAdd[i - 1].toISOString();
      const encryptedDate = encryptData(date, publicKey);
      toAddDict.set(BigInt(i), {
        $$type: 'PeriodDataItem',
        date: encryptedDate,
      });
    }
    const toDeleteDict = Dictionary.empty<bigint, PeriodDataItem>();
    const encodedToDelete = await getEncryptedItemsToDelete(
      userAddress,
      privateKey,
      monthData.toDelete
    );
    console.log('Items to delete:', monthData.toDelete);
    console.log('Encoded to delete:', encodedToDelete);
    for (let i = 1; i <= encodedToDelete.length; i++) {
      const encryptedDate = encodedToDelete[i - 1];
      toDeleteDict.set(BigInt(i), {
        $$type: 'PeriodDataItem',
        date: encryptedDate,
      });
    }
    try {
      await openedContract.send(
        sender,
        { value: toNano('0.04') },
        {
          $$type: 'UpdateMonthPeriodData',
          accessedAddress: dataOwnerAddress,
          monthIndex: BigInt(monthIndex),
          toAdd: toAddDict,
          toDelete: toDeleteDict,
        }
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Error sending update month period data:', error);
        return { success: false, error: error.message, statusCode: error.response?.status };
      } else {
        console.error('Failed to send update month period data:', error);
        return { success: false, error: 'Failed to send update month period data' };
      }
    }
  }

  return { success: true };
}

export async function getEncryptedItemsToDelete(
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

export async function getMonthPeriodData(userAddress: string, privateKey: string): Promise<Date[]> {
  assert(
    await isContractDeployed(userAddress),
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

export async function getFilledMonthsCount(userAddress: string): Promise<bigint> {
  assert(
    await isContractDeployed(userAddress),
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordsCount = await openedContract.getNumFilledMonths();
  return recordsCount;
}
