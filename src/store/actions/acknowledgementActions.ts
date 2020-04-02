import { ActionTypes } from './index';
import { AcknowledgementIdsEnum } from '../reducers';

export interface UpdateAcknowledgementStateAction {
  type: ActionTypes.updateAcknowledgementState;
  payload: {
    acknowledgementId: AcknowledgementIdsEnum;
    value: boolean;
  };
}

export const updateAcknowledgementState = (
  acknowledgementId: AcknowledgementIdsEnum,
  value: boolean
): UpdateAcknowledgementStateAction => {
  return {
    type: ActionTypes.updateAcknowledgementState,
    payload: { acknowledgementId, value },
  };
};

export type DispatchAcknowledgementStateUpdateType = (
  acknowledgementId: AcknowledgementIdsEnum,
  value: boolean
) => void;
