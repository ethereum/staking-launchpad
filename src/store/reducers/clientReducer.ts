import _sample from 'lodash/sample';
import { Action, ActionTypes } from '../actions';
import { ClientId } from '../actions/clientActions';

export type clientState = {
  eth1Client: ClientId;
  eth2Client: ClientId;
};

const eth1ClientIds = [
  ClientId.BESU,
  ClientId.NETHERMIND,
  ClientId.PARITY,
  ClientId.GETH,
];

const eth2ClientIds = [
  ClientId.LIGHTHOUSE,
  ClientId.NIMBUS,
  ClientId.TEKU,
  ClientId.PRYSM,
];

const initialState: clientState = {
  eth1Client: _sample(eth1ClientIds) || eth2ClientIds[0],
  eth2Client: _sample(eth2ClientIds) || eth2ClientIds[0],
};

export const clientReducer = (
  state: clientState = initialState,
  action: Action
) => {
  if (action.type === ActionTypes.updateClient) {
    if (action.payload.ethVersion === 1) {
      return {
        ...state,
        eth1Client: action.payload.clientId,
      };
    }

    if (action.payload.ethVersion === 2) {
      return {
        ...state,
        eth2Client: action.payload.clientId,
      };
    }
  }
  return state;
};
