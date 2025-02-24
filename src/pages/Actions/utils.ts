import BigNumber from 'bignumber.js';
import Web3 from 'web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { TransactionConfig } from 'web3-core';
import {
  COMPOUNDING_CONTRACT_ADDRESS,
  WITHDRAWAL_CONTRACT_ADDRESS,
  TICKER_NAME,
} from '../../utils/envVars';

export type Queue = {
  length: BigNumber;
  fee: BigNumber;
};

export type TxConfigQueue = {
  transactionParams: TransactionConfig;
  queue: Queue;
};

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

export const getCompoundingQueueLength = async (
  web3: Web3
): Promise<BigNumber> => {
  console.log('Fetching compounding queue length');
  const queueLengthHex = await web3.eth.getStorageAt(
    COMPOUNDING_CONTRACT_ADDRESS!,
    0 // EXCESS_WITHDRAWAL_REQUESTS_STORAGE_SLOT
  );

  if (!queueLengthHex) {
    console.error('Unable to get compounding queue length');
    throw new Error('Unable to get compounding queue length');
  }

  console.log('Compounding queue length fetched:', queueLengthHex);
  return new BigNumber(queueLengthHex);
};

// https://eips.ethereum.org/EIPS/eip-7251#fee-calculation
export const getCompoundingQueue = async (web3: Web3): Promise<Queue> => {
  const length = await getCompoundingQueueLength(web3);

  const fee = getRequiredFee(length);

  return { length, fee };
};

export const getWithdrawalQueueLength = async (
  web3: Web3
): Promise<BigNumber> => {
  console.log('Fetching withdrawal queue length');
  const queueLengthHex = await web3.eth.getStorageAt(
    WITHDRAWAL_CONTRACT_ADDRESS!,
    0 // EXCESS_WITHDRAWAL_REQUESTS_STORAGE_SLOT
  );

  if (!queueLengthHex) {
    console.error('Unable to get withdrawal queue length');
    throw new Error('Unable to get withdrawal queue length');
  }

  console.log('Withdrawal queue length fetched:', queueLengthHex);
  return new BigNumber(queueLengthHex);
};

// https://eips.ethereum.org/EIPS/eip-7002#fee-calculation
export const getWithdrawalQueue = async (web3: Web3): Promise<Queue> => {
  const length = await getWithdrawalQueueLength(web3);

  const fee = getRequiredFee(length);

  return { length, fee };
};

export const generateCompoundParams = async (
  web3: Web3,
  address: string,
  source: string,
  target: string
): Promise<TxConfigQueue> => {
  const queue = await getCompoundingQueue(web3);

  // https://eips.ethereum.org/EIPS/eip-7251#add-consolidation-request
  const transactionParams = {
    to: COMPOUNDING_CONTRACT_ADDRESS,
    from: address,
    // calldata (96 bytes): sourceValidator.pubkey (48 bytes) + targetValidator.pubkey (48 bytes)
    data: `0x${source.substring(2)}${target.substring(2)}`,
    value: queue.fee.toString(),
    gas: 200000,
  };

  return { transactionParams, queue };
};

export const generateWithdrawalParams = async (
  web3: Web3,
  address: string,
  pubkey: string,
  amount: number
): Promise<TxConfigQueue> => {
  console.log('Generating withdrawal params');
  const queue = await getWithdrawalQueue(web3);

  // https://eips.ethereum.org/EIPS/eip-7002#add-withdrawal-request
  const transactionParams = {
    to: WITHDRAWAL_CONTRACT_ADDRESS,
    from: address,
    // calldata (56 bytes): sourceValidator.pubkey (48 bytes) + amount (8 bytes)
    data: `0x${pubkey.substring(2)}${amount.toString(16).padStart(16, '0')}`,
    value: queue.fee.toString(),
    gas: 200000,
  };

  console.log('Withdrawal params generated:', transactionParams);
  return { transactionParams, queue };
};

export type FeeStatus = 'normal' | 'high' | 'volatile';

/**
 * @param fee Fee in wei
 */
export const getFeeStatus = (fee: BigNumber): FeeStatus => {
  // If fee over 0.01 ETH
  if (fee.gt(0.01 * 1e18)) return 'volatile';
  // If fee over 6000 gwei
  if (fee.gt(6_000 * 1e9)) return 'high';
  return 'normal';
};

export const getEtherFeeFromQueue = (queue: Queue): string =>
  `${queue.fee.dividedBy(1e18).toFixed()} ${TICKER_NAME}`;
