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
    ethConsensusProtocol: 'proof-of-work' | 'proof-of-stake';
  };
}

export const updateClient = (
  clientId: ClientId,
  ethConsensusProtocol: 'proof-of-work' | 'proof-of-stake'
): UpdateClientAction => {
  return {
    type: ActionTypes.updateClient,
    payload: {
      clientId,
      ethConsensusProtocol,
    },
  };
};

export type DispatchClientUpdate = (
  ValidatorId: ClientId,
  ethConsensusProtocol: 'proof-of-work' | 'proof-of-stake'
) => void;
