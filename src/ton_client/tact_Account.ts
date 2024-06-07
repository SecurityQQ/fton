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
    'te6ccgECJwEABVoAART/APSkE/S88sgLAQIBYgIDA3rQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxVFNs88uCCIwQFAgEgDg8EtgGSMH/gcCHXScIflTAg1wsf3iCCEFrc9OC6jy0w0x8BghBa3PTguvLggdQB0DEzgRFN+EFvJBAjXwNSYMcF8vSI+EIBf23bPH/gIIIQEssZe7rjAoIQlGqYtroGCwcIAITI+EMBzH8BygBVQFBUINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WyFADzxbJWMzIWM8WyQHMEsv/y//J7VQALAAAAABQdWJsaWMga2V5IHVwZGF0ZWQBbjDTHwGCEBLLGXu68uCB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdASbBLbPH8JAViOp9MfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+AwcAsD5gOk+EP4KFQQIATbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAXIAYIQ2lwGX1jLH8hYzxbJAczJEDWCCHoSAFpyWX8GRVXbPCEmDAoBKsgBghBqhxjKWMsfy//J+EIBf23bPAsBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8DAHKyHEBygFQBwHKAHABygJQBSDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFlAD+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wANAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAgFqEBECASAUFQIRsUd2zzbPGxRgIxICEbB+Ns82zxsUYCMTAAIkAAIiAgEgFhcCASAcHQICdRgZAN23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOA3qTvfKost446np7wKs4ZNBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lACD6YBtnm2eNijIxoCD6WBtnm2eNijIxsAAiAACPgnbxACASAeHwIBICAhABGwr7tRNDSAAGAAdbJu40NWlwZnM6Ly9RbWQ1THNncmFtS3hyVFB4cWd3QVdSMnNIdjNSYmNQRDJ6VnlGZ1FNY1JuZTl5ggAhGxCjbPNs8bFGAjIgJNshjINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiNs8VRTbPGxRgIyQAAiEBnu1E0NQB+GPSAAGOMPpAASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgB1AHQAdQB0AHT/9P/VUBsFeD4KNcLCoMJuvLgidQB0AHR2zwlAZD4Q/goWts8cFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgmABCLCHAg+EJVMADoA9D0BDBtAYIA4MQBgBD0D2+h8uCHAYIA4MQiAoAQ9BfIAcj0AMkBzHABygBVIARaINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WEoEBAc8AASDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFsk='
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
  4429: { message: `Invalid sender` },
  54404: { message: `Parent only` },
  61782: { message: `Data already set` },
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
    message: SetPublicKey | AddHealthData | Deploy
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
