import { combineReducers } from "redux";
import { Action, ActionTypes, keyFile } from "../actions";

export interface StoreState {
  allAcknowledgementsAgreedTo: boolean;
  validatorCount: number;
  keyFiles: keyFile[];
}

export const acknowledgementReducer = (
  state: boolean = false,
  action: Action
) => {
  if (action.type === ActionTypes.updateAcknowledgementState) {
    return action.payload;
  }
  return state;
};

export const validatorReducer = (state: number = 0, action: Action) => {
  if (action.type === ActionTypes.updateValidatorCount) {
    return action.payload;
  }
  return state;
};

export const keyFilesReducer = (state: keyFile[] = [], action: Action) => {
  if (action.type === ActionTypes.updateKeyFiles) {
    return action.payload;
  }
  return state;
};

export const reducers = combineReducers<StoreState>({
  allAcknowledgementsAgreedTo: acknowledgementReducer,
  validatorCount: validatorReducer,
  keyFiles: keyFilesReducer
});
