/*
  eslint-disable camelcase
 */
import _every from 'lodash/every';
import { initBLS } from '@chainsafe/bls';
import { verifySignature } from '../../utils/verifySignature';
import { verifyDepositRoots } from '../../utils/SSZ';
import { DepositKeyInterface } from '../../store/reducers';

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
    !depositDatum.deposit_data_root
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
    typeof depositDatum.deposit_data_root !== 'string'
  ) {
    return false;
  }

  // check length of strings
  if (
    depositDatum.pubkey.length !== 96 ||
    depositDatum.withdrawal_credentials.length !== 64 ||
    depositDatum.signature.length !== 192 ||
    depositDatum.deposit_message_root.length !== 64 ||
    depositDatum.deposit_data_root.length !== 64
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
