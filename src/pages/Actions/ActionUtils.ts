import BigNumber from 'bignumber.js';
import Web3 from 'web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TransactionConfig } from 'web3-core';
import {
  COMPOUNDING_CONTRACT_ADDRESS,
  WITHDRAWAL_CONTRACT_ADDRESS,
} from '../../utils/envVars';

const getRequiredFee = (queueLength: BigNumber): BigNumber => {
  let i = new BigNumber(1);
  let output = new BigNumber(0);
  let numeratorAccum = new BigNumber(1).times(17); // factor * denominator

  while (numeratorAccum.gt(0)) {
    output = output.plus(numeratorAccum);
    numeratorAccum = numeratorAccum.times(queueLength).dividedBy(i.times(17));
    i = i.plus(1);
  }

  return output.dividedBy(17);
};

// https://eips.ethereum.org/EIPS/eip-7251#fee-calculation
export const getCompoundingFee = async (web3: Web3): Promise<BigNumber> => {
  const queueLengthHex = await web3.eth.getStorageAt(
    COMPOUNDING_CONTRACT_ADDRESS!,
    0
  );

  if (!queueLengthHex) {
    throw new Error('Unable to get compounding queue length');
  }

  const queueLength = new BigNumber(queueLengthHex);

  return getRequiredFee(queueLength);
};

// https://eips.ethereum.org/EIPS/eip-7002#fee-calculation
export const getWithdrawalFee = async (web3: Web3): Promise<BigNumber> => {
  const queueLengthHex = await web3.eth.getStorageAt(
    WITHDRAWAL_CONTRACT_ADDRESS!,
    0
  );

  if (!queueLengthHex) {
    throw new Error('Unable to get withdrawal queue length');
  }

  const queueLength = new BigNumber(queueLengthHex);

  return getRequiredFee(queueLength);
};

export const generateCompoundParams = async (
  web3: Web3,
  address: string,
  pubkeyA: string,
  pubkeyB: string
): Promise<TransactionConfig> => {
  const fee = await getCompoundingFee(web3);

  // https://eips.ethereum.org/EIPS/eip-7251#add-consolidation-request
  return {
    to: COMPOUNDING_CONTRACT_ADDRESS,
    from: address,
    // calldata (96 bytes): sourceValidator.pubkey (48 bytes) + targetValidator.pubkey (48 bytes)
    data: `0x${pubkeyA.substring(2)}${pubkeyB.substring(2)}`,
    value: fee.toString(),
    gas: 200000,
  };
};

export const generateWithdrawalParams = async (
  web3: Web3,
  address: string,
  pubkey: string,
  amount: number
): Promise<TransactionConfig> => {
  const fee = await getWithdrawalFee(web3);

  // https://eips.ethereum.org/EIPS/eip-7002#add-withdrawal-request
  return {
    to: WITHDRAWAL_CONTRACT_ADDRESS,
    from: address,
    // calldata (56 bytes): sourceValidator.pubkey (48 bytes) + amount (8 bytes)
    data: `0x${pubkey.substring(2)}${amount.toString(16).padStart(16, '0')}`,
    value: fee.toString(),
    gas: 200000,
  };
};
