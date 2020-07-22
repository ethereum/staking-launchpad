import { combineReducers } from 'redux';
import {
  acknowledgementReducer,
  AcknowledgementStateInterface,
} from './acknowledgementReducer';
import { DepositFileInterface, depositFileReducer } from './depositFileReducer';
import { workflowReducer } from './workflowReducer';
import { WorkflowStep } from '../actions/workflowActions';

export * from './acknowledgementReducer';
export * from './depositFileReducer';
export * from './workflowReducer';

export interface StoreState {
  acknowledgementState: AcknowledgementStateInterface;
  depositFile: DepositFileInterface;
  workflow: WorkflowStep;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  depositFile: depositFileReducer,
  workflow: workflowReducer,
});
