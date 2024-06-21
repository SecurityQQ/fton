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
  48525: { message: `Data array is full` },
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

const Account_getters: ABIGetter[] = [
  {
    name: 'publicKey',
    arguments: [],
    returnType: { kind: 'simple', type: 'string', optional: false },
  },
  {
    name: 'numFilledMonths',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'numAccesses',
    arguments: [],
    returnType: { kind: 'simple', type: 'int', optional: false, format: 257 },
  },
  {
    name: 'monthPeriodDataAddress',
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
  { receiver: 'internal', message: { kind: 'typed', type: 'UpdateMonthPeriodData' } },
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
    message: SetPublicKey | UpdateMonthPeriodData | Deploy
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
      message.$$type === 'UpdateMonthPeriodData'
    ) {
      body = beginCell().store(storeUpdateMonthPeriodData(message)).endCell();
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

  async getNumFilledMonths(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('numFilledMonths', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getNumAccesses(provider: ContractProvider) {
    const builder = new TupleBuilder();
    const source = (await provider.get('numAccesses', builder.build())).stack;
    const result = source.readBigNumber();
    return result;
  }

  async getMonthPeriodDataAddress(
    provider: ContractProvider,
    seqno: bigint,
    accessedAddress: Address
  ) {
    const builder = new TupleBuilder();
    builder.writeNumber(seqno);
    builder.writeAddress(accessedAddress);
    const source = (await provider.get('monthPeriodDataAddress', builder.build())).stack;
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
