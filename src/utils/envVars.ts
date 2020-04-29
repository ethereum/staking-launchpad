// private vars
export const PORTIS_DAPP_ID: string =
  process.env.REACT_APP_PORTIS_DAPP_ID || '';
export const INFURA_PROJECT_ID: string =
  process.env.REACT_APP_INFURA_PROJECT_ID || '';

// non-private
export const WEB3_POLLING_INTERVAL = 12000;
export const RPC_URL_GOERLI = `https://goerli.infura.io/v3/${INFURA_PROJECT_ID}`;
export const RPC_URL_MAINNET = `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`;
export const FORTMATIC_KEY = 'pk_test_D113D979E0D3508F';
export const ALETHIO_URL = 'https://explorer.goerli.aleth.io/tx';
export const ETHERSCAN_URL = 'https://goerli.etherscan.io/tx';
export const CONTRACT_ADDRESS = '0x4DC8B546b93131309c82505a6fdfB978D311bf45';
export const MAINNET_ETH_REQUIREMENT = 524288;
export const PRICE_PER_VALIDATOR = 3.2;
export const IS_MAINNET = false;
