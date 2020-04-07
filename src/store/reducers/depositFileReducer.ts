/*
  eslint-disable camelcase
*/

import { Action, ActionTypes } from '../actions';
import { TransactionStatus } from '../actions/depositFileActions';

export interface DepositKeyInterface {
  pubkey: string;
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  deposit_data_root: string;
  signed_deposit_data_root: string;
  transactionStatus: TransactionStatus;
  txHash?: string;
}

export interface DepositFileInterface {
  name: string;
  keys: DepositKeyInterface[];
}

const initialState: DepositFileInterface = {
  name: '',
  keys: [],
};

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
  return state;
};
