import React, { useEffect, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { Hero } from './Hero';
import { NetworkStatus } from './NetworkStatus';
import { StakingRewards } from './StakingRewards';
import { TimelineMileStones } from './TimelineMilestones';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Phases } from './Phases';
import { queryContract } from '../../utils/queryContract';
import { ENABLE_RPC_FEATURES } from '../../utils/envVars';
import useMobileCheck from '../../hooks/useMobileCheck';

export const LandingPage = (): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);

  const mobile = useMobileCheck('800px');

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
      {!mobile && <AppBar />}
      <Hero />
      <NetworkStatus {...{ amountEth }} />
      <StakingRewards currentStaked={amountEth} />
      <TimelineMileStones />
      <Introduction />
      <SignupSteps />
      <Phases />
    </>
  );
};
