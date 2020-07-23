export const IS_MAINNET                 = Boolean(process.env.REACT_APP_IS_MAINNET === 'true');

// private vars (or derived from)
export const PORTIS_DAPP_ID             = process.env.REACT_APP_PORTIS_DAPP_ID     || '';
export const INFURA_PROJECT_ID          = process.env.REACT_APP_INFURA_PROJECT_ID  || '';
export const ENABLE_RPC_FEATURES        = Boolean(INFURA_PROJECT_ID && INFURA_PROJECT_ID !== '');
export const INFURA_URL                 = `https://${IS_MAINNET ? "mainnet" : "goerli"}.infura.io/v3/${INFURA_PROJECT_ID}`;

// public
export const ALETHIO_URL                = IS_MAINNET ? 'https://explorer.aleth.io/tx' : 'https://explorer.goerli.aleth.io/tx';
export const ETHERSCAN_URL              = IS_MAINNET ? 'https://etherscan.io/tx' : 'https://goerli.etherscan.io/tx';
export const BEACONSCAN_URL             = process.env.BEACONSCAN_URL                || "https://beaconscan.com/altona/validator";
export const BEACONCHAIN_URL            = process.env.BEACONCHAIN_URL               || "https://altona.beaconcha.in/validator";
export const FORTMATIC_KEY              = process.env.REACT_APP_FORTMATIC_KEY       || 'pk_test_D113D979E0D3508F';
export const CONTRACT_ADDRESS           = process.env.REACT_APP_CONTRACT_ADDRESS    || '0x07b39f4fde4a38bace212b546dac87c58dfe3fdc';
export const ETH2_NETWORK_NAME          = process.env.REACT_APP_ETH2_NETWORK_NAME   || 'Medalla';
export const CHAIN_NAME                 = process.env.CHAIN_NAME                    || 'Medalla';
export const TICKER_NAME                = process.env.TICKER_NAME                   || 'GöETH';
export const GENESIS_FORK_VERSION       = process.env.REACT_APP_GENESIS_FORK_VERSION|| Buffer.from('00000001', 'hex');

if(process.env.REACT_APP_ETH_REQUIREMENT && Number.isNaN(Number(process.env.REACT_APP_ETH_REQUIREMENT))) {
    throw new Error("REACT_APP_ETH_REQUIREMENT must be of type: number")
}
export const ETH_REQUIREMENT            = process.env.REACT_APP_ETH_REQUIREMENT     || 524288;


if(process.env.REACT_APP_PRICE_PER_VALIDATOR &&  Number.isNaN(Number(process.env.REACT_APP_PRICE_PER_VALIDATOR))) {
    throw new Error("REACT_APP_PRICE_PER_VALIDATOR must be of type: number")
}
export const PRICE_PER_VALIDATOR        = process.env.REACT_APP_PRICE_PER_VALIDATOR || 32;

// BLS signature verification variables
export const ETHER_TO_GWEI              = 1e9;
export const MIN_DEPOSIT_AMOUNT         = 1 * ETHER_TO_GWEI;
export const DOMAIN_DEPOSIT             = Buffer.from('03000000', 'hex');
export const EMPTY_ROOT                 = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');
