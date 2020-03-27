import { ActionTypes } from './index';

export enum TransactionStatuses {
  'READY',
  'PENDING',
  'STARTED',
  'SUCCEEDED',
  'FAILED',
  'REJECTED',
}

export interface KeyFileInterface {
  pubkey: string;
  // eslint-disable-next-line camelcase
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  // eslint-disable-next-line camelcase
  deposit_data_root: string;
  // eslint-disable-next-line camelcase
  signed_deposit_data_root: string;

  transactionStatus: TransactionStatuses;
  txHash?: string;
}
export interface UpdateKeyFilesAction {
  type: ActionTypes.updateKeyFiles;
  payload: KeyFileInterface[];
}
export interface UpdateTransactionStatusAction {
  type: ActionTypes.updateTransactionStatus;
  payload: {
    pubkey: string;
    status: TransactionStatuses;
    txHash?: string;
  };
}
export const updateKeyFiles = (
  files: KeyFileInterface[]
): UpdateKeyFilesAction => {
  return {
    type: ActionTypes.updateKeyFiles,
    payload: files,
  };
};

export const updateTransactionStatus = (
  pubkey: string,
  status: TransactionStatuses,
  txHash?: string
): UpdateTransactionStatusAction => {
  return {
    type: ActionTypes.updateTransactionStatus,
    payload: {
      pubkey,
      status,
      txHash,
    },
  };
};
