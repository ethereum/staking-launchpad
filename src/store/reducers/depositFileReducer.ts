/*
  eslint-disable camelcase
*/

import { Action, ActionTypes } from '../actions';
import {
  BeaconChainStatus,
  DepositStatus,
  TransactionStatus,
} from '../actions/depositFileActions';

export interface DepositKeyInterface {
  pubkey: string;
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  deposit_message_root: string;
  deposit_data_root: string;
  fork_version: string;
  deposit_cli_version: string;
  transactionStatus: TransactionStatus;
  txHash?: string;
  depositStatus: DepositStatus;
}

export interface DepositFileInterface {
  name: string;
  beaconChainApiStatus: BeaconChainStatus;
  keys: DepositKeyInterface[];
}

const initialState: DepositFileInterface = {
  name: '',
  beaconChainApiStatus: BeaconChainStatus.HEALTHY,
  keys: [],
};

interface BeaconchainDepositDataInterface {
  amount: number;
  block_number: number;
  block_ts: number;
  from_address: string;
  merkletree_index: string;
  publickey: string;
  removed: boolean;
  signature: string;
  tx_hash: string;
  tx_index: number;
  tx_input: string;
  valid_signature: boolean;
  withdrawal_credentials: string;
}

export interface BeaconchainDepositInterface {
  data: BeaconchainDepositDataInterface[];
  status: string;
}

export const depositFileReducer = (
  state: DepositFileInterface = initialState,
  action: Action
) => {
  if (action.type === ActionTypes.updateDepositFileName) {
    return {
      ...state,
      name: action.payload,
    };
  }

  if (action.type === ActionTypes.updateDepositFileKeys) {
    return {
      ...state,
      keys: action.payload,
    };
  }

  if (action.type === ActionTypes.updateTransactionStatus) {
    const { keys } = state;
    const clonedKeys = [...keys];
    const indexOfFileToUpdate = keys.findIndex(
      ({ pubkey }) => pubkey === action.payload.pubkey
    );
    clonedKeys[indexOfFileToUpdate].transactionStatus = action.payload.status;

    if (action.payload.txHash) {
      clonedKeys[indexOfFileToUpdate].txHash = action.payload.txHash;
    }

    return { ...state, keys: clonedKeys };
  }

  if (action.type === ActionTypes.updateDepositStatus) {
    const { keys } = state;
    const clonedKeys = [...keys];
    const indexOfFileToUpdate = keys.findIndex(
      ({ pubkey }) => pubkey === action.payload.pubkey
    );
    clonedKeys[indexOfFileToUpdate].depositStatus =
      action.payload.depositStatus;

    return { ...state, keys: clonedKeys };
  }

  if (action.type === ActionTypes.updateBeaconChainAPIStatus) {
    return {
      ...state,
      beaconChainApiStatus: action.payload,
    };
  }
  return state;
};
