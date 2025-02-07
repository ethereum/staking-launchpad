import { TransactionStatus } from '../store/actions/depositFileActions';
import {
  stepStatus,
  TransactionStatus as SignTxStatus,
} from '../components/TransactionStatusModal/types';

export const errorStatuses = [
  TransactionStatus.REJECTED,
  TransactionStatus.LEDGER_ERROR,
  TransactionStatus.FAILED,
];

export const attemptableStatuses = [...errorStatuses, TransactionStatus.READY];

export const getSignTxStatus = (
  transactionStatus: SignTxStatus
): stepStatus => {
  if (
    transactionStatus === 'waiting_user_confirmation' ||
    transactionStatus === 'not_started'
  ) {
    return 'loading';
  }
  if (transactionStatus === 'user_rejected' || transactionStatus === 'error') {
    return 'error';
  }
  return 'complete';
};

export const getTxOnchainStatus = (
  transactionStatus: SignTxStatus
): stepStatus => {
  if (
    transactionStatus === 'waiting_user_confirmation' ||
    transactionStatus === 'not_started' ||
    transactionStatus === 'user_rejected'
  ) {
    return 'staged';
  }
  if (transactionStatus === 'confirm_on_chain') {
    return 'loading';
  }
  if (transactionStatus === 'error') {
    return 'error';
  }
  return 'complete';
};
