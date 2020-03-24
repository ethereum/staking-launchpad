import { Action, ActionTypes } from '../actions';

export const validatorReducer = (state: number = 0, action: Action) => {
  if (action.type === ActionTypes.updateValidatorCount) {
    return action.payload;
  }
  return state;
};
