import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar } from '../../components/AppBar';
import { Hero } from './Hero';
import { NetworkStatus } from './NetworkStatus';
import { StakingRewards } from './StakingRewards';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Upgrades } from './Upgrades';
import { queryContract } from '../../utils/queryContract';
import { ENABLE_RPC_FEATURES } from '../../utils/envVars';

export const LandingPage = (): JSX.Element => {
  const [amountEth, setAmountEth] = useState(0);
  const [totalValidators, setTotalValidators] = useState(0);

  useEffect(() => {
    if (ENABLE_RPC_FEATURES) {
      const getBalance = async () => {
        const ethBalance = await queryContract();
        setAmountEth(ethBalance);
      };
      getBalance();

      const getValidators = async () => {
        try {
          const { data } = await axios.get('/.netlify/functions/infura');
          setTotalValidators(data.totalValidators);
        } catch (error) {
          console.error(error);
          setTotalValidators(amountEth / 32);
        }
      };
      getValidators();
    }
  });

  return (
    <>
      <AppBar />
      <Hero />
      <NetworkStatus {...{ amountEth, totalValidators }} />
      <StakingRewards currentStaked={amountEth} />
      <Introduction />
      <SignupSteps />
      <Upgrades />
    </>
  );
};
