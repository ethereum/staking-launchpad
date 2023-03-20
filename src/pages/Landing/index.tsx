import React from 'react';
import { AppBar } from '../../components/AppBar';
import { TestnetNotification } from '../../components/TestnetNotification';
import { Hero } from './Hero';
import { NetworkStatus } from './NetworkStatus';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Upgrades } from './Upgrades';
import { IS_MAINNET } from '../../utils/envVars';
import { useBeaconchainData } from '../../hooks/useBeaconchainData';

export const LandingPage = (): JSX.Element => {
  const state = useBeaconchainData();

  return (
    <>
      <AppBar />
      {!IS_MAINNET && <TestnetNotification />}
      <Hero />
      <NetworkStatus {...{ state }} />
      <Introduction />
      <SignupSteps />
      <Upgrades />
    </>
  );
};
