import { Action, ActionTypes } from '../actions';
import { KeyFileInterface } from '../actions/keyFileActions';

export const keyFilesReducer = (
  state: KeyFileInterface[] = [],
  action: Action
) => {
  if (action.type === ActionTypes.updateKeyFiles) {
    return action.payload;
  }
  if (action.type === ActionTypes.updateTransactionStatus) {
    const clonedState = [...state];
    const indexOfKeyFileToUpdate = state.findIndex(
      ({ pubkey }) => pubkey === action.payload.pubkey
    );
    clonedState[indexOfKeyFileToUpdate].transactionStatus =
      action.payload.status;

    if (action.payload.txHash) {
      clonedState[indexOfKeyFileToUpdate].txHash = action.payload.txHash;
    }

    return clonedState;
  }
  return state;
};
