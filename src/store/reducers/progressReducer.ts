import { Action, ActionTypes, ProgressStep } from '../actions';

export const progressReducer = (
  state: ProgressStep = ProgressStep.OVERVIEW,
  action: Action
) => {
  if (action.type === ActionTypes.updateProgress) {
    return action.payload;
  }
  return state;
};
