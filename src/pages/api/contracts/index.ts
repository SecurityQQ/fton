import { Address, Cell, StateInit, TonClient, beginCell, storeStateInit, toNano } from '@ton/ton';
import { TonConnectUI } from '@tonconnect/ui-react';

import { Account } from 'src/contracts/build/Account/tact_Account';
import { HealthDataRecord } from 'src/contracts/build/Account/tact_HealthDataRecord';
import {
  getAddHealthDataPayload,
  getDeployPayload,
  getSetPublicTokenPayload,
} from 'src/contracts/contract_data_source';

const tonClient = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  apiKey: 'bfdde2d576e0ba956a83773736d1b1c63d2f8f71257340dc9637bd11e77e39f8',
});

export async function createAccount(client: TonConnectUI, userAddress: string, publicKey: string) {
  const init = await Account.init(userAddress);
  const contract = await Account.fromInit(userAddress);

  const codeCell = Cell.fromBase64(init.code.toBoc().toString('base64'));
  const dataCell = Cell.fromBase64(init.data.toBoc().toString('base64'));
  const stateInit: StateInit = {
    code: codeCell,
    data: dataCell,
  };
  const stateInitBuilder = beginCell();
  storeStateInit(stateInit)(stateInitBuilder);
  const stateInitCell = stateInitBuilder.endCell();

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: contract.address.toString(),
        amount: toNano('0.004').toString(),
        payload: getDeployPayload().toBoc().toString('base64'),
        stateInit: stateInitCell.toBoc().toString('base64'),
      },
      {
        address: contract.address.toString(),
        amount: toNano('0.004').toString(),
        payload: getSetPublicTokenPayload(publicKey).toBoc().toString('base64'),
      },
    ],
  };
  await client.sendTransaction(transaction);
}

export async function addHealthData(
  client: TonConnectUI,
  userAddress: string,
  encryptedData: string
) {
  const dataOwnerAddress = Address.parse(client.wallet!.account.address!);
  const init = await Account.init(userAddress);
  const contract = await Account.fromInit(userAddress);
  const healthData = getAddHealthDataPayload(dataOwnerAddress, encryptedData);
  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: contract.address.toString(),
        amount: toNano('0.02').toString(),
        payload: healthData.toBoc().toString('base64'),
      },
    ],
  };
  await client.sendTransaction(transaction);
}

export async function getRecordsCount(userAddress: string): Promise<bigint> {
  const contract = await Account.fromInit(userAddress);
  contract.getHealthDataAddress;
  const openedContract = tonClient.open(contract);
  const recordsCount = await openedContract.getNumHealthDataRecords();
  console.log(recordsCount);
  return recordsCount;
}

export async function getHealthDataAddress(
  client: TonConnectUI,
  userAddress: string,
  seqno: bigint
): Promise<string> {
  const dataOwnerAddress = Address.parse(client.wallet!.account.address!);
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordAddress = await openedContract.getHealthDataAddress(seqno, dataOwnerAddress);
  const healthDataContract = HealthDataRecord.fromAddress(recordAddress);
  const openedHealthDataContract = tonClient.open(healthDataContract);
  const encryptedData = await openedHealthDataContract.getEncryptedData();
  console.log(encryptedData);
  return encryptedData;
}
