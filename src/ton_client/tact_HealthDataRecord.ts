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
    'te6ccgECGQEAA8AAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFds88uCCFQQFAgFYCQoBngGSMH/gcCHXScIflTAg1wsf3iCCEC51Ag66jicw0x8BghAudQIOuvLggdQB0AHUAdASbBIzM4IA1IT4QlJwxwXy9H/gghC90ChquuMCMHAGAMLI+EMBzH8BygBVUFBlINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WE8v/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshYzxbJAczIUAPPFslYzMoAye1UAZLTHwGCEL3QKGq68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiDExggDUhPhCUnDHBfL0cAFwgQCCf1UgbW1t2zx/BwHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAIAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgEgCwwCASAREgIRttgbZ5tnjYwwFQ0CASAODwAI+CdvEAIRs3B2zzbPGxjgFRAAubL0YJwXOw9XSyuex6E7DnWSoUbZoJwndY1LStkfLMi068t/fFiOYJwIFXAG4BnY5TOWDquRyWyw4JwG9Sd75VFlvHHU9PeBVnDJoJwnZdOWrNOy3M6DpZtlGbopIAAGVHIQAgEgExQCEbT8W2ebZ42MMBUWABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWJIWGtacDU0dE5rYjF5bWhrd05FZHhwcFNzWU5EV1NxZjJDOHA4TWZDd3JyggAdDtRNDUAfhj0gABjlD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdAB1AHQAdIAVVBsFuD4KNcLCoMJuvLgiRcAAiMBlvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzAD0VjbPBgACosIiwh/'
  );
  const __system = Cell.fromBase64(
    'te6cckECGwEAA8oAAQHAAQEFocGJAgEU/wD0pBP0vPLICwMCAWIECgN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRXbPPLgghcFCQGeAZIwf+BwIddJwh+VMCDXCx/eIIIQLnUCDrqOJzDTHwGCEC51Ag668uCB1AHQAdQB0BJsEjMzggDUhPhCUnDHBfL0f+CCEL3QKGq64wIwcAYBktMfAYIQvdAoarry4IH6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIMTGCANSE+EJScMcF8vRwAXCBAIJ/VSBtbW3bPH8HAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7AAgAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwAwsj4QwHMfwHKAFVQUGUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYTy/8BINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFjPFskBzMhQA88WyVjMygDJ7VQCAVgLEgIBIAwOAhG22Btnm2eNjDAXDQAI+CdvEAIBIA8RAhGzcHbPNs8bGOAXEAAGVHIQALmy9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcBvUne+VRZbxx1PT3gVZwyaCcJ2XTlqzTstzOg6WbZRm6KSACASATFgIBIBQVABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWJIWGtacDU0dE5rYjF5bWhrd05FZHhwcFNzWU5EV1NxZjJDOHA4TWZDd3JyggAhG0/Ftnm2eNjDAXGgHQ7UTQ1AH4Y9IAAY5Q+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHT//pAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAdQB0AHSAFVQbBbg+CjXCwqDCbry4IkYAZb6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAYEBAdcA+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiEMwA9FY2zwZAAqLCIsIfwACIzU/E3Q='
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
  49405: { message: `Record does not exist` },
  54404: { message: `Parent only` },
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

const HealthDataRecord_getters: ABIGetter[] = [
  {
    name: 'accessedAddress',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
  {
    name: 'healthDataState',
    arguments: [],
    returnType: { kind: 'simple', type: 'HealthDataState', optional: false },
  },
  {
    name: 'balance',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
];

const HealthDataRecord_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'AddInternalHealthData' } },
  { receiver: 'internal', message: { kind: 'typed', type: 'SetInactiveRecordInternal' } },
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
    message: AddInternalHealthData | SetInactiveRecordInternal
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
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'SetInactiveRecordInternal'
    ) {
      body = beginCell().store(storeSetInactiveRecordInternal(message)).endCell();
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

  async getHealthDataState(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('healthDataState', builder.build())).stack;
    const result = loadTupleHealthDataState(source);
    return result;
  }

  async getBalance(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('balance', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }
}
