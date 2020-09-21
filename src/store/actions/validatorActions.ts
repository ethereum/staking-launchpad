import { ActionTypes } from './index';

export enum ValidatorId {
  'BESU' = 'BESU',
  'PARITY' = 'PARITY',
  'NETHERMIND' = 'NETHERMIND',
  'GETH' = 'GETH',
  'PRYSM' = 'PRYSM',
  'LIGHTHOUSE' = 'LIGHTHOUSE',
  'NIMBUS' = 'NIMBUS',
  'TEKU' = 'TEKU',
}

export interface UpdateValidatorAction {
  type: ActionTypes.updateValidator;
  payload: {
    validatorId: ValidatorId;
    ethVersion: 1 | 2;
  };
}

export const updateValidator = (
  validatorId: ValidatorId,
  ethVersion: 1 | 2
): UpdateValidatorAction => {
  return {
    type: ActionTypes.updateValidator,
    payload: {
      validatorId,
      ethVersion,
    },
  };
};

export type DispatchValidatorUpdate = (
  ValidatorId: ValidatorId,
  ethVersion: 1 | 2
) => void;
