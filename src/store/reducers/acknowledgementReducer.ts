import { Action, ActionTypes } from '../actions';

// TODO this code can probably be cleaned up using some fancy typescript syntax
export enum AcknowledgementIdsEnum {
  introSection,
  signup,
  responsibilities,
  slashing,
  keyManagement,
  signingKeys,
  transferDelay,
  commitment,
  earlyAdoptionRisks,
  confirmation,
}

export type AcknowledgementStateInterface = {
  [key in AcknowledgementIdsEnum]: boolean;
};

const defaultAcknowledgementState: AcknowledgementStateInterface = {
  0: false,
  1: false,
  2: false,
  3: false,
  4: false,
  5: false,
  6: false,
  7: false,
  8: false,
  9: false,
};

export const acknowledgementReducer = (
  state = defaultAcknowledgementState,
  action: Action
): AcknowledgementStateInterface => {
  if (action.type === ActionTypes.updateAcknowledgementState) {
    return {
      ...state,
      ...{ [action.payload.acknowledgementId]: action.payload.value },
    };
  }
  return state;
};
