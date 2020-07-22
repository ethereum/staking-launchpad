import { ActionTypes } from './index';

export enum WorkflowStep {
  'OVERVIEW',
  'GENERATE_KEY_PAIRS',
  'UPLOAD_VALIDATOR_FILE',
  'CONNECT_WALLET',
  'SUMMARY',
  'TRANSACTION_SIGNING',
  'CONGRATULATIONS',
}

export interface UpdateWorkflowAction {
  type: ActionTypes.updateWorkflow;
  payload: WorkflowStep;
}
export const updateWorkflow = (
  workflowStep: WorkflowStep
): UpdateWorkflowAction => {
  return {
    type: ActionTypes.updateWorkflow,
    payload: workflowStep,
  };
};

export type DispatchWorkflowUpdateType = (step: WorkflowStep) => void;
