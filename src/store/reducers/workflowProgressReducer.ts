import { Action, ActionTypes } from '../actions';
import { WorkflowProgressStep } from '../actions/workflowProgressActions';

export const workflowProgressReducer = (
  state: WorkflowProgressStep = WorkflowProgressStep.OVERVIEW,
  action: Action
) => {
  if (action.type === ActionTypes.updateWorkflowProgress) {
    return action.payload;
  }
  return state;
};
