import { ActionTypes } from './index';
import { acknowledgementId } from '../reducers';

export interface UpdateAcknowledgementStateAction {
  type: ActionTypes.updateAcknowledgementState;
  payload: {
    acknowledgementId: acknowledgementId;
    value: boolean;
  };
}

export const updateAcknowledgementState = (
  acknowledgementId: acknowledgementId,
  value: boolean
): UpdateAcknowledgementStateAction => {
  return {
    type: ActionTypes.updateAcknowledgementState,
    payload: { acknowledgementId, value },
  };
};
