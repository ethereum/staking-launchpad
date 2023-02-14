import React, { useEffect, useState } from 'react';
import { AppBar } from '../../components/AppBar';
import { TestnetNotification } from '../../components/TestnetNotification';
import { Hero } from './Hero';
import { NetworkStatus, NetworkState } from './NetworkStatus';
import { Introduction } from './Introduction';
import { SignupSteps } from './SignupSteps';
import { Upgrades } from './Upgrades';
import {
  fetchTotalStakeAndAPR,
  FetchTotalStakeAndAPRResponse,
} from '../../utils/fetchTotalStakeAndAPR';
import {
  fetchTotalValidators,
  FetchTotalValidatorsResponse,
} from '../../utils/fetchTotalValidators';
import { IS_MAINNET } from '../../utils/envVars';

export const LandingPage = (): JSX.Element => {
  const [state, setState] = useState<NetworkState>({
    amountEth: 0,
    apr: 0,
    totalValidators: 0,
    status: 0,
  });

  useEffect(() => {
    // Fetch Total Stake and APR
    (async () => {
      const response: FetchTotalStakeAndAPRResponse = await fetchTotalStakeAndAPR();
      setState(prev => ({
        ...prev,
        amountEth: response.body.amountEth,
        apr: response.body.apr,
        // TODO: Split out status codes for the separate fetches
      }));
    })();
    // Fetch Total Validators
    (async () => {
      const response: FetchTotalValidatorsResponse = await fetchTotalValidators();
      setState(prev => ({
        ...prev,
        totalValidators: response.body.totalValidators,
        status: response.statusCode,
      }));
    })();
  }, []);

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
