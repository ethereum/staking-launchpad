import { Action, ActionTypes } from '../actions';
import { WorkflowStep } from '../actions/workflowActions';

export const workflowReducer = (
  state: WorkflowStep = WorkflowStep.SUMMARY,
  action: Action
) => {
  if (action.type === ActionTypes.updateWorkflow) {
    return action.payload;
  }
  return state;
};
