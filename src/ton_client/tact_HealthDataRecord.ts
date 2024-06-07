import {
  Cell,
  Slice,
  Address,
  Builder,
  beginCell,
  ComputeError,
  TupleItem,
  TupleReader,
  Dictionary,
  contractAddress,
  ContractProvider,
  Sender,
  Contract,
  ContractABI,
  ABIType,
  ABIGetter,
  ABIReceiver,
  TupleBuilder,
  DictionaryValue,
} from '@ton/core';

export type StateInit = {
  $$type: 'StateInit';
  code: Cell;
  data: Cell;
};

export function storeStateInit(src: StateInit) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeRef(src.code);
    b_0.storeRef(src.data);
  };
}

export function loadStateInit(slice: Slice) {
  const sc_0 = slice;
  const _code = sc_0.loadRef();
  const _data = sc_0.loadRef();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
  const _code = source.readCell();
  const _data = source.readCell();
  return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
  const builder = new TupleBuilder();
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
    },
    parse: (src) => {
      return loadStateInit(src.loadRef().beginParse());
    },
  };
}

export type Context = {
  $$type: 'Context';
  bounced: boolean;
  sender: Address;
  value: bigint;
  raw: Cell;
};

export function storeContext(src: Context) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounced);
    b_0.storeAddress(src.sender);
    b_0.storeInt(src.value, 257);
    b_0.storeRef(src.raw);
  };
}

export function loadContext(slice: Slice) {
  const sc_0 = slice;
  const _bounced = sc_0.loadBit();
  const _sender = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _raw = sc_0.loadRef();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function loadTupleContext(source: TupleReader) {
  const _bounced = source.readBoolean();
  const _sender = source.readAddress();
  const _value = source.readBigNumber();
  const _raw = source.readCell();
  return {
    $$type: 'Context' as const,
    bounced: _bounced,
    sender: _sender,
    value: _value,
    raw: _raw,
  };
}

function storeTupleContext(source: Context) {
  const builder = new TupleBuilder();
  builder.writeBoolean(source.bounced);
  builder.writeAddress(source.sender);
  builder.writeNumber(source.value);
  builder.writeSlice(source.raw);
  return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeContext(src)).endCell());
    },
    parse: (src) => {
      return loadContext(src.loadRef().beginParse());
    },
  };
}

export type SendParameters = {
  $$type: 'SendParameters';
  bounce: boolean;
  to: Address;
  value: bigint;
  mode: bigint;
  body: Cell | null;
  code: Cell | null;
  data: Cell | null;
};

export function storeSendParameters(src: SendParameters) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeBit(src.bounce);
    b_0.storeAddress(src.to);
    b_0.storeInt(src.value, 257);
    b_0.storeInt(src.mode, 257);
    if (src.body !== null && src.body !== undefined) {
      b_0.storeBit(true).storeRef(src.body);
    } else {
      b_0.storeBit(false);
    }
    if (src.code !== null && src.code !== undefined) {
      b_0.storeBit(true).storeRef(src.code);
    } else {
      b_0.storeBit(false);
    }
    if (src.data !== null && src.data !== undefined) {
      b_0.storeBit(true).storeRef(src.data);
    } else {
      b_0.storeBit(false);
    }
  };
}

export function loadSendParameters(slice: Slice) {
  const sc_0 = slice;
  const _bounce = sc_0.loadBit();
  const _to = sc_0.loadAddress();
  const _value = sc_0.loadIntBig(257);
  const _mode = sc_0.loadIntBig(257);
  const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
  const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function loadTupleSendParameters(source: TupleReader) {
  const _bounce = source.readBoolean();
  const _to = source.readAddress();
  const _value = source.readBigNumber();
  const _mode = source.readBigNumber();
  const _body = source.readCellOpt();
  const _code = source.readCellOpt();
  const _data = source.readCellOpt();
  return {
    $$type: 'SendParameters' as const,
    bounce: _bounce,
    to: _to,
    value: _value,
    mode: _mode,
    body: _body,
    code: _code,
    data: _data,
  };
}

function storeTupleSendParameters(source: SendParameters) {
  const builder = new TupleBuilder();
  builder.writeBoolean(source.bounce);
  builder.writeAddress(source.to);
  builder.writeNumber(source.value);
  builder.writeNumber(source.mode);
  builder.writeCell(source.body);
  builder.writeCell(source.code);
  builder.writeCell(source.data);
  return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
    },
    parse: (src) => {
      return loadSendParameters(src.loadRef().beginParse());
    },
  };
}

export type Deploy = {
  $$type: 'Deploy';
  queryId: bigint;
};

export function storeDeploy(src: Deploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2490013878, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2490013878) {
    throw Error('Invalid prefix');
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadDeploy(src.loadRef().beginParse());
    },
  };
}

export type DeployOk = {
  $$type: 'DeployOk';
  queryId: bigint;
};

export function storeDeployOk(src: DeployOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2952335191, 32);
    b_0.storeUint(src.queryId, 64);
  };
}

export function loadDeployOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2952335191) {
    throw Error('Invalid prefix');
  }
  const _queryId = sc_0.loadUintBig(64);
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
    },
    parse: (src) => {
      return loadDeployOk(src.loadRef().beginParse());
    },
  };
}

export type FactoryDeploy = {
  $$type: 'FactoryDeploy';
  queryId: bigint;
  cashback: Address;
};

export function storeFactoryDeploy(src: FactoryDeploy) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1829761339, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.cashback);
  };
}

export function loadFactoryDeploy(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1829761339) {
    throw Error('Invalid prefix');
  }
  const _queryId = sc_0.loadUintBig(64);
  const _cashback = sc_0.loadAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _cashback = source.readAddress();
  return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.cashback);
  return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
    },
    parse: (src) => {
      return loadFactoryDeploy(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwner = {
  $$type: 'ChangeOwner';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwner(src: ChangeOwner) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2174598809, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwner(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2174598809) {
    throw Error('Invalid prefix');
  }
  const _queryId = sc_0.loadUintBig(64);
  const _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _newOwner = source.readAddress();
  return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwner(src.loadRef().beginParse());
    },
  };
}

export type ChangeOwnerOk = {
  $$type: 'ChangeOwnerOk';
  queryId: bigint;
  newOwner: Address;
};

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(846932810, 32);
    b_0.storeUint(src.queryId, 64);
    b_0.storeAddress(src.newOwner);
  };
}

export function loadChangeOwnerOk(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 846932810) {
    throw Error('Invalid prefix');
  }
  const _queryId = sc_0.loadUintBig(64);
  const _newOwner = sc_0.loadAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
  const _queryId = source.readBigNumber();
  const _newOwner = source.readAddress();
  return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.queryId);
  builder.writeAddress(source.newOwner);
  return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
    },
    parse: (src) => {
      return loadChangeOwnerOk(src.loadRef().beginParse());
    },
  };
}

export type AddHealthDataResponse = {
  $$type: 'AddHealthDataResponse';
  seqno: bigint;
};

export function storeAddHealthDataResponse(src: AddHealthDataResponse) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1787238602, 32);
    b_0.storeUint(src.seqno, 256);
  };
}

export function loadAddHealthDataResponse(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1787238602) {
    throw Error('Invalid prefix');
  }
  const _seqno = sc_0.loadUintBig(256);
  return { $$type: 'AddHealthDataResponse' as const, seqno: _seqno };
}

function loadTupleAddHealthDataResponse(source: TupleReader) {
  const _seqno = source.readBigNumber();
  return { $$type: 'AddHealthDataResponse' as const, seqno: _seqno };
}

function storeTupleAddHealthDataResponse(source: AddHealthDataResponse) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.seqno);
  return builder.build();
}

function dictValueParserAddHealthDataResponse(): DictionaryValue<AddHealthDataResponse> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddHealthDataResponse(src)).endCell());
    },
    parse: (src) => {
      return loadAddHealthDataResponse(src.loadRef().beginParse());
    },
  };
}

export type AddHealthData = {
  $$type: 'AddHealthData';
  accessedAddress: Address;
  encryptedData: string;
};

export function storeAddHealthData(src: AddHealthData) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(315300219, 32);
    b_0.storeAddress(src.accessedAddress);
    b_0.storeStringRefTail(src.encryptedData);
  };
}

export function loadAddHealthData(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 315300219) {
    throw Error('Invalid prefix');
  }
  const _accessedAddress = sc_0.loadAddress();
  const _encryptedData = sc_0.loadStringRefTail();
  return {
    $$type: 'AddHealthData' as const,
    accessedAddress: _accessedAddress,
    encryptedData: _encryptedData,
  };
}

function loadTupleAddHealthData(source: TupleReader) {
  const _accessedAddress = source.readAddress();
  const _encryptedData = source.readString();
  return {
    $$type: 'AddHealthData' as const,
    accessedAddress: _accessedAddress,
    encryptedData: _encryptedData,
  };
}

function storeTupleAddHealthData(source: AddHealthData) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.accessedAddress);
  builder.writeString(source.encryptedData);
  return builder.build();
}

function dictValueParserAddHealthData(): DictionaryValue<AddHealthData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddHealthData(src)).endCell());
    },
    parse: (src) => {
      return loadAddHealthData(src.loadRef().beginParse());
    },
  };
}

export type AddInternalHealthData = {
  $$type: 'AddInternalHealthData';
  encryptedData: string;
};

export function storeAddInternalHealthData(src: AddInternalHealthData) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3663464031, 32);
    b_0.storeStringRefTail(src.encryptedData);
  };
}

export function loadAddInternalHealthData(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3663464031) {
    throw Error('Invalid prefix');
  }
  const _encryptedData = sc_0.loadStringRefTail();
  return { $$type: 'AddInternalHealthData' as const, encryptedData: _encryptedData };
}

function loadTupleAddInternalHealthData(source: TupleReader) {
  const _encryptedData = source.readString();
  return { $$type: 'AddInternalHealthData' as const, encryptedData: _encryptedData };
}

function storeTupleAddInternalHealthData(source: AddInternalHealthData) {
  const builder = new TupleBuilder();
  builder.writeString(source.encryptedData);
  return builder.build();
}

function dictValueParserAddInternalHealthData(): DictionaryValue<AddInternalHealthData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeAddInternalHealthData(src)).endCell());
    },
    parse: (src) => {
      return loadAddInternalHealthData(src.loadRef().beginParse());
    },
  };
}

export type SetPublicKey = {
  $$type: 'SetPublicKey';
  publicKey: string;
};

export function storeSetPublicKey(src: SetPublicKey) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1524430048, 32);
    b_0.storeStringRefTail(src.publicKey);
  };
}

export function loadSetPublicKey(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1524430048) {
    throw Error('Invalid prefix');
  }
  const _publicKey = sc_0.loadStringRefTail();
  return { $$type: 'SetPublicKey' as const, publicKey: _publicKey };
}

function loadTupleSetPublicKey(source: TupleReader) {
  const _publicKey = source.readString();
  return { $$type: 'SetPublicKey' as const, publicKey: _publicKey };
}

function storeTupleSetPublicKey(source: SetPublicKey) {
  const builder = new TupleBuilder();
  builder.writeString(source.publicKey);
  return builder.build();
}

function dictValueParserSetPublicKey(): DictionaryValue<SetPublicKey> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSetPublicKey(src)).endCell());
    },
    parse: (src) => {
      return loadSetPublicKey(src.loadRef().beginParse());
    },
  };
}

type HealthDataRecord_init_args = {
  $$type: 'HealthDataRecord_init_args';
  parent: Address;
  seqno: bigint;
  accessedAddress: Address;
};

function initHealthDataRecord_init_args(src: HealthDataRecord_init_args) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeAddress(src.parent);
    b_0.storeInt(src.seqno, 257);
    b_0.storeAddress(src.accessedAddress);
  };
}

async function HealthDataRecord_init(parent: Address, seqno: bigint, accessedAddress: Address) {
  const __code = Cell.fromBase64(
    'te6ccgECFgEAAqYAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVE9s88uCCEgQFAgFYBgcAnAGSMH/gcCHXScIflTAg1wsf3oIQ2lwGX7qOMNMfAYIQ2lwGX7ry4IHUAdAxggDUhPhCUmDHBfL0ggDxVosIUAMB+QEB+QG6EvL0f+AwcACsyPhDAcx/AcoAVTBQQyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsv/WCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYzxbJAczJ7VQCASAICQIBIA4PAhG22Btnm2eNiDASCgIBIAsMAAj4J28QAhGwx3bPNs8bEGASDQC5svRgnBc7D1dLK57HoTsOdZKhRtmgnCd1jUtK2R8syLTry398WI5gnAgVcAbgGdjlM5YOq5HJbLDgnAb1J3vlUWW8cdT094FWcMmgnCdl05as07LczoOlm2UZuikgAAIgAgEgEBECEbT8W2ebZ42IMBITABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVJxMkExSlFiM1BHUFdzTExnRXltYjEyVVZqR1NMZXdrTDZGaWlwNjNTNHh5ggAcTtRNDUAfhj0gABjkr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAUQzBsFOD4KNcLCoMJuvLgiRQAAiEBlvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzAD0VjbPBUABIsI'
  );
  const __system = Cell.fromBase64(
    'te6cckECGAEAArAAAQHAAQEFocGJAgEU/wD0pBP0vPLICwMCAWIEBwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRPbPPLgghQFBgCcAZIwf+BwIddJwh+VMCDXCx/eghDaXAZfuo4w0x8BghDaXAZfuvLggdQB0DGCANSE+EJSYMcF8vSCAPFWiwhQAwH5AQH5AboS8vR/4DBwAKzI+EMBzH8BygBVMFBDINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8Wy/9YINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFjPFskBzMntVAIBWAgPAgEgCQsCEbbYG2ebZ42IMBQKAAj4J28QAgEgDA4CEbDHds82zxsQYBQNAAIgALmy9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSACASAQEwIBIBESABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbVJxMkExSlFiM1BHUFdzTExnRXltYjEyVVZqR1NMZXdrTDZGaWlwNjNTNHh5ggAhG0/Ftnm2eNiDAUFwHE7UTQ1AH4Y9IAAY5K+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT//pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQFEMwbBTg+CjXCwqDCbry4IkVAZb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwA9FY2zwWAASLCAACIV3F2gI='
  );
  const builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initHealthDataRecord_init_args({
    $$type: 'HealthDataRecord_init_args',
    parent,
    seqno,
    accessedAddress,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const HealthDataRecord_errors: { [key: number]: { message: string } } = {
  2: { message: `Stack undeflow` },
  3: { message: `Stack overflow` },
  4: { message: `Integer overflow` },
  5: { message: `Integer out of expected range` },
  6: { message: `Invalid opcode` },
  7: { message: `Type check error` },
  8: { message: `Cell overflow` },
  9: { message: `Cell underflow` },
  10: { message: `Dictionary error` },
  13: { message: `Out of gas error` },
  32: { message: `Method ID not found` },
  34: { message: `Action is invalid or not supported` },
  37: { message: `Not enough TON` },
  38: { message: `Not enough extra-currencies` },
  128: { message: `Null reference exception` },
  129: { message: `Invalid serialization prefix` },
  130: { message: `Invalid incoming message` },
  131: { message: `Constraints error` },
  132: { message: `Access denied` },
  133: { message: `Contract stopped` },
  134: { message: `Invalid argument` },
  135: { message: `Code of a contract was not found` },
  136: { message: `Invalid address` },
  137: { message: `Masterchain support is not enabled for this contract` },
  4429: { message: `Invalid sender` },
  54404: { message: `Parent only` },
  61782: { message: `Data already set` },
};

const HealthDataRecord_types: ABIType[] = [
  {
    name: 'StateInit',
    header: null,
    fields: [
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: false } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: false } },
    ],
  },
  {
    name: 'Context',
    header: null,
    fields: [
      { name: 'bounced', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'sender', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'raw', type: { kind: 'simple', type: 'slice', optional: false } },
    ],
  },
  {
    name: 'SendParameters',
    header: null,
    fields: [
      { name: 'bounce', type: { kind: 'simple', type: 'bool', optional: false } },
      { name: 'to', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'value', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'mode', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'body', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'code', type: { kind: 'simple', type: 'cell', optional: true } },
      { name: 'data', type: { kind: 'simple', type: 'cell', optional: true } },
    ],
  },
  {
    name: 'Deploy',
    header: 2490013878,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'DeployOk',
    header: 2952335191,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
    ],
  },
  {
    name: 'FactoryDeploy',
    header: 1829761339,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'cashback', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'ChangeOwner',
    header: 2174598809,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'newOwner', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'ChangeOwnerOk',
    header: 846932810,
    fields: [
      { name: 'queryId', type: { kind: 'simple', type: 'uint', optional: false, format: 64 } },
      { name: 'newOwner', type: { kind: 'simple', type: 'address', optional: false } },
    ],
  },
  {
    name: 'AddHealthDataResponse',
    header: 1787238602,
    fields: [
      { name: 'seqno', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
    ],
  },
  {
    name: 'AddHealthData',
    header: 315300219,
    fields: [
      { name: 'accessedAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'encryptedData', type: { kind: 'simple', type: 'string', optional: false } },
    ],
  },
  {
    name: 'AddInternalHealthData',
    header: 3663464031,
    fields: [{ name: 'encryptedData', type: { kind: 'simple', type: 'string', optional: false } }],
  },
  {
    name: 'SetPublicKey',
    header: 1524430048,
    fields: [{ name: 'publicKey', type: { kind: 'simple', type: 'string', optional: false } }],
  },
];

const HealthDataRecord_getters: ABIGetter[] = [
  {
    name: 'accessedAddress',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
  {
    name: 'encryptedData',
    arguments: [],
    returnType: { kind: 'simple', type: 'string', optional: false },
  },
  {
    name: 'balance',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
];

const HealthDataRecord_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'AddInternalHealthData' } },
];

export class HealthDataRecord implements Contract {
  static async init(parent: Address, seqno: bigint, accessedAddress: Address) {
    return await HealthDataRecord_init(parent, seqno, accessedAddress);
  }

  static async fromInit(parent: Address, seqno: bigint, accessedAddress: Address) {
    const init = await HealthDataRecord_init(parent, seqno, accessedAddress);
    const address = contractAddress(0, init);
    return new HealthDataRecord(address, init);
  }

  static fromAddress(address: Address) {
    return new HealthDataRecord(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: HealthDataRecord_types,
    getters: HealthDataRecord_getters,
    receivers: HealthDataRecord_receivers,
    errors: HealthDataRecord_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: AddInternalHealthData
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'AddInternalHealthData'
    ) {
      body = beginCell().store(storeAddInternalHealthData(message)).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body });
  }

  async getAccessedAddress(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('accessedAddress', builder.build())).stack;
    const result = source.readAddress();
    return result;
  }

  async getEncryptedData(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('encryptedData', builder.build())).stack;
    const result = source.readString();
    return result;
  }

  async getBalance(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('balance', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }
}
