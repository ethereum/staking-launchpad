import React, { useEffect, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { MergeNotification } from '../../components/MergeNotification';
import { TestnetNotification } from '../../components/TestnetNotification';
import { Hero } from './Hero';
import { NetworkStatus } from './NetworkStatus';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Upgrades } from './Upgrades';
import { queryBeaconchain } from '../../utils/queryBeaconchain';
import { IS_MAINNET } from '../../utils/envVars';

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
      {!IS_MAINNET && <TestnetNotification />}
      <MergeNotification />
      <Hero />
      <NetworkStatus {...{ state }} />
      <Introduction />
      <SignupSteps />
      <Upgrades />
    </>
  );
};
