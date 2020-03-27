import { combineReducers } from 'redux';
import { KeyFileInterface, ProgressStep } from '../actions';
import {
  acknowledgementReducer,
  AcknowledgementStateInterface,
} from './acknowledgementReducer';
import { progressReducer } from './progressReducer';
import { keyFilesReducer } from './keyFilesReducer';

export * from './acknowledgementReducer';
export * from './keyFilesReducer';
export * from './progressReducer';

export interface StoreState {
  acknowledgementState: AcknowledgementStateInterface;
  keyFiles: KeyFileInterface[];
  progress: ProgressStep;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  keyFiles: keyFilesReducer,
  progress: progressReducer,
});
