import { ActionTypes } from './index';

export enum ClientId {
  'BESU' = 'BESU',
  'ERIGON' = 'ERIGON',
  'GETH' = 'GETH',
  'NETHERMIND' = 'NETHERMIND',
  'RETH' = 'RETH',
  'LIGHTHOUSE' = 'LIGHTHOUSE',
  'NIMBUS' = 'NIMBUS',
  'PRYSM' = 'PRYSM',
  'TEKU' = 'TEKU',
  'LODESTAR' = 'LODESTAR',
}

export interface UpdateClientAction {
  type: ActionTypes.updateClient;
  payload: {
    clientId: ClientId;
    ethClientType: 'execution' | 'consensus';
  };
}

export const updateClient = (
  clientId: ClientId,
  ethClientType: 'execution' | 'consensus'
): UpdateClientAction => {
  return {
    type: ActionTypes.updateClient,
    payload: {
      clientId,
      ethClientType,
    },
  };
};

export type DispatchClientUpdate = (
  ValidatorId: ClientId,
  ethClientType: 'execution' | 'consensus'
) => void;
