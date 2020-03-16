// VALIDATOR ACTIONS
import { ActionTypes } from "./index";

export interface UpdateValidatorCountAction {
  type: ActionTypes.updateValidatorCount;
  payload: number;
}
export const updateValidatorCount = (
  count: number
): UpdateValidatorCountAction => {
  return {
    type: ActionTypes.updateValidatorCount,
    payload: count
  };
};
