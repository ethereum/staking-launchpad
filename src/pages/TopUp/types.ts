/* eslint-disable camelcase */

import { ByteVector } from '@chainsafe/ssz';

export interface OwnProps {}
export interface StateProps {}
export interface DispatchProps {}
export type Props = StateProps & DispatchProps & OwnProps;

export enum BeaconChainValidatorStatus {
  deposited = 'deposited',
  deposited_invalid = 'deposited_invalid',
  pending = 'pending',
  active_online = 'active_online',
  active_offline = 'active_offline',
  exiting_online = 'exiting_online',
  exiting_offline = 'exiting_offline',
  slashing_online = 'slashing_online',
  slashing_offline = 'slashing_offline',
  exited = 'exited',
  slashed = 'slashed',
}

export interface BeaconChainValidatorTransaction {
  amount: number;
  block_number: number;
  block_ts: number;
  from_address: string;
  merkletree_index: string;
  publickey: string;
  removed: boolean;
  signature: string;
  tx_hash: string;
  tx_index: number;
  tx_input: string;
  valid_signature: boolean;
  withdrawal_credentials: string;
}

export interface BeaconChainValidatorResponse {
  publickey: string;
  valid_signature: boolean;
  validatorindex: number;
}

export interface BeaconChainValidator {
  activationeligibilityepoch: number;
  activationepoch: number;
  balance: number;
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

export interface DepositData {
  pubkey: ByteVector;
  withdrawalCredentials: ByteVector;
  amount: Number;
  signature: ByteVector;
}
