export interface CalculateEth2RewardsParams {
  slotTimeInSec?: number;
  slotsInEpoch?: number;
  baseRewardFactor?: number;
  totalAtStake?: number; // ETH
  averageNetworkPctOnline?: number;
  vaildatorUptime?: number;
  validatorDeposit?: number; // ETH
  effectiveBalanceIncrement?: number; // gwei
  weightDenominator?: number;
  proposerWeight?: number;
}

const calculateEth2Rewards = ({
  slotTimeInSec = 12,
  slotsInEpoch = 32,
  baseRewardFactor = 64,
  totalAtStake = 1_000_000, // ETH
  averageNetworkPctOnline = 0.95,
  vaildatorUptime = 0.99,
  validatorDeposit = 32, // ETH
  effectiveBalanceIncrement = 1_000_000_000, // gwei
  weightDenominator = 64,
  proposerWeight = 8,
}: CalculateEth2RewardsParams): number => {
  // Calculate number of epochs per year
  const avgSecInYear = 31556908.8; // 60 * 60 * 24 * 365.242
  const epochPerYear = avgSecInYear / (slotTimeInSec * slotsInEpoch);
  const baseRewardPerIncrement =
    (effectiveBalanceIncrement * baseRewardFactor) /
    (totalAtStake * 10e8) ** 0.5;

  // Calculate base reward for full validator (in gwei)
  const baseGweiRewardFullValidator =
    ((validatorDeposit * 10e8) / effectiveBalanceIncrement) *
    baseRewardPerIncrement;

  // Calculate offline per-validator penalty per epoch (in gwei)
  // Note: Inactivity penalty is not included in this simple calculation
  const offlineEpochGweiPentalty =
    baseGweiRewardFullValidator *
    ((weightDenominator - proposerWeight) / weightDenominator);

  // Calculate online per-validator reward per epoch (in gwei)
  const onlineEpochGweiReward =
    baseGweiRewardFullValidator * averageNetworkPctOnline;

  // Calculate net yearly staking reward (in gwei)
  const reward = onlineEpochGweiReward * vaildatorUptime;
  const penalty = offlineEpochGweiPentalty * (1 - vaildatorUptime);
  const netRewardPerYear = epochPerYear * (reward - penalty);

  // Return net yearly staking reward percentage
  return netRewardPerYear / 10e8 / validatorDeposit;
};

export default calculateEth2Rewards;
