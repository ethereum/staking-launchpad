import { Action, ActionTypes, KeyFileInterface } from '../actions';

export const keyFilesReducer = (
  state: KeyFileInterface[] = [],
  action: Action
) => {
  if (action.type === ActionTypes.updateKeyFiles) {
    return action.payload;
  }
  if (action.type === ActionTypes.updateTransactionStatus) {
    console.log('aaan the reducer: ', action.payload);
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
