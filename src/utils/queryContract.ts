import axios from "axios";
import { contractAddress } from "../enums";

type infuraResponse = {
  data: {
    jsonrpc: string;
    id: number;
    result: string;
  };
};

if (!process.env.REACT_APP_INFURA_PROJECT_ID) {
  throw new TypeError("Missing INFURA_PROJECT_ID");
}

export const queryContract = async (): Promise<number> => {
  const infuraProjectId = process.env.REACT_APP_INFURA_PROJECT_ID;
  const infuraUrl = `https://goerli.infura.io/v3/${infuraProjectId}`;
  try {
    const response: infuraResponse = await axios.post(
      infuraUrl,
      {
        jsonrpc: "2.0",
        method: "eth_getBalance",
        params: [contractAddress, "latest"],
        id: 1
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
    ethBalance = ethBalance * Math.pow(10, -18);
    ethBalance = +ethBalance.toFixed(1);
    return ethBalance;
  } catch (error) {
    console.log(error);
    return 0;
  }
};
