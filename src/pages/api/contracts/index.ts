import { KeyPair, mnemonicToPrivateKey } from '@ton/crypto';
import { Address, Sender, TonClient, WalletContractV3R2, toNano } from '@ton/ton';
import assert from 'assert';

import { Account } from 'src/ton_client/tact_Account';
import { HealthDataRecord } from 'src/ton_client/tact_HealthDataRecord';

const tonClient = new TonClient({
  endpoint: 'https://testnet.toncenter.com/api/v2/jsonRPC',
  apiKey: 'bfdde2d576e0ba956a83773736d1b1c63d2f8f71257340dc9637bd11e77e39f8',
});

async function getBotKeyPair(): Promise<KeyPair> {
  const mnemonics = [
    'conduct',
    'insect',
    'era',
    'zebra',
    'dignity',
    'gauge',
    'unaware',
    'road',
    'hockey',
    'error',
    'rail',
    'easy',
    'need',
    'cry',
    'tired',
    'cloth',
    'satisfy',
    'muffin',
    'myth',
    'win',
    'couple',
    'task',
    'faint',
    'tail',
  ];
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
let initing = false;

export function isBlockchainLogicInited() {
  return blockchainLogicInited;
}

export async function initBlockchainLogic(userAddress: string, publicKey: string) {
  if (!blockchainLogicInited) {
    if (initing) return;
    initing = true;
    try {
      const sender = await getBotSender();
      const contract = await Account.fromInit(userAddress);
      const openedContract = tonClient.open(contract);
      const deployed = await tonClient.isContractDeployed(contract.address);
      if (!deployed) {
        await createAccount(userAddress, publicKey);
      }
      blockchainLogicInited = true;
    } finally {
      initing = false;
    }
  }
}

async function createAccount(userAddress: string, publicKey: string) {
  const sender = await getBotSender();
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  console.log('Contract deploying');
  await openedContract.send(
    sender,
    { value: toNano('0.004') },
    {
      $$type: 'Deploy',
      queryId: BigInt(0),
    }
  );
  await waitForAction(() => tonClient.isContractDeployed(contract.address));
  console.log('Contract deployed');
  console.log('Address:', contract.address.toString());
  console.log('Setting public key...');
  await openedContract.send(
    sender,
    { value: toNano('0.004') },
    {
      $$type: 'SetPublicKey',
      publicKey,
    }
  );
  await waitForAction(async () => (await openedContract.getPublicKey()) === publicKey);
  console.log('Public key set');
}

export async function getPublicKey(userAddress: string): Promise<string> {
  assert(
    blockchainLogicInited,
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const publicKey = await openedContract.getPublicKey();
  console.log(publicKey);
  return publicKey;
}

export async function addHealthData(userAddress: string, encryptedData: string) {
  assert(
    blockchainLogicInited,
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const dataOwnerAddress = Address.parse(userAddress);
  // const dataOwnerAddress = Address.parse('UQDKbjIcfM6ezt8KjKJJLshZJJSqX7XOA4ff-W72r5gqPuwA');
  console.log('Saving users health data');
  const sender = await getBotSender();
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordsCount = await openedContract.getNumHealthDataRecords();
  await openedContract.send(
    sender,
    { value: toNano('0.02') },
    {
      $$type: 'AddHealthData',
      encryptedData,
      accessedAddress: dataOwnerAddress,
    }
  );
  await waitForAction(
    async () => (await openedContract.getNumHealthDataRecords()) === recordsCount + BigInt(1)
  );
  console.log('Creating health data record contract...');
  const updatedRecordsCount = await openedContract.getNumHealthDataRecords();
  const recordContractAddress = await openedContract.getHealthDataAddress(
    updatedRecordsCount,
    dataOwnerAddress
  );
  const recordContract = HealthDataRecord.fromAddress(recordContractAddress);
  const openedRecordContract = tonClient.open(recordContract);
  await waitForAction(async () => await tonClient.isContractDeployed(openedRecordContract.address));
  console.log('Health data saved');
}

export async function getRecordsCount(userAddress: string): Promise<bigint> {
  assert(
    blockchainLogicInited,
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordsCount = await openedContract.getNumHealthDataRecords();
  console.log(recordsCount);
  return recordsCount;
}

export async function getHealthDataAddress(userAddress: string, seqno: bigint): Promise<string> {
  assert(
    blockchainLogicInited,
    'Blockchain logic is not initialized. Run initBlockchainLogic first'
  );
  const dataOwnerAddress = Address.parse(userAddress);
  // const dataOwnerAddress = Address.parse('UQDKbjIcfM6ezt8KjKJJLshZJJSqX7XOA4ff-W72r5gqPuwA');
  const contract = await Account.fromInit(userAddress);
  const openedContract = tonClient.open(contract);
  const recordContractAddress = await openedContract.getHealthDataAddress(seqno, dataOwnerAddress);
  const recordContract = HealthDataRecord.fromAddress(recordContractAddress);
  const openedRecordContract = tonClient.open(recordContract);
  const encryptedData = await openedRecordContract.getEncryptedData();
  console.log(encryptedData);
  return encryptedData;
}
