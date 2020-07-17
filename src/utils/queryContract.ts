import axios from 'axios';
import { CONTRACT_ADDRESS, INFURA_URL } from './envVars';

type infuraResponse = {
  data: {
    jsonrpc: string;
    id: number;
    result: string;
  };
};

export const queryContract = async () => {
  try {
    const response: infuraResponse = await axios.post(
      INFURA_URL,
      {
        jsonrpc: '2.0',
        method: 'eth_getBalance',
        params: [CONTRACT_ADDRESS, 'latest'],
        id: 1,
      }
      // TODO figure out how to authenticate with the infura secret key. will require CORS pre-flight workaround
      // {
      //   auth: {
      //     username: "a7e47ce2f3754026ada1ea69a7e17796",
      //     password: "a7e47ce2f3754026ada1ea69a7e17796"
      //   }
      // }
    );
    const hex: string = response.data.result;
    let ethBalance;
    ethBalance = parseInt(hex, 16);
    // eslint-disable-next-line no-restricted-properties
    ethBalance *= Math.pow(10, -18);
    ethBalance = +ethBalance.toFixed(1);
    return ethBalance;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
