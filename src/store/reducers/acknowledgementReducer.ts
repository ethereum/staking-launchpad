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
  [AcknowledgementIdsEnum.introSection]: process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.deposit]: process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.responsibilities]:
    process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.slashing]: process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.keyManagement]:
    process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.commitment]: process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.earlyAdoptionRisks]:
    process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.terminal]: process.env.NODE_ENV === 'development',
  [AcknowledgementIdsEnum.confirmation]: process.env.NODE_ENV === 'development',
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
