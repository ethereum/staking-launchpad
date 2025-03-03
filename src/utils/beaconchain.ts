import {
  BEACON_CHAIN_GENESIS_TIME,
  MS_PER_SLOT,
  SLOTS_PER_EPOCH,
} from './envVars';

export const getEpochMsSinceGenesis = (epoch: number) =>
  epoch * SLOTS_PER_EPOCH * MS_PER_SLOT;

/**
 * Converts an epoch number to it's unix time in ms
 *
 * @param epoch - The epoch number to convert.
 * @returns The corresponding unix time in ms.
 */
export const epochToDate = (epoch: number): Date =>
  new Date(BEACON_CHAIN_GENESIS_TIME + getEpochMsSinceGenesis(epoch));

/**
 * Calculate current epoch using current time
 *
 * @returns The current epoch number
 */
export const getCurrentEpoch = (): number => {
  const msElapsed = Date.now() - BEACON_CHAIN_GENESIS_TIME;
  return Math.floor(msElapsed / MS_PER_SLOT / SLOTS_PER_EPOCH);
};

/**
 * Calculate current epoch using current time
 *
 * @returns The current epoch number
 */
export const currentEpoch = Math.floor(
  (Date.now() - BEACON_CHAIN_GENESIS_TIME) / MS_PER_SLOT / SLOTS_PER_EPOCH
);
