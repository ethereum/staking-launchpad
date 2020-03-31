import { ActionTypes } from './index';

export enum WorkflowProgressStep {
  'OVERVIEW',
  'GENERATE_KEY_PAIRS',
  'UPLOAD_VALIDATOR_FILE',
  'CONNECT_WALLET',
  'SUMMARY',
  'TRANSACTION_SIGNING',
  'CONGRATULATIONS',
}

export interface UpdateWorkflowProgressAction {
  type: ActionTypes.updateWorkflowProgress;
  payload: WorkflowProgressStep;
}
export const updateWorkflowProgress = (
  workflowProgressStep: WorkflowProgressStep
): UpdateWorkflowProgressAction => {
  return {
    type: ActionTypes.updateWorkflowProgress,
    payload: workflowProgressStep,
  };
};

export type DispatchUpdateWorkflowProgressType = (
  step: WorkflowProgressStep
) => void;
