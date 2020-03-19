import { Action, ActionTypes } from "../actions";
import { every, values } from "lodash";

export enum acknowledgementId {
  signup = "signup",
  responsibilities = "responsibilities",
  slashing = "slashing",
  keyManagement = "keyManagement",
  signingKeys = "signingKeys",
  transferDelay = "transferDelay",
  commitment = "commitment",
  earlyAdoptionRisks = "earlyAdoptionRisks"
}

export interface acknowledgementState {
  acknowledgements: {
    [key in acknowledgementId]: boolean;
  };
  allAgreedTo: boolean;
}

const defaultAcknowledgementState: acknowledgementState = {
  acknowledgements: {
    [acknowledgementId.signup]: false,
    [acknowledgementId.responsibilities]: false,
    [acknowledgementId.slashing]: false,
    [acknowledgementId.keyManagement]: false,
    [acknowledgementId.signingKeys]: false,
    [acknowledgementId.transferDelay]: false,
    [acknowledgementId.commitment]: false,
    [acknowledgementId.earlyAdoptionRisks]: false
  },
  allAgreedTo: false
};

export const acknowledgementReducer = (
  state = defaultAcknowledgementState,
  action: Action
): acknowledgementState => {
  if (action.type === ActionTypes.updateAcknowledgementState) {
    const newAcknowledgementState = {
      ...state.acknowledgements,
      ...{ [action.payload.acknowledgementId]: action.payload.value }
    };
    
    return {
      acknowledgements: newAcknowledgementState,
      allAgreedTo: every(values(newAcknowledgementState))
    };
  }
  return state;
};
