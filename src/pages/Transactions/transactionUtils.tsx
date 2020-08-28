import { AbstractConnector } from '@web3-react/abstract-connector';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Eth } from 'web3-eth';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SendOptions } from 'web3-eth-contract';
import { prefix0X } from '../../utils/prefix0x';
import { contractAbi } from '../../contractAbi';
import { TransactionStatus } from '../../store/actions/depositFileActions';
import { CONTRACT_ADDRESS, PRICE_PER_VALIDATOR } from '../../utils/envVars';
import { DepositKeyInterface } from '../../store/reducers';

const pricePerValidator = new BigNumber(PRICE_PER_VALIDATOR);
const TX_VALUE = pricePerValidator.multipliedBy(1e18).toNumber();

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
  depositFile: DepositKeyInterface,
  connector: AbstractConnector,
  account: any,
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatus,
    txHash?: string
  ) => void
): Promise<void> => {
  const {
    pubkey,
    signature,
    // eslint-disable-next-line camelcase
    withdrawal_credentials,
    // eslint-disable-next-line camelcase
    deposit_data_root,
  } = depositFile;

  try {
    updateTransactionStatus(pubkey, TransactionStatus.PENDING);
    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: Eth = new Web3(walletProvider).eth;
    const contract = new web3.Contract(contractAbi, CONTRACT_ADDRESS);
    const transactionParameters: SendOptions = {
      gasPrice: '0x0055e72a000', // TODO estimate gas value
      from: account as string,
      value: TX_VALUE,
    };

    contract.methods
      .deposit(
        prefix0X(pubkey),
        prefix0X(withdrawal_credentials),
        prefix0X(signature),
        prefix0X(deposit_data_root)
      )
      .send(transactionParameters)
      .on('transactionHash', (txHash: string): void => {
        updateTransactionStatus(pubkey, TransactionStatus.STARTED, txHash);
      })
      .on('receipt', () => {
        // do something?
      })
      .on(
        'confirmation',
        (confirmation: number, receipt: { status: {} }): any => {
          if (confirmation === 0) {
            if (receipt.status) {
              updateTransactionStatus(pubkey, TransactionStatus.SUCCEEDED);
            } else {
              updateTransactionStatus(pubkey, TransactionStatus.FAILED);
            }
          }
        }
      )
      .on('error', (error: any) => {
        if (isUserRejectionError(error)) {
          updateTransactionStatus(pubkey, TransactionStatus.REJECTED);
        } else {
          updateTransactionStatus(pubkey, TransactionStatus.FAILED);
        }
      });
  } catch (rejected) {
    updateTransactionStatus(pubkey, TransactionStatus.FAILED);
  }
};

export const handleMultipleTransactions = async (
  depositFiles: DepositKeyInterface[],
  connector: AbstractConnector,
  account: any,
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatus,
    txHash?: string
  ) => void
) => {
  const walletProvider: any = await (connector as AbstractConnector).getProvider();
  const web3 = new Web3(walletProvider).eth;
  const contract = new web3.Contract(contractAbi, CONTRACT_ADDRESS);

  const transactionParameters: SendOptions = {
    gasPrice: '0x0055e72a000', // TODO estimate gas value
    from: account as string,
    value: TX_VALUE,
  };

  // @ts-ignore
  const batch = new contract.BatchRequest();

  depositFiles.forEach(
    // eslint-disable-next-line camelcase
    ({ pubkey, withdrawal_credentials, signature, deposit_data_root }) => {
      updateTransactionStatus(pubkey, TransactionStatus.PENDING);

      batch.add(
        contract.methods
          .deposit(
            prefix0X(pubkey),
            prefix0X(withdrawal_credentials),
            prefix0X(signature),
            prefix0X(deposit_data_root)
          )
          .send.request(transactionParameters, (error: any, txHash: any) => {
            // values are set to fixed for the example
            if (error) {
              if (isUserRejectionError(error)) {
                updateTransactionStatus(pubkey, TransactionStatus.REJECTED);
              } else {
                updateTransactionStatus(pubkey, TransactionStatus.FAILED);
              }
            } else {
              updateTransactionStatus(
                pubkey,
                TransactionStatus.STARTED,
                txHash
              );
            }
          })
      );
    }
  );

  batch.execute();
};
