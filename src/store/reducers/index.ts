import { combineReducers } from 'redux';
import { keyFile, ProgressStep } from '../actions';
import {
  acknowledgementReducer,
  acknowledgementState,
} from './acknowledgementReducer';
import { progressReducer } from './progressReducer';
import { keyFilesReducer } from './keyFilesReducer';
import { validatorReducer } from './validatorReducer';
import { generateKeysReducer } from './generateKeysReducer';

export * from './acknowledgementReducer';
export * from './keyFilesReducer';
export * from './progressReducer';
export * from './validatorReducer';
export * from './generateKeysReducer';

export interface StoreState {
  acknowledgementState: acknowledgementState;
  validatorCount: number;
  keyFiles: keyFile[];
  progress: ProgressStep;
  mnemonicAcknowledgementChecked: boolean;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  validatorCount: validatorReducer,
  keyFiles: keyFilesReducer,
  progress: progressReducer,
  mnemonicAcknowledgementChecked: generateKeysReducer,
});
