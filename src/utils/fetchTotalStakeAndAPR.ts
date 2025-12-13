import axios from 'axios';
import { ETH_DEPOSIT_OFFSET } from './envVars';
import { getBeaconchainV1ApiUrl } from './getBeaconchainV1ApiUrl';

interface EthstoreData {
  data: {
    apr: number;
    // eslint-disable-next-line camelcase
    effective_balances_sum_wei: number;
  };
}
export interface FetchTotalStakeAndAPRResponse {
  statusCode: number;
  body: {
    amountEth: number;
    apr: number;
    msg?: unknown;
  };
}
export const fetchTotalStakeAndAPR = async (): Promise<FetchTotalStakeAndAPRResponse> => {
  const endpoint = getBeaconchainV1ApiUrl('ethstore/latest');
  try {
    const response = await axios.get<EthstoreData>(endpoint);
    if (response.status !== 200) throw new Error(response.statusText);
    const { data } = response;
    const { apr, effective_balances_sum_wei: totalWei } = data.data;
    const amountEth = +(totalWei * 1e-18 + ETH_DEPOSIT_OFFSET).toFixed(0);

    return { statusCode: 200, body: { amountEth, apr } };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      statusCode: 500,
      body: {
        amountEth: 0,
        apr: 0,
        msg: error,
      },
    };
  }
};
