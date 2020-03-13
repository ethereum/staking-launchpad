import { combineReducers } from "redux";
import { Action, ActionTypes, keyFile, ProgressStep } from "../actions";
import { acknowledgementReducer, acknowledgementState } from "./acknowledgementReducer";

export * from "./acknowledgementReducer";

export interface StoreState {
  acknowledgementState: acknowledgementState;
  validatorCount: number;
  keyFiles: keyFile[];
  progress: ProgressStep;
}

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

export const progressReducer = (
  state: ProgressStep = ProgressStep.OVERVIEW,
  action: Action
) => {
  if (action.type === ActionTypes.updateProgress) {
    return action.payload;
  }
  return state;
};

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  validatorCount: validatorReducer,
  keyFiles: keyFilesReducer,
  progress: progressReducer
});
