import { useEffect, useState } from 'react';
import {
  InjectedConnector,
  InjectedConnector as MetamaskConnector,
  NoEthereumProviderError,
  UserRejectedRequestError,
} from '@web3-react/injected-connector';
import { PortisConnector } from '@web3-react/portis-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { FortmaticConnector } from './fortmaticConnector';
import { web3ReactInterface } from './index';

export enum NetworkChainId {
  'Ethereum Mainnet' = 1,
  'Ropsten Testnet' = 3,
  'Rinkeby Testnet' = 4,
  'Göerli Testnet' = 5,
  'Kovan Testnet' = 42,
}

/*
  for UI purposes, all networks are "supported", but an error message
 is displayed when the user is not connected to the "allowed" network
 */
const supportedNetworks = [
  NetworkChainId['Göerli Testnet'],
  NetworkChainId['Ethereum Mainnet'],
  NetworkChainId['Rinkeby Testnet'],
  NetworkChainId['Ropsten Testnet'],
  NetworkChainId['Kovan Testnet'],
];

export enum AllowedNetworks {
  'Göerli Testnet', // TODO edit this enum based on .env
}

export const metamask: InjectedConnector = new MetamaskConnector({
  supportedChainIds: supportedNetworks,
});

if (!process.env.REACT_APP_PORTIS_DAPP_ID) {
  throw new TypeError('Missing PORTIS_DAPP_ID');
}
if (!process.env.REACT_APP_FORTMATIC_KEY) {
  throw new TypeError('Missing FORTMATIC_KEY');
}

export const portis: PortisConnector = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_DAPP_ID,
  networks: supportedNetworks,
});

export const fortmatic: FortmaticConnector = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_KEY as string,
  chainId: NetworkChainId['Göerli Testnet'],
  rpcUrl: process.env.REACT_APP_RPC_URL_GOERLI as string,
});

export function getErrorMessage(error: Error): string {
  if (error instanceof NoEthereumProviderError) {
    return 'No Ethereum browser extension detected, install MetaMask.';
  }
  if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network.";
  }
  if (error instanceof UserRejectedRequestError) {
    return 'Please authorize this website to access your Ethereum account.';
  }
  console.error(error);
  return 'An unknown error occurred. Check the console for more details.';
}

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
