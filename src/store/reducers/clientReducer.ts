import _sample from 'lodash/sample';
import { Action, ActionTypes } from '../actions';
import { ClientId } from '../actions/clientActions';

export type clientState = {
  executionClient: ClientId;
  consensusClient: ClientId;
};

const executionClientIds = [
  ClientId.BESU,
  ClientId.NETHERMIND,
  ClientId.RETH,
  ClientId.ERIGON,
  ClientId.GETH,
];

const consensusClientIds = [
  ClientId.LIGHTHOUSE,
  ClientId.NIMBUS,
  ClientId.TEKU,
  ClientId.PRYSM,
];

const initialState: clientState = {
  executionClient: _sample(executionClientIds) || consensusClientIds[0],
  consensusClient: _sample(consensusClientIds) || consensusClientIds[0],
};

export const clientReducer = (
  state: clientState = initialState,
  action: Action
) => {
  if (action.type === ActionTypes.updateClient) {
    if (action.payload.ethClientType === 'execution') {
      return {
        ...state,
        executionClient: action.payload.clientId,
      };
    }

    if (action.payload.ethClientType === 'consensus') {
      return {
        ...state,
        consensusClient: action.payload.clientId,
      };
    }
  }
  return state;
};
