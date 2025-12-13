import axios from 'axios';
import { getBeaconchainV1ApiUrl } from './getBeaconchainV1ApiUrl';

interface EpochData {
  data: {
    validatorscount: number;
  };
}
export interface FetchTotalValidatorsResponse {
  statusCode: number;
  body: {
    totalValidators: number;
    msg?: unknown;
  };
}

export const fetchTotalValidators = async (): Promise<FetchTotalValidatorsResponse> => {
  const endpoint = getBeaconchainV1ApiUrl('epoch/latest');
  try {
    const response = await axios.get<EpochData>(endpoint);
    if (response.status !== 200) throw new Error(response.statusText);
    const { data } = response;
    const { validatorscount: totalValidators } = data.data;
    return { statusCode: 200, body: { totalValidators } };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    return {
      statusCode: 500,
      body: {
        totalValidators: 0,
        msg: error,
      },
    };
  }
};
