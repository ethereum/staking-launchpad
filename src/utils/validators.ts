import BigNumber from 'bignumber.js';
import { ValidatorType } from '../pages/Actions/types';
import { BeaconChainValidator } from '../pages/TopUp/types';
import { ETHER_TO_GWEI } from './envVars';

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
