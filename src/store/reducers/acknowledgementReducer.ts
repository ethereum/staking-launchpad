import { Action, ActionTypes } from '../actions';

export enum AcknowledgementIdsEnum {
  introSection,
  terminal,
  responsibilities,
  slashing,
  keyManagement,
  withdrawalAddress,
  earlyAdoptionRisks,
  checklist,
  confirmation,
}

export type AcknowledgementStateInterface = {
  [key in AcknowledgementIdsEnum]: boolean;
};

const defaultAcknowledgementState: AcknowledgementStateInterface = {
  [AcknowledgementIdsEnum.introSection]: false,
  [AcknowledgementIdsEnum.terminal]: false,
  [AcknowledgementIdsEnum.responsibilities]: false,
  [AcknowledgementIdsEnum.slashing]: false,
  [AcknowledgementIdsEnum.keyManagement]: false,
  [AcknowledgementIdsEnum.withdrawalAddress]: false,
  [AcknowledgementIdsEnum.earlyAdoptionRisks]: false,
  [AcknowledgementIdsEnum.checklist]: false,
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
