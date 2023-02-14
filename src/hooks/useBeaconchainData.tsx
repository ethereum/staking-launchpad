// Import libraries
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
// Utilities + types
import {
  fetchTotalStakeAndAPR,
  FetchTotalStakeAndAPRResponse,
} from '../utils/fetchTotalStakeAndAPR';
import {
  fetchTotalValidators,
  FetchTotalValidatorsResponse,
} from '../utils/fetchTotalValidators';
import { NetworkState } from '../pages/Landing/NetworkStatus';

export const useBeaconchainData = () => {
  const { locale } = useIntl();
  const [state, setState] = useState<NetworkState>({
    amountEth: '',
    apr: '',
    totalValidators: '',
    status: 0,
  });

  const formatPercent = new Intl.NumberFormat(locale, {
    style: 'percent',
    minimumSignificantDigits: 3,
    maximumSignificantDigits: 3,
  });
  const formatNumber = new Intl.NumberFormat(locale);

  useEffect(() => {
    // Fetch Total Stake and APR
    (async () => {
      const response: FetchTotalStakeAndAPRResponse = await fetchTotalStakeAndAPR();
      setState(prev => ({
        ...prev,
        amountEth: formatNumber.format(response.body.amountEth),
        apr: formatPercent.format(response.body.apr),
        // TODO: Split out status codes for the separate fetches
      }));
    })();
    // Fetch Total Validators
    (async () => {
      const response: FetchTotalValidatorsResponse = await fetchTotalValidators();
      setState(prev => ({
        ...prev,
        totalValidators: formatNumber.format(response.body.totalValidators),
        status: response.statusCode,
      }));
    })();
  }, []);
  return { state };
};
