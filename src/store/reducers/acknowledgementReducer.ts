import { every, values } from 'lodash';
import { Action, ActionTypes } from '../actions';

export enum acknowledgementId {
  signup = 'signup',
  responsibilities = 'responsibilities',
  slashing = 'slashing',
  keyManagement = 'keyManagement',
  signingKeys = 'signingKeys',
  transferDelay = 'transferDelay',
  commitment = 'commitment',
  earlyAdoptionRisks = 'earlyAdoptionRisks',
}

export interface AcknowledgementStateInterface {
  acknowledgements: {
    [key in acknowledgementId]: boolean;
  };
  allAgreedTo: boolean;
}

const defaultAcknowledgementState: AcknowledgementStateInterface = {
  acknowledgements: {
    [acknowledgementId.signup]: false,
    [acknowledgementId.responsibilities]: false,
    [acknowledgementId.slashing]: false,
    [acknowledgementId.keyManagement]: false,
    [acknowledgementId.signingKeys]: false,
    [acknowledgementId.transferDelay]: false,
    [acknowledgementId.commitment]: false,
    [acknowledgementId.earlyAdoptionRisks]: false,
  },
  allAgreedTo: false,
};

export const acknowledgementReducer = (
  state = defaultAcknowledgementState,
  action: Action
): AcknowledgementStateInterface => {
  if (action.type === ActionTypes.updateAcknowledgementState) {
    const newAcknowledgementState = {
      ...state.acknowledgements,
      ...{ [action.payload.acknowledgementId]: action.payload.value },
    };

    return {
      acknowledgements: newAcknowledgementState,
      allAgreedTo: every(values(newAcknowledgementState)),
    };
  }
  return state;
};
