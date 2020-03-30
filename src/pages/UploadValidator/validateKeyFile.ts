/*
  eslint-disable camelcase
 */
import _every from 'lodash/every';
import { initBLS } from '@chainsafe/bls';
import { verifySignature } from '../../utils/verifySignature';
import { KeyFileInterface } from '../../store/actions/keyFileActions';

export const validateKeyFile = async (
  files: KeyFileInterface[]
): Promise<boolean> => {
  await initBLS();

  if (!Array.isArray(files)) return false;
  if (files.length <= 0) return false;

  const keyFileStatuses: boolean[] = files.map(file => {
    const {
      pubkey,
      withdrawal_credentials,
      amount,
      signature,
      deposit_data_root,
    } = file;

    // check existence of required keys
    if (
      !pubkey ||
      !withdrawal_credentials ||
      !amount ||
      !signature ||
      !deposit_data_root
    ) {
      return false;
    }

    // check type of values
    if (
      typeof pubkey !== 'string' ||
      typeof withdrawal_credentials !== 'string' ||
      typeof amount !== 'number' ||
      typeof signature !== 'string' ||
      typeof deposit_data_root !== 'string'
    ) {
      return false;
    }

    // check length of strings
    if (
      pubkey.length !== 96 ||
      withdrawal_credentials.length !== 64 ||
      signature.length !== 192 ||
      deposit_data_root.length !== 64
    ) {
      return false;
    }

    // perform BLS check
    return verifySignature(pubkey, signature, deposit_data_root);
  });
  return _every(keyFileStatuses);
};
