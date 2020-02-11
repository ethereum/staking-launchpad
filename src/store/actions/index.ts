export enum ActionTypes {
  updateAcknowledgementState,
  updateValidatorCount,
  updateKeyFiles
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

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateValidatorCountAction
  | UpdateKeyFilesAction;
