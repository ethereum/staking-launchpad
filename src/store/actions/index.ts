export enum ActionTypes {
  updateAcknowledgementState,
  updateValidatorCount,
  updateKeyFiles,
  updateProgress
}

// ACKNOWLEDGEMENT ACTIONS
export interface UpdateAcknowledgementStateAction {
  type: ActionTypes.updateAcknowledgementState;
  payload: boolean;
}
export const updateAcknowledgementState = (
  allChecked: boolean
): UpdateAcknowledgementStateAction => {
  return {
    type: ActionTypes.updateAcknowledgementState,
    payload: allChecked
  };
};

// VALIDATOR ACTIONS
export interface UpdateValidatorCountAction {
  type: ActionTypes.updateValidatorCount;
  payload: number;
}
export const updateValidatorCount = (
  count: number
): UpdateValidatorCountAction => {
  return {
    type: ActionTypes.updateValidatorCount,
    payload: count
  };
};

// KEY FILE ACTIONS
export interface keyFile {
  pubkey: string;
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  deposit_data_root: string;
}
export interface UpdateKeyFilesAction {
  type: ActionTypes.updateKeyFiles;
  payload: keyFile[];
}
export const updateKeyFiles = (files: keyFile[]): UpdateKeyFilesAction => {
  return {
    type: ActionTypes.updateKeyFiles,
    payload: files
  };
};

// PROGRESS ACTIONS
export enum ProgressStep {
  "OVERVIEW",
  "VALIDATOR_SETTINGS",
  "GENERATE_KEY_PAIRS",
  "UPLOAD_VALIDATOR_FILE",
  "CONNECT_WALLET",
  "SUMMARY"
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
    payload: progressStep
  };
};

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateValidatorCountAction
  | UpdateKeyFilesAction
  | UpdateProgressAction;
