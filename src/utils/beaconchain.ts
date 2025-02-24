import {
  BEACON_CHAIN_GENESIS_TIME,
  MS_PER_SLOT,
  SLOTS_PER_EPOCH,
} from './envVars';

/**
 * Converts an epoch number to it's unix time in ms
 *
 * @param epoch - The epoch number to convert.
 * @returns The corresponding unix time in ms.
 */
export const epochToDate = (epoch: number): Date => {
  const msSinceGenesis = epoch * SLOTS_PER_EPOCH * MS_PER_SLOT;
  return new Date(BEACON_CHAIN_GENESIS_TIME + msSinceGenesis);
};
