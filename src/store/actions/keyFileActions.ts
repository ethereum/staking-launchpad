/*
  eslint-disable camelcase
*/
import { ActionTypes } from './index';

export enum TransactionStatus {
  'READY',
  'PENDING',
  'STARTED',
  'SUCCEEDED',
  'FAILED',
  'REJECTED',
}

export interface KeyFileInterface {
  pubkey: string;
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  deposit_data_root: string;
  signed_deposit_data_root: string;

  transactionStatus: TransactionStatus;
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
    status: TransactionStatus;
    txHash?: string;
  };
}

export type DispatchKeyFilesUpdateType = (files: KeyFileInterface[]) => void;

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
  status: TransactionStatus,
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

export type DispatchTransactionStatusUpdateType = (
  pubkey: string,
  status: TransactionStatus,
  txHash?: string
) => void;
