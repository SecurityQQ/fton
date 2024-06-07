import { Address, Cell, beginCell } from '@ton/ton';

import { storeAddHealthData, storeDeploy, storeSetPublicKey } from './tact_Account';

export function getDeployPayload(): Cell {
  return beginCell()
    .store(
      storeDeploy({
        $$type: 'Deploy',
        queryId: BigInt(0),
      })
    )
    .endCell();
}

export function getSetPublicTokenPayload(publicKey: string): Cell {
  return beginCell()
    .store(
      storeSetPublicKey({
        $$type: 'SetPublicKey',
        publicKey,
      })
    )
    .endCell();
}

export function getAddHealthDataPayload(accessedAddress: Address, encryptedData: string): Cell {
  return beginCell()
    .store(
      storeAddHealthData({
        $$type: 'AddHealthData',
        accessedAddress,
        encryptedData,
      })
    )
    .endCell();
}
