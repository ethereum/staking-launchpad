import { Action, ActionTypes } from '../actions';
import { every, values } from 'lodash';

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

export interface acknowledgementState {
  acknowledgements: {
    [key in acknowledgementId]: boolean;
  };
  allAgreedTo: boolean;
}

const defaultAcknowledgementState: acknowledgementState = {
  acknowledgements: {
    [acknowledgementId.signup]: true,
    [acknowledgementId.responsibilities]: true,
    [acknowledgementId.slashing]: true,
    [acknowledgementId.keyManagement]: true,
    [acknowledgementId.signingKeys]: true,
    [acknowledgementId.transferDelay]: true,
    [acknowledgementId.commitment]: true,
    [acknowledgementId.earlyAdoptionRisks]: true,
  },
  allAgreedTo: true,
};

export const acknowledgementReducer = (
  state = defaultAcknowledgementState,
  action: Action
): acknowledgementState => {
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
