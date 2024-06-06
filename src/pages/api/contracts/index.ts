import { Cell, StateInit, beginCell, storeStateInit, toNano } from '@ton/ton';
import { TonConnectUI } from '@tonconnect/ui-react';

import { Account } from 'src/contracts/build/Account/tact_Account';
import { getDeployPayload } from 'src/contracts/contract_data_source';

export async function deployContract(client: TonConnectUI) {
  const userAddress = client.wallet!.account.address!;
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

  const body = getDeployPayload();

  const transaction = {
    validUntil: Math.floor(Date.now() / 1000) + 60, // 60 sec
    messages: [
      {
        address: contract.address.toString(),
        amount: toNano('0.004').toString(),
        payload: body.toBoc().toString('base64'),
        stateInit: stateInitCell.toBoc().toString('base64'),
      },
    ],
  };
  client.sendTransaction(transaction);
}

// export async function sendPublicKey(client: TonConnectUI, accountOwnerAddress: string, publicKey: string) {
// const provider = client.provider(contract.address, { code: init.code, data: init.data });
// await contract.send(provider, sender, { value: toNano('0.004') }, { $$type: 'Deploy', queryId: 0n });
// console.log(await client.isContractDeployed(contract.address)); // false
// const openedContract = client.open(contract);
// await openedContract.send(
//     sender,
//     { value: toNano('0.01') },
//     {
//         $$type: 'Deploy',
//         queryId: 0n,
//     }
// );
// console.log('accountOwnerAddress', accountOwnerAddress);
// const address = Address.parse(accountOwnerAddress);
// console.log('address', address.toString());
// setPublicKey(sender, sender.address!, publicKey);
// }
