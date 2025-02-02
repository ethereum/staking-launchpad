export interface OwnProps {}
export interface StateProps {}
export interface DispatchProps {}
export type Props = StateProps & DispatchProps & OwnProps;

export enum ValidatorType {
  BLS = 0,
  Execution = 1,
  Compounding = 2,
}

export interface Validator {
  activationeligibilityepoch: number;
  activationepoch: number;
  balance: number;
  balanceDisplay?: string;
  coinBalance: number;
  effectivebalance: number;
  exitepoch: number;
  lastattestationslot: number;
  name: string;
  pubkey: string;
  slashed: boolean;
  status: string;
  type: ValidatorType;
  validatorindex: number;
  withdrawableepoch: number;
  withdrawalcredentials: string;
}
