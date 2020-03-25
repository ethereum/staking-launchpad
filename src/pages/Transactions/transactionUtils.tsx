import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3 from 'web3';
import { Eth } from 'web3-eth';
import { SendOptions } from 'web3-eth-contract';
import { keyFile, ProgressStep, updateProgress } from '../../store/actions';
import { prefix0X } from '../../utils/prefix0x';
import { contractAbi } from '../../contractAbi';
import { contractAddress, pricePerValidator } from '../../enums';

const CONTRACT_ADDRESS = contractAddress;
const TX_VALUE = pricePerValidator * 1e18; // 3.2 eth for testnet, change to 32 on mainnet

export const handleTransaction = async (
  depositFile: keyFile,
  connector: AbstractConnector,
  account: any
): Promise<void> => {
  const {
    pubkey,
    signature,
    // eslint-disable-next-line camelcase
    withdrawal_credentials,
    // eslint-disable-next-line camelcase
    signed_deposit_data_root,
  } = depositFile;

  try {
    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: Eth = new Web3(walletProvider).eth;
    const contract = new web3.Contract(contractAbi, CONTRACT_ADDRESS);
    const transactionParameters: SendOptions = {
      gasPrice: '0x0055e72a000', // TODO: estimate gas price
      from: account as string,
      value: TX_VALUE,
    };

    contract.methods
      .deposit(
        prefix0X(pubkey),
        prefix0X(withdrawal_credentials),
        prefix0X(signature),
        prefix0X(signed_deposit_data_root)
      )
      .send(transactionParameters)
      .on('transactionHash', (): void => {
        // setTxMining(true);
        // TODO
      })
      .on(
        'confirmation',
        (confirmation: number, receipt: { status: {} }): any => {
          if (confirmation === 0) {
            if (receipt.status) {
              updateProgress(ProgressStep.CONGRATULATIONS);
            } else {
              // TODO
            }
          }
        }
      );
  } catch (rejected) {
    // TODO
  }
};
