import React, { useEffect, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { Hero } from './Hero';
import { NetworkStatus } from './NetworkStatus';
import { StakingRewards } from './StakingRewards';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Upgrades } from './Upgrades';
import { queryBeaconchain } from '../../utils/queryBeaconchain';

export const LandingPage = (): JSX.Element => {
  const [state, setState] = useState({
    amountEth: 0,
    totalValidators: 0,
    status: 0,
  });

  useEffect(() => {
    (async () => {
      const response = await queryBeaconchain();
      setState({
        amountEth: response.body.amountEth,
        totalValidators: response.body.totalValidators,
        status: response.statusCode,
      });
    })();
  }, []);

  return (
    <>
      <AppBar />
      <Hero />
      <NetworkStatus {...{ state }} />
      <StakingRewards currentStaked={state.amountEth} />
      <Introduction />
      <SignupSteps />
      <Upgrades />
    </>
  );
};
