import { Action, ActionTypes, keyFile } from "../actions";

export const keyFilesReducer = (state: keyFile[] = [], action: Action) => {
  if (action.type === ActionTypes.updateKeyFiles) {
    return action.payload;
  }
  return state;
};
