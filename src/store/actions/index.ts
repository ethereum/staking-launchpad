export enum ActionTypes {
  updateAcknowledgementState,
  updateValidatorCount
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

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateValidatorCountAction;
