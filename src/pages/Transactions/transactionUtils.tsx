import { AbstractConnector } from '@web3-react/abstract-connector';
import BigNumber from 'bignumber.js';
import Web3 from 'web3';
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
  if (error.code === 4001) return true; // Metamask reject
  if (error.code === -32603) {
    // 0. Metamask deny signature
    if (
      error.message.includes(
        'MetaMask Tx Signature: User denied transaction signature.'
      )
    )
      return true;
    // 1. Ledger time-out or no-connect via Metamask
    if (error.message.includes('​Ledger device: U2F OTHER_ERROR')) return false; // false because the TX can be submitted after the Metamask timeout period
    // 2. Ledger reject via Metamask
    if (
      error.message.includes(
        'Ledger device: Condition of use not satisfied (denied by the user?)'
      )
    )
      return true;
    // 3. Trezor reject via Metamask
    if (error.message.includes('Action cancelled by user')) return true;
    // 4. Trezor popup closed via Metamask
    if (error.message.includes('Popup closed')) return true;
    // 5. Trezor popup denied via Metamask
    if (error.message.includes('Permissions not granted')) return true;
    // 6. Trezor disconnected via Metamask
    if (error.message.includes('device disconnected during action'))
      return true;
    // 7. Fortmatic reject
    if (error.message.includes('Fortmatic: User denied transaction.'))
      return true;
    // 8. Portis Reject
    if (error.message.includes('User denied transaction signature.'))
      return true;
  }
  return false;
};

/*
  Recursive func for calling each transaction in succession after
  the previous one has been signed
*/

export const handleMultipleTransactions = async (
  depositKeys: DepositKeyInterface[],
  connector: AbstractConnector,
  account: any,
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatus,
    txHash?: string
  ) => void
) => {
  const walletProvider: any = await (connector as AbstractConnector).getProvider();
  const web3: any = new Web3(walletProvider);
  const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);

  const transactionParameters: SendOptions = {
    // gasLimit: '0x124f8', TODO set gas limit
    gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
    from: account as string,
    value: TX_VALUE,
  };

  const remainingTxs = depositKeys.filter(
    key =>
      key.transactionStatus === TransactionStatus.READY ||
      key.transactionStatus === TransactionStatus.REJECTED
  );

  const nextTransaction = remainingTxs.shift();

  if (nextTransaction === undefined) {
    // stop calling yourself
    return;
  }

  const {
    pubkey,
    // eslint-disable-next-line
    withdrawal_credentials,
    signature,
    // eslint-disable-next-line
    deposit_data_root,
  } = nextTransaction;
  updateTransactionStatus(pubkey, TransactionStatus.PENDING);

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
      handleMultipleTransactions(
        depositKeys,
        connector,
        account,
        updateTransactionStatus
      );
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
};
