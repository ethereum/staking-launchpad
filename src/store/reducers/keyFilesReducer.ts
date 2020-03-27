import { Action, ActionTypes, KeyFileInterface } from '../actions';

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

    return clonedState;
  }
  return state;
};
