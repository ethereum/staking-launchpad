import { Action, ActionTypes } from '../actions';
import { WorkflowStep } from '../actions/workflowActions';

export const workflowReducer = (
  state: WorkflowStep = WorkflowStep.OVERVIEW,
  action: Action
) => {
  if (action.type === ActionTypes.updateWorkflow) {
    return action.payload;
  }
  return state;
};
