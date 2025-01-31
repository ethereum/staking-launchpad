import { BeaconChainValidatorStatus } from '../TopUp/types';

export interface OwnProps {}
export interface StateProps {}
export interface DispatchProps {}
export type Props = StateProps & DispatchProps & OwnProps;

export interface Validator {
  activationeligibilityepoch: number;
  activationepoch: number;
  balance: number;
  coinBalance: number;
  effectivebalance: number;
  exitepoch: number;
  lastattestationslot: number;
  name: string;
  pubkey: string;
  slashed: boolean;
  status: BeaconChainValidatorStatus;
  validatorindex: number;
  withdrawableepoch: number;
  withdrawalcredentials: string;
}
