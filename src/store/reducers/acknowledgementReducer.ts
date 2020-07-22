import { Action, ActionTypes } from '../actions';

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
  [AcknowledgementIdsEnum.introSection]: false,
  [AcknowledgementIdsEnum.signup]: false,
  [AcknowledgementIdsEnum.responsibilities]: false,
  [AcknowledgementIdsEnum.slashing]: false,
  [AcknowledgementIdsEnum.keyManagement]: false,
  [AcknowledgementIdsEnum.signingKeys]: false,
  [AcknowledgementIdsEnum.transferDelay]: false,
  [AcknowledgementIdsEnum.commitment]: false,
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: false,
  [AcknowledgementIdsEnum.confirmation]: false,
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
