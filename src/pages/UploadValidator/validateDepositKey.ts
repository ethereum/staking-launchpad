/*
  eslint-disable camelcase
 */
import _every from 'lodash/every';
import { initBLS } from '@chainsafe/bls';
import compareVersions from 'compare-versions';
import axios from 'axios';
import { verifySignature } from '../../utils/verifySignature';
import { verifyDepositRoots } from '../../utils/SSZ';
import {
  DepositKeyInterface,
  BeaconchainDepositInterface,
} from '../../store/reducers';
import {
  ETHER_TO_GWEI,
  ETH2_NETWORK_NAME,
  MIN_DEPOSIT_AMOUNT,
  MIN_DEPOSIT_CLI_VERSION,
} from '../../utils/envVars';

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
    !depositDatum.fork_version ||
    !depositDatum.deposit_cli_version
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
    typeof depositDatum.fork_version !== 'string' ||
    typeof depositDatum.deposit_cli_version !== 'string'
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

  // check the deposit amount
  if (
    depositDatum.amount < MIN_DEPOSIT_AMOUNT ||
    depositDatum.amount > 32 * ETHER_TO_GWEI
  ) {
    return false;
  }

  // check the deposit-cli version
  if (
    compareVersions.compare(
      depositDatum.deposit_cli_version,
      MIN_DEPOSIT_CLI_VERSION,
      '<'
    )
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

export const getExistingDepositsForPubkeys = async (
  files: DepositKeyInterface[]
): Promise<BeaconchainDepositInterface> => {
  const pubkeys = files.flatMap(x => x.pubkey);
  const beaconScanUrl = `https://${ETH2_NETWORK_NAME}.beaconcha.in/api/v1/validator/${pubkeys.join(
    ','
  )}/deposits`;
  const { data: beaconScanCheck } = await axios.get<
    BeaconchainDepositInterface
  >(beaconScanUrl);

  if (!beaconScanCheck.data || beaconScanCheck.status !== 'OK') {
    throw new Error('Beaconchain API is down');
  }
  return beaconScanCheck;
};
