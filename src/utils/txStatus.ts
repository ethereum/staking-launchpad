import { TransactionStatus } from '../store/actions/depositFileActions';

export const errorStatuses = [
  TransactionStatus.REJECTED,
  TransactionStatus.LEDGER_ERROR,
  TransactionStatus.FAILED,
];

export const attemptableStatuses = [...errorStatuses, TransactionStatus.READY];
