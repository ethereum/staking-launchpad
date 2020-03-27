import { ActionTypes } from './index';

export enum ProgressStep {
  'OVERVIEW',
  'GENERATE_KEY_PAIRS',
  'UPLOAD_VALIDATOR_FILE',
  'CONNECT_WALLET',
  'SUMMARY',
  'TRANSACTION_SIGNING',
  'CONGRATULATIONS',
}

export interface UpdateProgressAction {
  type: ActionTypes.updateProgress;
  payload: ProgressStep;
}
export const updateProgress = (
  progressStep: ProgressStep
): UpdateProgressAction => {
  return {
    type: ActionTypes.updateProgress,
    payload: progressStep,
  };
};
