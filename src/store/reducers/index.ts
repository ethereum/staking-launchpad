import { combineReducers } from 'redux';
import {
  acknowledgementReducer,
  AcknowledgementStateInterface,
} from './acknowledgementReducer';
import { DepositFileInterface, depositFileReducer } from './depositFileReducer';
import { workflowReducer } from './workflowReducer';
import { WorkflowStep } from '../actions/workflowActions';
import { clientReducer, clientState } from './clientReducer';

export * from './acknowledgementReducer';
export * from './depositFileReducer';
export * from './workflowReducer';

export interface StoreState {
  acknowledgementState: AcknowledgementStateInterface;
  depositFile: DepositFileInterface;
  workflow: WorkflowStep;
  client: clientState;
}

export const reducers = combineReducers<StoreState>({
  acknowledgementState: acknowledgementReducer,
  depositFile: depositFileReducer,
  workflow: workflowReducer,
  client: clientReducer,
});
