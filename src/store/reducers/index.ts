import { combineReducers } from 'redux';
import {
  acknowledgementReducer,
  acknowledgementState,
} from './acknowledgementReducer';
import { progressReducer } from './progressReducer';
import { keyFilesReducer } from './keyFilesReducer';
import { KeyFileInterface } from '../actions/keyFileActions';
import { ProgressStep } from '../actions/progressActions';

export * from './acknowledgementReducer';
export * from './keyFilesReducer';
export * from './progressReducer';

export interface StoreState {
  acknowledgementState: acknowledgementState;
  keyFiles: KeyFileInterface[];
  progress: ProgressStep;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  keyFiles: keyFilesReducer,
  progress: progressReducer,
});
