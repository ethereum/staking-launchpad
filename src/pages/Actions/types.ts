export interface OwnProps {}
export interface StateProps {}
export interface DispatchProps {}
export type Props = StateProps & DispatchProps & OwnProps;

export const ValidatorType = {
  BLS: 0,
  Execution: 1,
  Compounding: 2,
} as const;

export type ValidatorType = typeof ValidatorType[keyof typeof ValidatorType];
