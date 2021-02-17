import axios, { AxiosRequestConfig } from 'axios';
import { INFURA_BEACON_URL } from '../utils/envVars';

type InfuraResponse = {
  data: {
    data: [
      {
        index: string;
        balance: string;
      }
    ];
  };
};

const handler = async () => {
  try {
    const config: AxiosRequestConfig = {
      auth: {
        username: process.env.REACT_APP_INFURA_ETH2_PROJECT_ID!,
        password: process.env.REACT_APP_INFURA_ETH2_PROJECT_SECRET!,
      },
    };
    const response: InfuraResponse = await axios.get(INFURA_BEACON_URL, config);
    return {
      statusCode: 200,
      body: JSON.stringify({ totalValidators: response.data.data.length }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ totalValidators: 0, msg: error.message }),
    };
  }
};

module.exports = { handler };
