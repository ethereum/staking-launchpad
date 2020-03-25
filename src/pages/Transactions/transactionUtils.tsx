import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3 from 'web3';
import { Eth } from 'web3-eth';
import { SendOptions } from 'web3-eth-contract';
import { KeyFileInterface, TransactionStatuses } from '../../store/actions';
import { prefix0X } from '../../utils/prefix0x';
import { contractAbi } from '../../contractAbi';
import { contractAddress, pricePerValidator } from '../../enums';

const CONTRACT_ADDRESS = contractAddress;
const TX_VALUE = pricePerValidator * 1e18; // 3.2 eth for testnet, change to 32 on mainnet

const isUserRejectionError = (error: any) => {
  if (error.code === 4001) return true; // metamask
  if (
    error.message ===
    'MetaMask Tx Signature: User denied transaction signature.'
  )
    return true; // metamask
  if (error.message === 'User denied transaction signature.') return true; // portis
  if (
    error.message ===
    'Fortmatic RPC Error: [-32603] Fortmatic: User denied transaction.'
  )
    return true;

  return false;
};

export const handleTransaction = async (
  depositFile: KeyFileInterface,
  connector: AbstractConnector,
  account: any,
  setStatus: (status: TransactionStatuses) => void
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
    setStatus(TransactionStatuses.PENDING);
    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: Eth = new Web3(walletProvider).eth;
    const contract = new web3.Contract(contractAbi, CONTRACT_ADDRESS);
    const transactionParameters: SendOptions = {
      gasPrice: '0x0055e72a000',
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
      .on('transactionHash', (hash: any): void => {
        console.log('on tx hash', hash);
        setStatus(TransactionStatuses.STARTED);
      })
      .on('receipt', (receipt: any) => {
        console.log('on receipt', receipt);
      })
      .on(
        'confirmation',
        (confirmation: number, receipt: { status: {} }): any => {
          console.log('on confirmation');
          if (confirmation === 0) {
            if (receipt.status) {
              setStatus(TransactionStatuses.SUCCEEDED);
            } else {
              setStatus(TransactionStatuses.FAILED);
            }
          }
        }
      )
      .on('error', (error: any) => {
        console.log('on error', error.message);
        if (isUserRejectionError(error)) {
          setStatus(TransactionStatuses.REJECTED);
        } else {
          setStatus(TransactionStatuses.FAILED);
        }
      });
  } catch (rejected) {
    console.log('tx failed');
    setStatus(TransactionStatuses.FAILED);
  }
};
