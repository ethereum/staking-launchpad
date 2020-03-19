import { Action, ActionTypes } from "../actions";

export const generateKeysReducer = (state: boolean = false, action: Action) => {
  if (action.type === ActionTypes.updateMnemonicAcknowledgment) {
    return action.payload;
  }
  return state;
};
