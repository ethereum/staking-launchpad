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

  useEffect(() => {
    // Number formatters
    const formatPercent = (value: number): string =>
      new Intl.NumberFormat(locale, {
        style: 'percent',
        minimumSignificantDigits: 3,
        maximumSignificantDigits: 3,
      }).format(value);
    const formatNumber = (value: number): string =>
      new Intl.NumberFormat(locale).format(value);

    // Fetch Total Stake and APR
    (async () => {
      const {
        body: { amountEth, apr },
        statusCode,
      }: FetchTotalStakeAndAPRResponse = await fetchTotalStakeAndAPR();
      setState(prev => ({
        ...prev,
        amountEth: formatNumber(amountEth),
        apr: formatPercent(apr),
        // Status Code: 0 default, bumps to 200 if successful, 500 if error
        // This approach accounts for an error on either endpoint
        status: Math.max(statusCode, prev.status),
      }));
    })();
    // Fetch Total Validators
    (async () => {
      const {
        body: { totalValidators },
        statusCode,
      }: FetchTotalValidatorsResponse = await fetchTotalValidators();
      setState(prev => ({
        ...prev,
        totalValidators: formatNumber(totalValidators),
        status: Math.max(statusCode, prev.status),
      }));
    })();
  }, [locale]);
  return { state };
};
