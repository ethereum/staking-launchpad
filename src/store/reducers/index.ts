import { combineReducers } from 'redux';
import {
  acknowledgementReducer,
  AcknowledgementStateInterface,
} from './acknowledgementReducer';
import { workflowProgressReducer } from './workflowProgressReducer';
import { keyFilesReducer } from './keyFilesReducer';
import { KeyFileInterface } from '../actions/keyFileActions';
import { WorkflowProgressStep } from '../actions/workflowProgressActions';

export * from './acknowledgementReducer';
export * from './keyFilesReducer';
export * from './workflowProgressReducer';

export interface StoreState {
  acknowledgementState: AcknowledgementStateInterface;
  keyFiles: KeyFileInterface[];
  workflowProgress: WorkflowProgressStep;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  keyFiles: keyFilesReducer,
  workflowProgress: workflowProgressReducer,
});
