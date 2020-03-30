import { Action, ActionTypes } from '../actions';
import { ProgressStep } from '../actions/progressActions';

export const progressReducer = (
  state: ProgressStep = ProgressStep.OVERVIEW,
  action: Action
) => {
  if (action.type === ActionTypes.updateProgress) {
    return action.payload;
  }
  return state;
};
