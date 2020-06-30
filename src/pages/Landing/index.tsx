import React, { useEffect, useState } from 'react';
import { Hero } from './Hero';
import { NetworkStatus } from './NetworkStatus';
import { StakingRewards } from './StakingRewards';
import { TimelineMileStones } from './TimelineMilestones';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Phases } from './Phases';
import { CTAFooter } from './CTAFooter';
import { queryContract } from '../../utils/queryContract';
import { ENABLE_RPC_FEATURES } from '../../utils/envVars';

export const LandingPage = (): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);

  useEffect(() => {
    if (ENABLE_RPC_FEATURES) {
      const getBalance = async () => {
        const ethBalance = await queryContract();
        setAmountEth(ethBalance);
      };
      getBalance();
    }
  });

  return (
    <>
      <Hero />
      <NetworkStatus {...{ amountEth }} />
      <StakingRewards currentStaked={amountEth} />
      <TimelineMileStones />
      <Introduction />
      <SignupSteps />
      <Phases />
      <CTAFooter />
    </>
  );
};
