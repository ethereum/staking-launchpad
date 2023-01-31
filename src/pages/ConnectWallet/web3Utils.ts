import { useEffect, useState } from 'react';
import {
  InjectedConnector,
  InjectedConnector as MetamaskConnector,
} from '@web3-react/injected-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { useWeb3React } from '@web3-react/core';
import { FortmaticConnector } from './fortmaticConnector';
import { web3ReactInterface } from './index';
import {
  FORTMATIC_KEY,
  IS_MAINNET,
  NETWORK_NAME,
  PORTIS_DAPP_ID,
  RPC_URL,
  TESTNET_LAUNCHPAD_NAME,
} from '../../utils/envVars';

export enum NetworkChainId {
  'Mainnet' = 1,
  'Ropsten' = 3,
  'Goerli' = 5,
  'Sepolia' = 11155111,
  'Zhejiang' = 1337803,
}

export const NetworkChainIdDict: { [id: string]: number } = {
  Mainnet: 1,
  Ropsten: 3,
  Goerli: 5,
  Sepolia: 11155111,
  Zhejiang: 1337803,
};

/*
  for UI purposes, all networks are "supported", but an error message
 is displayed when the user is not connected to the "allowed" network
 */

const supportedNetworks = [
  NetworkChainId.Mainnet,
  NetworkChainId.Ropsten,
  NetworkChainId.Goerli,
  NetworkChainId.Sepolia,
];

// FIXME: disabled Portis for now
const portisSupportedNetworks = [
  NetworkChainId.Goerli,
  NetworkChainId.Mainnet,
  NetworkChainId.Ropsten,
];

enum Testnet {
  'Ropsten',
  'Goerli',
  'Sepolia',
  'Zhejiang',
}

enum Mainnet {
  'Mainnet',
}

export const NetworkNameToChainId: { [key: string]: NetworkChainId } = {
  Mainnet: NetworkChainId.Mainnet,
  Ropsten: NetworkChainId.Ropsten,
  Goerli: NetworkChainId.Goerli,
  Zhejiang: NetworkChainId.Zhejiang,
};

export const TARGET_NETWORK_CHAIN_ID = IS_MAINNET
  ? NetworkChainId.Mainnet
  : NetworkNameToChainId[TESTNET_LAUNCHPAD_NAME];

export const IS_GOERLI = TARGET_NETWORK_CHAIN_ID === NetworkChainId.Goerli;

export const AllowedNetworks = IS_MAINNET ? Mainnet : Testnet;

export const AllowedELNetworks = [NETWORK_NAME];
export const metamask: InjectedConnector = new MetamaskConnector({
  supportedChainIds: supportedNetworks,
});

export const portis: PortisConnector = new PortisConnector({
  dAppId: PORTIS_DAPP_ID,
  networks: portisSupportedNetworks,
});

export const fortmatic: FortmaticConnector = new FortmaticConnector({
  apiKey: FORTMATIC_KEY as string,
  chainId: IS_MAINNET ? NetworkChainId.Mainnet : NetworkChainId.Goerli,
  rpcUrl: RPC_URL,
});

// sets up initial call to MM
export function useMetamaskEagerConnect(): boolean {
  const {
    activate: connectTo,
    active: isMetamaskConnected,
  }: web3ReactInterface = useWeb3React();
  const [attempted, setAttempted] = useState(false);

  useEffect(() => {
    const attemptConnection = async () => {
      const isAuthorized: boolean = await metamask.isAuthorized();
      if (isAuthorized) {
        connectTo(metamask, undefined, true).catch(() => setAttempted(true));
      } else {
        setAttempted(true);
      }
    };
    attemptConnection();
  }, [connectTo]);

  useEffect(() => {
    if (!attempted && isMetamaskConnected) setAttempted(true);
  }, [attempted, isMetamaskConnected]);

  return attempted;
}

export function useMetamaskListener(suppress: boolean = false) {
  const { active, error, activate: connectTo } = useWeb3React();

  useEffect((): any => {
    const { ethereum } = window as any;

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const connectToMetamask = () => connectTo(metamask);

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          connectToMetamask();
        }
      };

      ethereum.on('connect', connectToMetamask);
      ethereum.on('chainChanged', connectToMetamask);
      ethereum.on('accountsChanged', handleAccountsChanged);
      ethereum.on('networkChanged', connectToMetamask);

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', connectToMetamask);
          ethereum.removeListener('chainChanged', connectToMetamask);
          ethereum.removeListener('accountsChanged', handleAccountsChanged);
          ethereum.removeListener('networkChanged', connectToMetamask);
        }
      };
    }
  }, [active, error, suppress, connectTo]);
}
