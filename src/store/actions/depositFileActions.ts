/*
  eslint-disable camelcase
*/
import { ActionTypes } from './index';
import { DepositKeyInterface } from '../reducers';

export enum TransactionStatus {
  'READY',
  'PENDING',
  'STARTED',
  'SUCCEEDED',
  'FAILED',
  'REJECTED',
}

export enum DepositStatus {
  VERIFYING,
  ALREADY_DEPOSITED,
  READY_FOR_DEPOSIT,
}

export enum BeaconChainStatus {
  HEALTHY,
  DOWN,
}

export interface UpdateDepositFileNameAction {
  type: ActionTypes.updateDepositFileName;
  payload: string;
}
export interface UpdateDepositFileKeysAction {
  type: ActionTypes.updateDepositFileKeys;
  payload: DepositKeyInterface[];
}
export interface UpdateTransactionStatusAction {
  type: ActionTypes.updateTransactionStatus;
  payload: {
    pubkey: string;
    status: TransactionStatus;
    txHash?: string;
  };
}
export interface UpdateDepositStatusAction {
  type: ActionTypes.updateDepositStatus;
  payload: {
    pubkey: string;
    depositStatus: DepositStatus;
  };
}
export interface UpdateBeaconChainAPIStatusAction {
  type: ActionTypes.updateBeaconChainAPIStatus;
  payload: BeaconChainStatus;
}

export type DispatchDepositKeysUpdateType = (
  files: DepositKeyInterface[]
) => void;
export type DispatchDepositFileNameUpdateType = (fileName: string) => void;

export const updateDepositFileKeys = (
  files: DepositKeyInterface[]
): UpdateDepositFileKeysAction => {
  return {
    type: ActionTypes.updateDepositFileKeys,
    payload: files,
  };
};

export const updateDepositFileName = (
  fileName: string
): UpdateDepositFileNameAction => {
  return {
    type: ActionTypes.updateDepositFileName,
    payload: fileName,
  };
};

export const updateBeaconChainAPIStatus = (
  status: BeaconChainStatus
): UpdateBeaconChainAPIStatusAction => {
  return {
    type: ActionTypes.updateBeaconChainAPIStatus,
    payload: status,
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

export type DispatchDepositFileNameUpdate = (name: string) => void;

export const updateDepositStatus = (
  pubkey: string,
  depositStatus: DepositStatus
): UpdateDepositStatusAction => {
  return {
    type: ActionTypes.updateDepositStatus,
    payload: {
      pubkey,
      depositStatus,
    },
  };
};

export type DispatchDepositStatusUpdateType = (
  pubkey: string,
  depositStatus: DepositStatus
) => void;

export type DispatchBeaconChainAPIStatusUpdateType = (
  status: BeaconChainStatus
) => void;
