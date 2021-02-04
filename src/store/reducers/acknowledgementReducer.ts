import { Action, ActionTypes } from '../actions';

export enum AcknowledgementIdsEnum {
  introSection,
  deposit,
  terminal,
  responsibilities,
  slashing,
  keyManagement,
  commitment,
  earlyAdoptionRisks,
  confirmation,
}

export type AcknowledgementStateInterface = {
  [key in AcknowledgementIdsEnum]: boolean;
};

const defaultAcknowledgementState: AcknowledgementStateInterface = {
  [AcknowledgementIdsEnum.introSection]: false,
  [AcknowledgementIdsEnum.deposit]: false,
  [AcknowledgementIdsEnum.responsibilities]: false,
  [AcknowledgementIdsEnum.slashing]: false,
  [AcknowledgementIdsEnum.keyManagement]: false,
  [AcknowledgementIdsEnum.commitment]: false,
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: false,
  [AcknowledgementIdsEnum.terminal]: false,
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
