import { combineReducers } from 'redux';
import { KeyFileInterface, ProgressStep } from '../actions';
import {
  acknowledgementReducer,
  acknowledgementState,
} from './acknowledgementReducer';
import { progressReducer } from './progressReducer';
import { keyFilesReducer } from './keyFilesReducer';

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
