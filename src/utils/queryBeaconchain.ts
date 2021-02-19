import axios from 'axios';
import { BEACONCHAIN_URL, ETH_DEPOSIT_OFFSET } from './envVars';

type BeaconchainResponse = {
  data: {
    status: string;
    data: {
      validatorscount: number;
      totalvalidatorbalance: number; // gwei
    };
  };
};

export const queryBeaconchain = async () => {
  try {
    const response: BeaconchainResponse = await axios.get(
      `${BEACONCHAIN_URL}/api/v1/epoch/latest`
    );
    let ethBalance = response.data.data.totalvalidatorbalance * 1e-9;
    ethBalance = +ethBalance.toFixed(0);
    return {
      statusCode: 200,
      body: {
        totalValidators: response.data.data.validatorscount,
        amountEth: ethBalance + ETH_DEPOSIT_OFFSET,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: {
        totalValidators: 0,
        amountEth: 0,
        msg: error.message,
      },
    };
  }
};
