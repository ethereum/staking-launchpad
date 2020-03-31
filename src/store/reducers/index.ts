import { combineReducers } from 'redux';
import {
  acknowledgementReducer,
  AcknowledgementStateInterface,
} from './acknowledgementReducer';
import { workflowReducer } from './workflowReducer';
import { keyFilesReducer } from './keyFilesReducer';
import { KeyFileInterface } from '../actions/keyFileActions';
import { WorkflowStep } from '../actions/workflowActions';

export * from './acknowledgementReducer';
export * from './keyFilesReducer';
export * from './workflowReducer';

export interface StoreState {
  acknowledgementState: AcknowledgementStateInterface;
  keyFiles: KeyFileInterface[];
  workflow: WorkflowStep;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  keyFiles: keyFilesReducer,
  workflow: workflowReducer,
});
