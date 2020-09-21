import _sample from 'lodash/sample';
import { Action, ActionTypes } from '../actions';
import { ValidatorId } from '../actions/validatorActions';

export type validatorState = {
  eth1Validator: ValidatorId;
  eth2Validator: ValidatorId;
};

const eth1ValidatorIds = [
  ValidatorId.BESU,
  ValidatorId.NETHERMIND,
  ValidatorId.PARITY,
  ValidatorId.GETH,
];

const eth2ValidatorIds = [
  ValidatorId.LIGHTHOUSE,
  ValidatorId.NIMBUS,
  ValidatorId.TEKU,
  ValidatorId.PRYSM,
];

const initialState: validatorState = {
  eth1Validator: _sample(eth1ValidatorIds) || eth2ValidatorIds[0],
  eth2Validator: _sample(eth2ValidatorIds) || eth2ValidatorIds[0],
};

export const validatorReducer = (
  state: validatorState = initialState,
  action: Action
) => {
  if (action.type === ActionTypes.updateValidator) {
    if (action.payload.ethVersion === 1) {
      return {
        ...state,
        eth1Validator: action.payload.validatorId,
      };
    }

    if (action.payload.ethVersion === 2) {
      return {
        ...state,
        eth2Validator: action.payload.validatorId,
      };
    }
  }
  return state;
};
