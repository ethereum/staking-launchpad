import BigNumber from 'bignumber.js';
import { Validator } from '../pages/Actions/types';

const FAR_FUTURE_EPOCH = new BigNumber(2).pow(63).minus(1); // 63-bit 1-filled

export const hasExitEpochBeenSet = (exitEpoch: BigNumber | number) =>
  new BigNumber(exitEpoch).isLessThan(FAR_FUTURE_EPOCH);

export const hasValidatorExited = (validator: Validator) =>
  hasExitEpochBeenSet(validator.exitepoch);
