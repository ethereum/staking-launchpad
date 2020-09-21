import { ActionTypes } from './index';

export enum ClientId {
  'BESU' = 'BESU',
  'PARITY' = 'PARITY',
  'NETHERMIND' = 'NETHERMIND',
  'GETH' = 'GETH',
  'PRYSM' = 'PRYSM',
  'LIGHTHOUSE' = 'LIGHTHOUSE',
  'NIMBUS' = 'NIMBUS',
  'TEKU' = 'TEKU',
}

export interface UpdateClientAction {
  type: ActionTypes.updateClient;
  payload: {
    clientId: ClientId;
    ethVersion: 1 | 2;
  };
}

export const updateClient = (
  clientId: ClientId,
  ethVersion: 1 | 2
): UpdateClientAction => {
  return {
    type: ActionTypes.updateClient,
    payload: {
      clientId,
      ethVersion,
    },
  };
};

export type DispatchClientUpdate = (
  ValidatorId: ClientId,
  ethVersion: 1 | 2
) => void;
