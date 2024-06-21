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
  Dictionary,
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

export type UpdateMonthPeriodDataResponse = {
  $$type: 'UpdateMonthPeriodDataResponse';
  seqno: bigint;
};

export function storeUpdateMonthPeriodDataResponse(src: UpdateMonthPeriodDataResponse) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1763108018, 32);
    b_0.storeUint(src.seqno, 256);
  };
}

export function loadUpdateMonthPeriodDataResponse(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1763108018) {
    throw Error('Invalid prefix');
  }
  const _seqno = sc_0.loadUintBig(256);
  return { $$type: 'UpdateMonthPeriodDataResponse' as const, seqno: _seqno };
}

function loadTupleUpdateMonthPeriodDataResponse(source: TupleReader) {
  const _seqno = source.readBigNumber();
  return { $$type: 'UpdateMonthPeriodDataResponse' as const, seqno: _seqno };
}

function storeTupleUpdateMonthPeriodDataResponse(source: UpdateMonthPeriodDataResponse) {
  const builder = new TupleBuilder();
  builder.writeNumber(source.seqno);
  return builder.build();
}

function dictValueParserUpdateMonthPeriodDataResponse(): DictionaryValue<UpdateMonthPeriodDataResponse> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUpdateMonthPeriodDataResponse(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateMonthPeriodDataResponse(src.loadRef().beginParse());
    },
  };
}

export type UpdateMonthPeriodData = {
  $$type: 'UpdateMonthPeriodData';
  accessedAddress: Address;
  monthIndex: bigint;
  toAdd: Dictionary<bigint, PeriodDataItem>;
  toDelete: Dictionary<bigint, PeriodDataItem>;
};

export function storeUpdateMonthPeriodData(src: UpdateMonthPeriodData) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(162194738, 32);
    b_0.storeAddress(src.accessedAddress);
    b_0.storeInt(src.monthIndex, 257);
    b_0.storeDict(src.toAdd, Dictionary.Keys.BigInt(257), dictValueParserPeriodDataItem());
    b_0.storeDict(src.toDelete, Dictionary.Keys.BigInt(257), dictValueParserPeriodDataItem());
  };
}

export function loadUpdateMonthPeriodData(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 162194738) {
    throw Error('Invalid prefix');
  }
  const _accessedAddress = sc_0.loadAddress();
  const _monthIndex = sc_0.loadIntBig(257);
  const _toAdd = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    sc_0
  );
  const _toDelete = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    sc_0
  );
  return {
    $$type: 'UpdateMonthPeriodData' as const,
    accessedAddress: _accessedAddress,
    monthIndex: _monthIndex,
    toAdd: _toAdd,
    toDelete: _toDelete,
  };
}

function loadTupleUpdateMonthPeriodData(source: TupleReader) {
  const _accessedAddress = source.readAddress();
  const _monthIndex = source.readBigNumber();
  const _toAdd = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    source.readCellOpt()
  );
  const _toDelete = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    source.readCellOpt()
  );
  return {
    $$type: 'UpdateMonthPeriodData' as const,
    accessedAddress: _accessedAddress,
    monthIndex: _monthIndex,
    toAdd: _toAdd,
    toDelete: _toDelete,
  };
}

function storeTupleUpdateMonthPeriodData(source: UpdateMonthPeriodData) {
  const builder = new TupleBuilder();
  builder.writeAddress(source.accessedAddress);
  builder.writeNumber(source.monthIndex);
  builder.writeCell(
    source.toAdd.size > 0
      ? beginCell()
          .storeDictDirect(
            source.toAdd,
            Dictionary.Keys.BigInt(257),
            dictValueParserPeriodDataItem()
          )
          .endCell()
      : null
  );
  builder.writeCell(
    source.toDelete.size > 0
      ? beginCell()
          .storeDictDirect(
            source.toDelete,
            Dictionary.Keys.BigInt(257),
            dictValueParserPeriodDataItem()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserUpdateMonthPeriodData(): DictionaryValue<UpdateMonthPeriodData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeUpdateMonthPeriodData(src)).endCell());
    },
    parse: (src) => {
      return loadUpdateMonthPeriodData(src.loadRef().beginParse());
    },
  };
}

export type InternalUpdateMonthPeriodData = {
  $$type: 'InternalUpdateMonthPeriodData';
  toAdd: Dictionary<bigint, PeriodDataItem>;
  toDelete: Dictionary<bigint, PeriodDataItem>;
};

export function storeInternalUpdateMonthPeriodData(src: InternalUpdateMonthPeriodData) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeUint(1624185093, 32);
    b_0.storeDict(src.toAdd, Dictionary.Keys.BigInt(257), dictValueParserPeriodDataItem());
    b_0.storeDict(src.toDelete, Dictionary.Keys.BigInt(257), dictValueParserPeriodDataItem());
  };
}

export function loadInternalUpdateMonthPeriodData(slice: Slice) {
  const sc_0 = slice;
  if (sc_0.loadUint(32) !== 1624185093) {
    throw Error('Invalid prefix');
  }
  const _toAdd = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    sc_0
  );
  const _toDelete = Dictionary.load(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    sc_0
  );
  return { $$type: 'InternalUpdateMonthPeriodData' as const, toAdd: _toAdd, toDelete: _toDelete };
}

function loadTupleInternalUpdateMonthPeriodData(source: TupleReader) {
  const _toAdd = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    source.readCellOpt()
  );
  const _toDelete = Dictionary.loadDirect(
    Dictionary.Keys.BigInt(257),
    dictValueParserPeriodDataItem(),
    source.readCellOpt()
  );
  return { $$type: 'InternalUpdateMonthPeriodData' as const, toAdd: _toAdd, toDelete: _toDelete };
}

function storeTupleInternalUpdateMonthPeriodData(source: InternalUpdateMonthPeriodData) {
  const builder = new TupleBuilder();
  builder.writeCell(
    source.toAdd.size > 0
      ? beginCell()
          .storeDictDirect(
            source.toAdd,
            Dictionary.Keys.BigInt(257),
            dictValueParserPeriodDataItem()
          )
          .endCell()
      : null
  );
  builder.writeCell(
    source.toDelete.size > 0
      ? beginCell()
          .storeDictDirect(
            source.toDelete,
            Dictionary.Keys.BigInt(257),
            dictValueParserPeriodDataItem()
          )
          .endCell()
      : null
  );
  return builder.build();
}

function dictValueParserInternalUpdateMonthPeriodData(): DictionaryValue<InternalUpdateMonthPeriodData> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storeInternalUpdateMonthPeriodData(src)).endCell());
    },
    parse: (src) => {
      return loadInternalUpdateMonthPeriodData(src.loadRef().beginParse());
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

export type PeriodDataItem = {
  $$type: 'PeriodDataItem';
  date: string;
};

export function storePeriodDataItem(src: PeriodDataItem) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeStringRefTail(src.date);
  };
}

export function loadPeriodDataItem(slice: Slice) {
  const sc_0 = slice;
  const _date = sc_0.loadStringRefTail();
  return { $$type: 'PeriodDataItem' as const, date: _date };
}

function loadTuplePeriodDataItem(source: TupleReader) {
  const _date = source.readString();
  return { $$type: 'PeriodDataItem' as const, date: _date };
}

function storeTuplePeriodDataItem(source: PeriodDataItem) {
  const builder = new TupleBuilder();
  builder.writeString(source.date);
  return builder.build();
}

function dictValueParserPeriodDataItem(): DictionaryValue<PeriodDataItem> {
  return {
    serialize: (src, buidler) => {
      buidler.storeRef(beginCell().store(storePeriodDataItem(src)).endCell());
    },
    parse: (src) => {
      return loadPeriodDataItem(src.loadRef().beginParse());
    },
  };
}

type MonthPeriodData_init_args = {
  $$type: 'MonthPeriodData_init_args';
  parent: Address;
  seqno: bigint;
  accessedAddress: Address;
};

function initMonthPeriodData_init_args(src: MonthPeriodData_init_args) {
  return (builder: Builder) => {
    const b_0 = builder;
    b_0.storeAddress(src.parent);
    b_0.storeInt(src.seqno, 257);
    b_0.storeAddress(src.accessedAddress);
  };
}

async function MonthPeriodData_init(parent: Address, seqno: bigint, accessedAddress: Address) {
  const __code = Cell.fromBase64(
    'te6ccgECIQEABI4AART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCHQQFAgFYDg8BOgGSMH/gcCHXScIflTAg1wsf3oIQYM8ZBbrjAjBwBgCqyPhDAcx/AcoAVUBQVCDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhLL/wEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYS9ADLB8ntVAT+0x8BghBgzxkFuvLggfQE9ARZbBKCANSE+EJSgMcF8vRxjh4hgQEBIln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrOOtSGBAQEiWfQNb6GSMG3fIG6SMG2X0NQB0DFvAeIgbvLQgG8hEFgQRxA2SHDbPAakEEcQNkVA6FtxioroWwcICQoCyts8IMD/kTDglSGlUhC7jk+BAQEhpCRZWfQNb6GSMG3fIG6SMG2X0NQB0DFvAeKBAQEBIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4iIQNQEgbpUwWfRaMJRBM/QV4gKk6DCBAQFtDQsAPCGBAQEiWfQNb6GSMG3fIG6SMG2X0NQB0DFvAeJuswFmIYEBASJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4iBu8tCAbyEQV14zRnDbPAakEEYQNUQwDAACfwBaIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4iIQNAEgbpUwWfRaMJRBM/QV4gGlAYJRVRUUQzDbPMP/kmwV4IIAvY0hwR/y9CDBH44gpIEBAQbIAcgBzxbJAczJVCZgIG6VMFn0WjCUQTP0FeKRNeJVAw0AkO2i7ftxk1MCu446I4EBASJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4iBus44VIG7y0IBvIVIgAfkBAfkBupMx2zHgkTDipOhbfwIBIBARAgEgFhcCASASEwC5t3owTgudh6ullc9j0J2HOslQo2zQThO6xqWlbI+WZFp15b++LEcwTgQKuANwDOxymcsHVcjktlhwTgN6k73yqLLeOOp6e8CrOGTQThOy6ctWadluZ0HSzbKM3RSQAhGx2LbPNs8bFGAdFAIRsbA2zzbPGxRgHRUAAiEACPgnbxACASAYGQIRtPxbZ5tnjYowHR4AEbCvu1E0NIAAYAIBIBobAhGvA22ebZ42KMAdHAB1rN3Ghq0uDM5nReXqLasLRusOhqzNTcsoioym6azGqazKiMsObshpiKcN5u6OzQ8KCmqNLOoKZyrKcEAAAiABxO1E0NQB+GPSAAGOSvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB0//6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAfQE0wdVQGwV4Pgo1wsKgwm68uCJHwACIgGW+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAGBAQHXAPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhDMAPRWNs8IAAEbXA='
  );
  const __system = Cell.fromBase64(
    'te6cckECIwEABJgAAQHAAQEFoK5PAgEU/wD0pBP0vPLICwMCAWIEDwN60AHQ0wMBcbCjAfpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhUUFMDbwT4YQL4Yts8VRTbPPLggh8FDgE6AZIwf+BwIddJwh+VMCDXCx/eghBgzxkFuuMCMHAGBP7THwGCEGDPGQW68uCB9AT0BFlsEoIA1IT4QlKAxwXy9HGOHiGBAQEiWfQNb6GSMG3fIG6SMG2X0NQB0DFvAeJus461IYEBASJZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4iBu8tCAbyEQWBBHEDZIcNs8BqQQRxA2RUDoW3GKiuhbBwkKDQLK2zwgwP+RMOCVIaVSELuOT4EBASGkJFlZ9A1voZIwbd8gbpIwbZfQ1AHQMW8B4oEBAQEgbpIwbY4RIG7y0IBvIcgByAHPFskBzMniIhA1ASBulTBZ9FowlEEz9BXiAqToMIEBAW0MCABaIG6SMG2OESBu8tCAbyHIAcgBzxbJAczJ4iIQNAEgbpUwWfRaMJRBM/QV4gGlADwhgQEBIln0DW+hkjBt3yBukjBtl9DUAdAxbwHibrMBZiGBAQEiWfQNb6GSMG3fIG6SMG2X0NQB0DFvAeIgbvLQgG8hEFdeM0Zw2zwGpBBGEDVEMAsBglFVFRRDMNs8w/+SbBXgggC9jSHBH/L0IMEfjiCkgQEBBsgByAHPFskBzMlUJmAgbpUwWfRaMJRBM/QV4pE14lUDDACQ7aLt+3GTUwK7jjojgQEBIln0DW+hkjBt3yBukjBtl9DUAdAxbwHiIG6zjhUgbvLQgG8hUiAB+QEB+QG6kzHbMeCRMOKk6Ft/AAJ/AKrI+EMBzH8BygBVQFBUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEsv/ASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFhL0AMsHye1UAgFYEBcCASARFgIBIBIUAhGx2LbPNs8bFGAfEwACIQIRsbA2zzbPGxRgHxUACPgnbxAAubd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4DepO98qiy3jjqenvAqzhk0E4TsunLVmnZbmdB0s2yjN0UkAIBIBgeAgEgGRoAEbCvu1E0NIAAYAIBIBsdAhGvA22ebZ42KMAfHAACIAB1rN3Ghq0uDM5nReXqLasLRusOhqzNTcsoioym6azGqazKiMsObshpiKcN5u6OzQ8KCmqNLOoKZyrKcEACEbT8W2ebZ42KMB8iAcTtRNDUAfhj0gABjkr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdP/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAH0BNMHVUBsFeD4KNcLCoMJuvLgiSABlvpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgBgQEB1wD6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIQzAD0VjbPCEABG1wAAIilhnbFg=='
  );
  const builder = beginCell();
  builder.storeRef(__system);
  builder.storeUint(0, 1);
  initMonthPeriodData_init_args({
    $$type: 'MonthPeriodData_init_args',
    parent,
    seqno,
    accessedAddress,
  })(builder);
  const __data = builder.endCell();
  return { code: __code, data: __data };
}

const MonthPeriodData_errors: { [key: number]: { message: string } } = {
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
  48525: { message: `Data array is full` },
  54404: { message: `Parent only` },
};

const MonthPeriodData_types: ABIType[] = [
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
    name: 'UpdateMonthPeriodDataResponse',
    header: 1763108018,
    fields: [
      { name: 'seqno', type: { kind: 'simple', type: 'uint', optional: false, format: 256 } },
    ],
  },
  {
    name: 'UpdateMonthPeriodData',
    header: 162194738,
    fields: [
      { name: 'accessedAddress', type: { kind: 'simple', type: 'address', optional: false } },
      { name: 'monthIndex', type: { kind: 'simple', type: 'int', optional: false, format: 257 } },
      {
        name: 'toAdd',
        type: { kind: 'dict', key: 'int', value: 'PeriodDataItem', valueFormat: 'ref' },
      },
      {
        name: 'toDelete',
        type: { kind: 'dict', key: 'int', value: 'PeriodDataItem', valueFormat: 'ref' },
      },
    ],
  },
  {
    name: 'InternalUpdateMonthPeriodData',
    header: 1624185093,
    fields: [
      {
        name: 'toAdd',
        type: { kind: 'dict', key: 'int', value: 'PeriodDataItem', valueFormat: 'ref' },
      },
      {
        name: 'toDelete',
        type: { kind: 'dict', key: 'int', value: 'PeriodDataItem', valueFormat: 'ref' },
      },
    ],
  },
  {
    name: 'SetPublicKey',
    header: 1524430048,
    fields: [{ name: 'publicKey', type: { kind: 'simple', type: 'string', optional: false } }],
  },
  {
    name: 'PeriodDataItem',
    header: null,
    fields: [{ name: 'date', type: { kind: 'simple', type: 'string', optional: false } }],
  },
];

const MonthPeriodData_getters: ABIGetter[] = [
  {
    name: 'accessedAddress',
    arguments: [],
    returnType: { kind: 'simple', type: 'address', optional: false },
  },
  {
    name: 'dataLength',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'data',
    arguments: [],
    returnType: { kind: 'dict', key: 'int', value: 'PeriodDataItem', valueFormat: 'ref' },
  },
  {
    name: 'balance',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
];

const MonthPeriodData_receivers: ABIReceiver[] = [
  { receiver: 'internal', message: { kind: 'typed', type: 'InternalUpdateMonthPeriodData' } },
];

export class MonthPeriodData implements Contract {
  static async init(parent: Address, seqno: bigint, accessedAddress: Address) {
    return await MonthPeriodData_init(parent, seqno, accessedAddress);
  }

  static async fromInit(parent: Address, seqno: bigint, accessedAddress: Address) {
    const init = await MonthPeriodData_init(parent, seqno, accessedAddress);
    const address = contractAddress(0, init);
    return new MonthPeriodData(address, init);
  }

  static fromAddress(address: Address) {
    return new MonthPeriodData(address);
  }

  readonly address: Address;
  readonly init?: { code: Cell; data: Cell };
  readonly abi: ContractABI = {
    types: MonthPeriodData_types,
    getters: MonthPeriodData_getters,
    receivers: MonthPeriodData_receivers,
    errors: MonthPeriodData_errors,
  };

  private constructor(address: Address, init?: { code: Cell; data: Cell }) {
    this.address = address;
    this.init = init;
  }

  async send(
    provider: ContractProvider,
    via: Sender,
    args: { value: bigint; bounce?: boolean | null | undefined },
    message: InternalUpdateMonthPeriodData
  ) {
    let body: Cell | null = null;
    if (
      message &&
      typeof message === 'object' &&
      !(message instanceof Slice) &&
      message.$$type === 'InternalUpdateMonthPeriodData'
    ) {
      body = beginCell().store(storeInternalUpdateMonthPeriodData(message)).endCell();
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

  async getDataLength(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('dataLength', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getData(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('data', builder.build())).stack;
    const result = Dictionary.loadDirect(
      Dictionary.Keys.BigInt(257),
      dictValueParserPeriodDataItem(),
      source.readCellOpt()
    );
    return result;
  }

  async getBalance(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('balance', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }
}
