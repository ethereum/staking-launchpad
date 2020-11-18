export const IS_MAINNET                 = Boolean(process.env.REACT_APP_IS_MAINNET !== 'false');  // If REACT_APP_IS_MAINNET is unset, set it to true by default

// private vars (or derived from)
export const PORTIS_DAPP_ID             = process.env.REACT_APP_PORTIS_DAPP_ID     || '';
export const INFURA_PROJECT_ID          = process.env.REACT_APP_INFURA_PROJECT_ID  || '';
export const ENABLE_RPC_FEATURES        = Boolean(INFURA_PROJECT_ID && INFURA_PROJECT_ID !== '');
export const INFURA_URL                 = `https://${IS_MAINNET ? "mainnet" : "goerli"}.infura.io/v3/${INFURA_PROJECT_ID}`;

// public
export const ETH2_NETWORK_NAME          = process.env.REACT_APP_ETH2_NETWORK_NAME   || 'Mainnet';
export const TICKER_NAME                = IS_MAINNET ? 'ETH' : 'GöETH';
export const ETHERSCAN_URL              = IS_MAINNET ? 'https://etherscan.io/tx' : 'https://goerli.etherscan.io/tx';
export const BEACONSCAN_URL             = IS_MAINNET ? 'https://beaconscan.com/validator' : `https://beaconscan.com/${ETH2_NETWORK_NAME.toLowerCase()}/validator`;
export const BEACONCHAIN_URL            = `https://${ETH2_NETWORK_NAME.toLowerCase()}.beaconcha.in/validator`;
export const FORTMATIC_KEY              = process.env.REACT_APP_FORTMATIC_KEY       || 'pk_test_D113D979E0D3508F';
export const CONTRACT_ADDRESS           = process.env.REACT_APP_CONTRACT_ADDRESS    || '0x00000000219ab540356cBB839Cbe05303d7705Fa';
export const MIN_DEPOSIT_CLI_VERSION    = process.env.REACT_APP_MIN_DEPOSIT_CLI_VERSION  || '1.0.0';
export const LIGHTHOUSE_INSTALLATION_URL = process.env.REACT_APP_LIGHTHOUSE_INSTALLATION_URL || 'https://lighthouse-book.sigmaprime.io/';
export const NIMBUS_INSTALLATION_URL    = process.env.REACT_APP_NIMBUS_INSTALLATION_URL  || 'https://status-im.github.io/nimbus-eth2/intro.html';
export const PRYSM_INSTALLATION_URL     = process.env.REACT_APP_PRYSM_INSTALLATION_URL   || 'https://docs.prylabs.network/docs/install/install-with-script';
export const TEKU_INSTALLATION_URL      = process.env.REACT_APP_TEKU_INSTALLATION_URL    || 'https://docs.teku.pegasys.tech/en/latest/HowTo/Get-Started/Build-From-Source/';

if(process.env.REACT_APP_ETH_REQUIREMENT && Number.isNaN(Number(process.env.REACT_APP_ETH_REQUIREMENT))) {
    throw new Error("REACT_APP_ETH_REQUIREMENT must be of type: number")
}
export const ETH_REQUIREMENT            = process.env.REACT_APP_ETH_REQUIREMENT     || 524288;

let forkVersion = Buffer.from('00000000', 'hex')
if(typeof process.env.REACT_APP_GENESIS_FORK_VERSION === 'string'){
    forkVersion = Buffer.from(process.env.REACT_APP_GENESIS_FORK_VERSION.replace(/0x/g, ''), 'hex');
}
export const GENESIS_FORK_VERSION = forkVersion;


if(process.env.REACT_APP_PRICE_PER_VALIDATOR && Number.isNaN(Number(process.env.REACT_APP_PRICE_PER_VALIDATOR))) {
    throw new Error("REACT_APP_PRICE_PER_VALIDATOR must be of type: number")
}
export const PRICE_PER_VALIDATOR        = process.env.REACT_APP_PRICE_PER_VALIDATOR || 32;

// BLS signature verification variables
export const ETHER_TO_GWEI              = 1e9;
export const MIN_DEPOSIT_AMOUNT         = 1 * ETHER_TO_GWEI;
export const DOMAIN_DEPOSIT             = Buffer.from('03000000', 'hex');
export const EMPTY_ROOT                 = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');
