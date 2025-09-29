export const IS_MAINNET                 = Boolean(process.env.REACT_APP_IS_MAINNET !== 'false');  // If REACT_APP_IS_MAINNET is unset, set it to true by default
export const IS_NON_INFURA_TESTNET      = !IS_MAINNET && process.env.REACT_APP_RPC_URL
export const TESTNET_LAUNCHPAD_NAME     = process.env.REACT_APP_TESTNET_LAUNCHPAD_NAME || 'Hoodi';

// private vars (or derived from)
export const INFURA_PROJECT_ID          = process.env.REACT_APP_INFURA_PROJECT_ID  || '';
export const ENABLE_RPC_FEATURES        = Boolean(INFURA_PROJECT_ID && INFURA_PROJECT_ID !== '');
export const RPC_URL                    = process.env.REACT_APP_RPC_URL ||  (`https://${IS_MAINNET ? "mainnet" : "hoodi"}.infura.io/v3/${INFURA_PROJECT_ID}`);

// public
export const NETWORK_NAME               = IS_MAINNET ? 'Mainnet' : TESTNET_LAUNCHPAD_NAME;
export const TICKER_NAME                = IS_MAINNET ? 'ETH' : `${NETWORK_NAME}ETH`;
export const ETHERSCAN_URL              = IS_MAINNET ? 'https://etherscan.io/tx' : `https://${TESTNET_LAUNCHPAD_NAME.toLowerCase()}.etherscan.io/tx`;
export const BEACONCHAIN_URL            = (IS_NON_INFURA_TESTNET && process.env.REACT_APP_BEACONCHAIN_URL) ||  `https://${NETWORK_NAME.toLowerCase()}.beaconcha.in`;
export const FORTMATIC_KEY              = process.env.REACT_APP_FORTMATIC_KEY       || 'pk_test_D113D979E0D3508F';
export const DEPOSIT_CONTRACT_ADDRESS   = IS_MAINNET ? '0x00000000219ab540356cBB839Cbe05303d7705Fa' : process.env.REACT_APP_CONTRACT_ADDRESS;
export const COMPOUNDING_CONTRACT_ADDRESS = process.env.REACT_APP_COMPOUNDING_CONTRACT_ADDRESS || '0x0000BBdDc7CE488642fb579F8B00f3a590007251'
export const WITHDRAWAL_CONTRACT_ADDRESS = process.env.REACT_APP_WITHDRAWAL_CONTRACT_ADDRESS || '0x00000961Ef480Eb55e80D19ad83579A64c007002'
export const LIGHTHOUSE_INSTALLATION_URL = process.env.REACT_APP_LIGHTHOUSE_INSTALLATION_URL || 'https://lighthouse-book.sigmaprime.io/';
export const NIMBUS_INSTALLATION_URL    = process.env.REACT_APP_NIMBUS_INSTALLATION_URL  || 'https://nimbus.guide/quick-start.html';
export const GRANDINE_INSTALLATION_URL  = process.env.REACT_APP_GRANDINE_INSTALLATION_URL  || 'https://docs.grandine.io/';
export const PRYSM_INSTALLATION_URL     = process.env.REACT_APP_PRYSM_INSTALLATION_URL   || 'https://prysm.offchainlabs.com/docs/install-prysm/install-with-script/';
export const TEKU_INSTALLATION_URL      = process.env.REACT_APP_TEKU_INSTALLATION_URL    || 'https://docs.teku.consensys.io/get-started/install';
export const LODESTAR_INSTALLATION_URL  = process.env.REACT_APP_LODESTAR_INSTALLATION_URL  || 'https://chainsafe.github.io/lodestar/run/getting-started/installation';
export const MAINNET_LAUNCHPAD_URL      = 'https://launchpad.ethereum.org/'
export const TESTNET_LAUNCHPAD_URL      = `https://${TESTNET_LAUNCHPAD_NAME.toLowerCase()}.launchpad.ethereum.org/`

let elExplorerURL                       = 'https://hoodi.etherscan.io';
if (IS_NON_INFURA_TESTNET && process.env.REACT_APP_EL_EXPLORER_URL) {
    elExplorerURL                       = process.env.REACT_APP_EL_EXPLORER_URL;
} else if (IS_MAINNET) {
    elExplorerURL                       = 'https://etherscan.io'
}
export const EL_EXPLORER_URL             = elExplorerURL
export const EL_TRANSACTION_URL         = `${elExplorerURL}/tx`


export const FAUCET_URL                 = process.env.REACT_APP_FAUCET_URL || 'https://hoodi-faucet.pk910.de/'
export const TUTORIAL_URL               = process.env.REACT_APP_TUTORIAL_URL || null;

if(process.env.REACT_APP_ETH_REQUIREMENT && Number.isNaN(Number(process.env.REACT_APP_ETH_REQUIREMENT))) {
    throw new Error("REACT_APP_ETH_REQUIREMENT must be of type: number")
}
export const ETH_REQUIREMENT            = process.env.REACT_APP_ETH_REQUIREMENT     || 524288;

// ETH_DEPOSIT_OFFSET is added to the balance of the deposit contract to account for testnet deposit-contracts that allow some number of free deposit
if(process.env.REACT_APP_ETH_DEPOSIT_OFFSET && Number.isNaN(Number(process.env.REACT_APP_ETH_DEPOSIT_OFFSET))) {
    throw new Error("REACT_APP_ETH_DEPOSIT_OFFSET must be of type: number")
}
export const ETH_DEPOSIT_OFFSET         = Number(process.env.REACT_APP_ETH_DEPOSIT_OFFSET) * Number(!IS_MAINNET) || 0;

let forkVersion                         = Buffer.from('00000000', 'hex')
if(typeof process.env.REACT_APP_GENESIS_FORK_VERSION === 'string'){
    forkVersion                         = Buffer.from(process.env.REACT_APP_GENESIS_FORK_VERSION.replace(/0x/g, ''), 'hex');
}
export const GENESIS_FORK_VERSION       = forkVersion;

if(process.env.REACT_APP_MIN_ACTIVATION_BALANCE && Number.isNaN(Number(process.env.REACT_APP_MIN_ACTIVATION_BALANCE))) {
    throw new Error("REACT_APP_MIN_ACTIVATION_BALANCE must be of type: number")
}
export const MIN_ACTIVATION_BALANCE     = Number(process.env.REACT_APP_MIN_ACTIVATION_BALANCE) || 32;

if(process.env.REACT_APP_MAX_EFFECTIVE_BALANCE && Number.isNaN(Number(process.env.REACT_APP_MAX_EFFECTIVE_BALANCE))) {
    throw new Error("REACT_APP_MAX_EFFECTIVE_BALANCE must be of type: number")
}
export const MAX_EFFECTIVE_BALANCE      = Number(process.env.REACT_APP_MAX_EFFECTIVE_BALANCE) || 2048;

if(process.env.REACT_APP_EJECTION_PRICE && Number.isNaN(Number(process.env.REACT_APP_EJECTION_PRICE))) {
    throw new Error("REACT_APP_EJECTION_PRICE must be of type: number")
}
export const EJECTION_PRICE             = process.env.REACT_APP_EJECTION_PRICE || 16;

if(process.env.REACT_APP_MIN_GENESIS_TIME && Number.isNaN(Number(process.env.REACT_APP_MIN_GENESIS_TIME))) {
    throw new Error("REACT_APP_MIN_GENESIS_TIME must be of type: number")
}
export const BEACON_CHAIN_GENESIS_TIME  = Number(process.env.REACT_APP_MIN_GENESIS_TIME) || 1606824023_000 // 2020-12-01T12:00:23Z
if(process.env.REACT_APP_SHARD_COMMITTEE_PERIOD && Number.isNaN(Number(process.env.REACT_APP_SHARD_COMMITTEE_PERIOD))) {
    throw new Error("REACT_APP_SHARD_COMMITTEE_PERIOD must be of type: number")
}
export const SHARD_COMMITTEE_PERIOD  = Number(process.env.REACT_APP_SHARD_COMMITTEE_PERIOD) || 2 ** 8; // 256 epochs

if(process.env.REACT_APP_SLOTS_PER_EPOCH && Number.isNaN(Number(process.env.REACT_APP_SLOTS_PER_EPOCH))) {
    throw new Error("REACT_APP_SLOTS_PER_EPOCH must be of type: number")
}
export const SLOTS_PER_EPOCH            = Number(process.env.REACT_APP_SLOTS_PER_EPOCH)  || 32 // 2^5

if(process.env.REACT_APP_SECONDS_PER_SLOT && Number.isNaN(Number(process.env.REACT_APP_SECONDS_PER_SLOT))) {
    throw new Error("REACT_APP_SECONDS_PER_SLOT must be of type: number")
}
export const SECONDS_PER_SLOT           = Number(process.env.REACT_APP_SECONDS_PER_SLOT) || 12

export const MS_PER_SLOT                = SECONDS_PER_SLOT * 1000

// BLS signature verification variables
export const ETHER_TO_GWEI              = 1e9;
export const MIN_DEPOSIT_ETHER          = 1;
export const MIN_DEPOSIT_GWEI           = MIN_DEPOSIT_ETHER * ETHER_TO_GWEI;
export const DOMAIN_DEPOSIT             = Buffer.from('03000000', 'hex');
export const EMPTY_ROOT                 = Buffer.from('0000000000000000000000000000000000000000000000000000000000000000', 'hex');

export const BLS_CREDENTIALS            = "0x00";
export const EXECUTION_CREDENTIALS      = "0x01";
export const COMPOUNDING_CREDENTIALS    = "0x02";

// Boolean to translate CLI command flags, or keep in English
export const TRANSLATE_CLI_FLAGS        = process.env.REACT_APP_TRANSLATE_CLI_FLAGS === 'true';

// https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validator__indexOrPubkey_
if(process.env.REACT_APP_MAX_QUERY_LIMIT && Number.isNaN(Number(process.env.REACT_APP_MAX_QUERY_LIMIT))) {
    throw new Error("REACT_APP_MAX_QUERY_LIMIT must be of type: number")
}
export const MAX_QUERY_LIMIT            = Number(process.env.REACT_APP_MAX_QUERY_LIMIT) || 100;
export const COMPOUNDING_FEE_ADDITION   = Number(process.env.REACT_APP_COMPOUNDING_FEE_ADDITION) || 3;
export const WITHDRAWAL_FEE_ADDITION    = Number(process.env.REACT_APP_WITHDRAWAL_FEE_ADDITION) || 6;
export const EXCESS_INHIBITOR           = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
