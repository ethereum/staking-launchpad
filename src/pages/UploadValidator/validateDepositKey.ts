/*
  eslint-disable camelcase
 */
import _every from 'lodash/every';
import { initBLS } from '@chainsafe/bls';
import { verifySignature } from '../../utils/verifySignature';
import { verifyDepositRoots } from '../../utils/SSZ';
import { DepositKeyInterface } from '../../store/reducers';
import { MIN_DEPOSIT_AMOUNT, MAX_DEPOSIT_AMOUNT } from '../../utils/envVars';

const validateFieldFormatting = (
  depositDatum: DepositKeyInterface
): boolean => {
  // check existence of required keys
  if (
    !depositDatum.pubkey ||
    !depositDatum.withdrawal_credentials ||
    !depositDatum.amount ||
    !depositDatum.signature ||
    !depositDatum.deposit_message_root ||
    !depositDatum.deposit_data_root ||
    !depositDatum.fork_version
  ) {
    return false;
  }

  // check type of values
  if (
    typeof depositDatum.pubkey !== 'string' ||
    typeof depositDatum.withdrawal_credentials !== 'string' ||
    typeof depositDatum.amount !== 'number' ||
    typeof depositDatum.signature !== 'string' ||
    typeof depositDatum.deposit_message_root !== 'string' ||
    typeof depositDatum.deposit_data_root !== 'string' ||
    typeof depositDatum.fork_version !== 'string'
  ) {
    return false;
  }

  // check length of strings (note: using string length, so 1 byte = 2 chars)
  if (
    depositDatum.pubkey.length !== 96 ||
    depositDatum.withdrawal_credentials.length !== 64 ||
    depositDatum.signature.length !== 192 ||
    depositDatum.deposit_message_root.length !== 64 ||
    depositDatum.deposit_data_root.length !== 64 ||
    depositDatum.fork_version.length !== 8
  ) {
    return false;
  }
  if (
    depositDatum.amount < MIN_DEPOSIT_AMOUNT ||
    depositDatum.amount > MAX_DEPOSIT_AMOUNT
  ) {
    return false;
  }
  return true;
};

export const validateDepositKey = async (
  files: DepositKeyInterface[]
): Promise<boolean> => {
  await initBLS();

  if (!Array.isArray(files)) return false;
  if (files.length <= 0) return false;

  const depositKeysStatuses: boolean[] = files.map(depositDatum => {
    if (!validateFieldFormatting(depositDatum)) {
      return false;
    }
    if (!verifyDepositRoots(depositDatum)) {
      return false;
    }
    return verifySignature(depositDatum);
  });
  return _every(depositKeysStatuses);
};
