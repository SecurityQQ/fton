import {
  ABIGetter,
  ABIReceiver,
  ABIType,
  Address,
  Builder,
  Cell,
  Contract,
  ContractABI,
  ContractProvider,
  DictionaryValue,
  Sender,
  Slice,
  TupleBuilder,
  TupleReader,
  beginCell,
  contractAddress,
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
  encryptedPeriodDateStart: string;
  encryptedPeriodDateEnd: string;
};

export function storeAddHealthData(src: AddHealthData) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(2553461971, 32);
    b_0.storeAddress(src.accessedAddress);
    b_0.storeStringRefTail(src.encryptedPeriodDateStart);
    b_0.storeStringRefTail(src.encryptedPeriodDateEnd);
  };
}

export function loadAddHealthData(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 2553461971) {
    throw Error('Invalid prefix');
  }
  const _accessedAddress = sc_0.loadAddress();
  const _encryptedPeriodDateStart = sc_0.loadStringRefTail();
  const _encryptedPeriodDateEnd = sc_0.loadStringRefTail();
  return {
    $$type: 'AddHealthData' as const,
    accessedAddress: _accessedAddress,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
  };
}

function loadTupleAddHealthData(source: TupleReader) {
  const _accessedAddress = source.readAddress();
  const _encryptedPeriodDateStart = source.readString();
  const _encryptedPeriodDateEnd = source.readString();
  return {
    $$type: 'AddHealthData' as const,
    accessedAddress: _accessedAddress,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
  };
}

function storeTupleAddHealthData(source: AddHealthData) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.accessedAddress);
  builder.writeString(source.encryptedPeriodDateStart);
  builder.writeString(source.encryptedPeriodDateEnd);
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
  encryptedPeriodDateStart: string;
  encryptedPeriodDateEnd: string;
};

export function storeAddInternalHealthData(src: AddInternalHealthData) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(779420174, 32);
    b_0.storeStringRefTail(src.encryptedPeriodDateStart);
    b_0.storeStringRefTail(src.encryptedPeriodDateEnd);
  };
}

export function loadAddInternalHealthData(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 779420174) {
    throw Error('Invalid prefix');
  }
  const _encryptedPeriodDateStart = sc_0.loadStringRefTail();
  const _encryptedPeriodDateEnd = sc_0.loadStringRefTail();
  return {
    $$type: 'AddInternalHealthData' as const,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
  };
}

function loadTupleAddInternalHealthData(source: TupleReader) {
  const _encryptedPeriodDateStart = source.readString();
  const _encryptedPeriodDateEnd = source.readString();
  return {
    $$type: 'AddInternalHealthData' as const,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
  };
}

function storeTupleAddInternalHealthData(source: AddInternalHealthData) {
  const builder = new TupleBuilder();
  builder.writeString(source.encryptedPeriodDateStart);
  builder.writeString(source.encryptedPeriodDateEnd);
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

export type SetInactiveRecord = {
  $$type: 'SetInactiveRecord';
  accessedAddress: Address;
  seqno: bigint;
};

export function storeSetInactiveRecord(src: SetInactiveRecord) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3088345220, 32);
    b_0.storeAddress(src.accessedAddress);
    b_0.storeUint(src.seqno, 256);
  };
}

export function loadSetInactiveRecord(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3088345220) {
    throw Error('Invalid prefix');
  }
  const _accessedAddress = sc_0.loadAddress();
  const _seqno = sc_0.loadUintBig(256);
  return { $$type: 'SetInactiveRecord' as const, accessedAddress: _accessedAddress, seqno: _seqno };
}

function loadTupleSetInactiveRecord(source: TupleReader) {
  const _accessedAddress = source.readAddress();
  const _seqno = source.readBigNumber();
  return { $$type: 'SetInactiveRecord' as const, accessedAddress: _accessedAddress, seqno: _seqno };
}

function storeTupleSetInactiveRecord(source: SetInactiveRecord) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.accessedAddress);
  builder.writeNumber(source.seqno);
  return builder.build();
}

function dictValueParserSetInactiveRecord(): DictionaryValue<SetInactiveRecord> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSetInactiveRecord(src)).endCell());
    },
    parse: (src) => {
      return loadSetInactiveRecord(src.loadRef().beginParse());
    },
  };
}

export type SetInactiveRecordInternal = {
  $$type: 'SetInactiveRecordInternal';
  excess: Address;
};

export function storeSetInactiveRecordInternal(src: SetInactiveRecordInternal) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(3184535658, 32);
    b_0.storeAddress(src.excess);
  };
}

export function loadSetInactiveRecordInternal(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 3184535658) {
    throw Error('Invalid prefix');
  }
  const _excess = sc_0.loadAddress();
  return { $$type: 'SetInactiveRecordInternal' as const, excess: _excess };
}

function loadTupleSetInactiveRecordInternal(source: TupleReader) {
  const _excess = source.readAddress();
  return { $$type: 'SetInactiveRecordInternal' as const, excess: _excess };
}

function storeTupleSetInactiveRecordInternal(source: SetInactiveRecordInternal) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.excess);
  return builder.build();
}

function dictValueParserSetInactiveRecordInternal(): DictionaryValue<SetInactiveRecordInternal> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeSetInactiveRecordInternal(src)).endCell());
    },
    parse: (src) => {
      return loadSetInactiveRecordInternal(src.loadRef().beginParse());
    },
  };
}

export type ChangeHealthData = {
  $$type: 'ChangeHealthData';
  accessedAddress: Address;
  seqno: bigint;
  encryptedPeriodDateStart: string;
  encryptedPeriodDateEnd: string;
};

export function storeChangeHealthData(src: ChangeHealthData) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1397979250, 32);
    b_0.storeAddress(src.accessedAddress);
    b_0.storeUint(src.seqno, 256);
    b_0.storeStringRefTail(src.encryptedPeriodDateStart);
    b_0.storeStringRefTail(src.encryptedPeriodDateEnd);
  };
}

export function loadChangeHealthData(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1397979250) {
    throw Error('Invalid prefix');
  }
  const _accessedAddress = sc_0.loadAddress();
  const _seqno = sc_0.loadUintBig(256);
  const _encryptedPeriodDateStart = sc_0.loadStringRefTail();
  const _encryptedPeriodDateEnd = sc_0.loadStringRefTail();
  return {
    $$type: 'ChangeHealthData' as const,
    accessedAddress: _accessedAddress,
    seqno: _seqno,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
  };
}

function loadTupleChangeHealthData(source: TupleReader) {
  const _accessedAddress = source.readAddress();
  const _seqno = source.readBigNumber();
  const _encryptedPeriodDateStart = source.readString();
  const _encryptedPeriodDateEnd = source.readString();
  return {
    $$type: 'ChangeHealthData' as const,
    accessedAddress: _accessedAddress,
    seqno: _seqno,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
  };
}

function storeTupleChangeHealthData(source: ChangeHealthData) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.accessedAddress);
  builder.writeNumber(source.seqno);
  builder.writeString(source.encryptedPeriodDateStart);
  builder.writeString(source.encryptedPeriodDateEnd);
  return builder.build();
}

function dictValueParserChangeHealthData(): DictionaryValue<ChangeHealthData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeChangeHealthData(src)).endCell());
    },
    parse: (src) => {
      return loadChangeHealthData(src.loadRef().beginParse());
    },
  };
}

export type HealthDataState = {
  $$type: 'HealthDataState';
  encryptedPeriodDateStart: string;
  encryptedPeriodDateEnd: string;
  recordIsActive: boolean;
};

export function storeHealthDataState(src: HealthDataState) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(4170313116, 32);
    b_0.storeStringRefTail(src.encryptedPeriodDateStart);
    b_0.storeStringRefTail(src.encryptedPeriodDateEnd);
    b_0.storeBit(src.recordIsActive);
  };
}

export function loadHealthDataState(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 4170313116) {
    throw Error('Invalid prefix');
  }
  const _encryptedPeriodDateStart = sc_0.loadStringRefTail();
  const _encryptedPeriodDateEnd = sc_0.loadStringRefTail();
  const _recordIsActive = sc_0.loadBit();
  return {
    $$type: 'HealthDataState' as const,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
    recordIsActive: _recordIsActive,
  };
}

function loadTupleHealthDataState(source: TupleReader) {
  const _encryptedPeriodDateStart = source.readString();
  const _encryptedPeriodDateEnd = source.readString();
  const _recordIsActive = source.readBoolean();
  return {
    $$type: 'HealthDataState' as const,
    encryptedPeriodDateStart: _encryptedPeriodDateStart,
    encryptedPeriodDateEnd: _encryptedPeriodDateEnd,
    recordIsActive: _recordIsActive,
  };
}

function storeTupleHealthDataState(source: HealthDataState) {
  const builder = new TupleBuilder();
  builder.writeString(source.encryptedPeriodDateStart);
  builder.writeString(source.encryptedPeriodDateEnd);
  builder.writeBoolean(source.recordIsActive);
  return builder.build();
}

function dictValueParserHealthDataState(): DictionaryValue<HealthDataState> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeHealthDataState(src)).endCell());
    },
    parse: (src) => {
      return loadHealthDataState(src.loadRef().beginParse());
    },
  };
}

type Account_init_args = {
  $$type: 'Account_init_args';
  accountOwner: string;
};

function initAccount_init_args(src: Account_init_args) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeStringRefTail(src.accountOwner);
  };
}

async function Account_init(accountOwner: string) {
  const __code = Cell.fromBase64(
    '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'
  );
  const __system = Cell.fromBase64(
    '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'
  );
  const builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initAccount_init_args({ $$type: 'Account_init_args', accountOwner })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const Account_errors: { [key: number]: { message: string } } = {
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
  49405: { message: `Record does not exist` },
  54404: { message: `Parent only` },
};

const Account_types: ABIType[] = [
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
    header: 2553461971,
    fields: [
      { name: 'accessedAddress', type: { kind: 'simple', type: 'address', optional: false } },
      {
        name: 'encryptedPeriodDateStart',
        type: { kind: 'simple', type: 'string', optional: false },
      },
      { name: 'encryptedPeriodDateEnd', type: { kind: 'simple', type: 'string', optional: false } },
    ],
  },
  {
    name: 'AddInternalHealthData',
    header: 779420174,
    fields: [
      {
        name: 'encryptedPeriodDateStart',
        type: { kind: 'simple', type: 'string', optional: false },
      },
      { name: 'encryptedPeriodDateEnd', type: { kind: 'simple', type: 'string', optional: false } },
    ],
  },
  {
    name: 'SetPublicKey',
    header: 1524430048,
    fields: [{ name: 'publicKey', type: { kind: 'simple', type: 'string', optional: false } }],
  },
  {
    name: 'SetInactiveRecord',
    header: 3088345220,
    fields: [
      { name: 'accessedAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'seqno', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
    ],
  },
  {
    name: 'SetInactiveRecordInternal',
    header: 3184535658,
    fields: [{ name: 'excess', type: { kind: 'simple', type: 'address', optional: false } }],
  },
  {
    name: 'ChangeHealthData',
    header: 1397979250,
    fields: [
      { name: 'accessedAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'seqno', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
      {
        name: 'encryptedPeriodDateStart',
        type: { kind: 'simple', type: 'string', optional: false },
      },
      { name: 'encryptedPeriodDateEnd', type: { kind: 'simple', type: 'string', optional: false } },
    ],
  },
  {
    name: 'HealthDataState',
    header: 4170313116,
    fields: [
      {
        name: 'encryptedPeriodDateStart',
        type: { kind: 'simple', type: 'string', optional: false },
      },
      { name: 'encryptedPeriodDateEnd', type: { kind: 'simple', type: 'string', optional: false } },
      { name: 'recordIsActive', type: { kind: 'simple', type: 'bool', optional: false } },
    ],
  },
];

const Account_getters: ABIGetter[] = [
  {
    name: 'publicKey',
    arguments: [],
    returnType: { kind: 'simple', type: 'string', optional: false },
  },
  {
    name: 'numHealthDataRecords',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'numAccesses',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'healthDataAddress',
    arguments: [
      { name: 'seqno', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      { name: 'accessedAddress', type: { kind: 'simple', type: 'address', optional: false } },
    ],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
  {
    name: 'balance',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'owner',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
];

const Account_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'SetPublicKey' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'AddHealthData' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'ChangeHealthData' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'SetInactiveRecord' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'Deploy' } },
];

export class Account implements Contract {
  static async init(accountOwner: string) {
    return await Account_init(accountOwner);
  }

  static async fromInit(accountOwner: string) {
    const init = await Account_init(accountOwner);
    const address = contractAddress(0, init);
    return new Account(address, init);
  }

  static fromAddress(address: Address) {
    return new Account(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: Account_types,
    getters: Account_getters,
    receivers: Account_receivers,
    errors: Account_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: SetPublicKey | AddHealthData | ChangeHealthData | SetInactiveRecord | Deploy
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetPublicKey'
    ) {
      body = beginCell().store(storeSetPublicKey(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'AddHealthData'
    ) {
      body = beginCell().store(storeAddHealthData(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'ChangeHealthData'
    ) {
      body = beginCell().store(storeChangeHealthData(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetInactiveRecord'
    ) {
      body = beginCell().store(storeSetInactiveRecord(message)).endCell();
    }
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'Deploy'
    ) {
      body = beginCell().store(storeDeploy(message)).endCell();
    }
    if (body === null) {
      throw new Error('Invalid message type');
    }

    await provider.internal(via, { ...args, body });
  }

  async getPublicKey(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('publicKey', builder.build())).stack;
    const result = source.readString();
    return result;
  }

  async getNumHealthDataRecords(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('numHealthDataRecords', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getNumAccesses(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('numAccesses', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getHealthDataAddress(provider: ContractProvider, seqno: bigint, accessedAddress: Address) {
    const builder = new TupleBuilder();
    builder.writeNumber(seqno);
    builder.writeAddress(accessedAddress);
    const source = (await provider.get('healthDataAddress', builder.build())).stack;
    const result = source.readAddress();
    return result;
  }

  async getBalance(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('balance', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getOwner(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('owner', builder.build())).stack;
    const result = source.readAddress();
    return result;
  }
}
