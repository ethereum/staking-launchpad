import { ActionTypes } from './index';

export enum ClientId {
  'BESU' = 'BESU',
  'OPEN_ETHEREUM' = 'OPEN_ETHEREUM',
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
