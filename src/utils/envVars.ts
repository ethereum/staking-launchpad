if (!process.env.REACT_APP_PORTIS_DAPP_ID) {
  throw new TypeError('Missing REACT_APP_PORTIS_DAPP_ID');
}
if (!process.env.REACT_APP_INFURA_PROJECT_ID) {
  throw new TypeError('Missing REACT_APP_INFURA_PROJECT_ID');
}
if (!process.env.REACT_APP_FORTMATIC_KEY) {
  throw new TypeError('Missing REACT_APP_FORTMATIC_KEY');
}
if (!process.env.REACT_APP_WEB3_POLLING_INTERVAL) {
  throw new TypeError('Missing REACT_APP_WEB3_POLLING_INTERVAL');
}
if (!process.env.REACT_APP_RPC_URL_GOERLI) {
  throw new TypeError('Missing REACT_APP_RPC_URL_GOERLI');
}
if (!process.env.REACT_APP_RPC_URL_MAINNET) {
  throw new TypeError('Missing REACT_APP_RPC_URL_MAINNET');
}
if (!process.env.REACT_APP_ALETHIO_URL) {
  throw new TypeError('Missing REACT_APP_ALETHIO_URL');
}
if (!process.env.REACT_APP_ETHERSCAN_URL) {
  throw new TypeError('Missing REACT_APP_ETHERSCAN_URL');
}
if (!process.env.REACT_APP_CONTRACT_ADDRESS) {
  throw new TypeError('Missing REACT_APP_CONTRACT_ADDRESS');
}
if (!process.env.REACT_APP_MAINNET_ETH_REQUIREMENT) {
  throw new TypeError('Missing REACT_APP_MAINNET_ETH_REQUIREMENT');
}
if (!process.env.REACT_APP_PRICE_PER_VALIDATOR) {
  throw new TypeError('Missing REACT_APP_PRICE_PER_VALIDATOR');
}
if (!process.env.REACT_APP_IS_MAINNET) {
  throw new TypeError('Missing REACT_APP_IS_MAINNET');
}

export const PORTIS_DAPP_ID: string = process.env.REACT_APP_PORTIS_DAPP_ID;
export const INFURA_PROJECT_ID: string =
  process.env.REACT_APP_INFURA_PROJECT_ID;
export const FORTMATIC_KEY: string = process.env.REACT_APP_FORTMATIC_KEY;
export const WEB3_POLLING_INTERVAL: number = Number(
  process.env.REACT_APP_WEB3_POLLING_INTERVAL
);
export const RPC_URL_GOERLI: string = process.env.REACT_APP_RPC_URL_GOERLI;
export const RPC_URL_MAINNET: string = process.env.REACT_APP_RPC_URL_MAINNET;
export const ALETHIO_URL: string = process.env.REACT_APP_ALETHIO_URL;
export const ETHERSCAN_URL: string = process.env.REACT_APP_ETHERSCAN_URL;
export const CONTRACT_ADDRESS: string = process.env.REACT_APP_CONTRACT_ADDRESS;
export const MAINNET_ETH_REQUIREMENT: number = Number(
  process.env.REACT_APP_MAINNET_ETH_REQUIREMENT
);
export const PRICE_PER_VALIDATOR: number = Number(
  process.env.REACT_APP_PRICE_PER_VALIDATOR
);
export const IS_MAINNET: boolean = process.env.REACT_APP_IS_MAINNET === 'true';
