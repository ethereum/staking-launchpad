import { ActionTypes } from './index';
// import { routesEnum } from "../../Routes";

export enum ProgressStep {
  'OVERVIEW',
  'VALIDATOR_SETTINGS',
  'GENERATE_KEY_PAIRS',
  'UPLOAD_VALIDATOR_FILE',
  'CONNECT_WALLET',
  'SUMMARY',
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
