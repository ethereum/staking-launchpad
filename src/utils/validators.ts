import BigNumber from 'bignumber.js';
import { ValidatorType } from '../pages/Actions/types';
import { BeaconChainValidator } from '../pages/TopUp/types';
import {
  ETHER_TO_GWEI,
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
} from './envVars';

const FAR_FUTURE_EPOCH = new BigNumber(2).pow(63).minus(1); // 63-bit 1-filled

export const hasExitEpochBeenSet = (exitEpoch: BigNumber | number) =>
  new BigNumber(exitEpoch).isLessThan(FAR_FUTURE_EPOCH);

export const hasValidatorExited = (validator: BeaconChainValidator) =>
  hasExitEpochBeenSet(validator.exitepoch);

export const getCredentialType = (
  validator: BeaconChainValidator
): ValidatorType =>
  +validator.withdrawalcredentials.slice(0, 4) as ValidatorType;

export const getEtherBalance = (validator: BeaconChainValidator): number =>
  (validator.balance / ETHER_TO_GWEI) as number;

/**
 * @returns the max effective balance for a validator in ether
 */
export const getMaxEB = (validator: BeaconChainValidator): number =>
  getCredentialType(validator) < ValidatorType.Compounding
    ? MIN_ACTIVATION_BALANCE
    : MAX_EFFECTIVE_BALANCE;

/**
 * @returns the effective balance for a validator in ether
 */
export const getEffectiveBalance = (validator: BeaconChainValidator): number =>
  validator.effectivebalance / ETHER_TO_GWEI;
