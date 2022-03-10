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
} from '../../utils/envVars';

export enum NetworkChainId {
  'Mainnet' = 1,
  'Ropsten' = 3,
  'Rinkeby' = 4,
  'Göerli' = 5,
  'Kovan' = 42,
  'Kintsugi' = 1337702,
  'Kiln' = 1337802,
}

export const NetworkChainIdDict: { [id: string]: number } = {
  Mainnet: 1,
  Ropsten: 3,
  Rinkeby: 4,
  Göerli: 5,
  Kovan: 42,
  Kintsugi: 1337702,
  Kiln: 1337802,
};

export const TARGET_NETWORK_CHAIN_ID = NetworkChainIdDict[NETWORK_NAME];

/*
  for UI purposes, all networks are "supported", but an error message
 is displayed when the user is not connected to the "allowed" network
 */

const supportedNetworks = [
  NetworkChainId['Göerli'],
  NetworkChainId.Mainnet,
  NetworkChainId.Rinkeby,
  NetworkChainId.Ropsten,
  NetworkChainId.Kovan,
  NetworkChainId.Kintsugi,
  NetworkChainId.Kiln,
];

// FIXME: disabled Portis for now
const portisSupportedNetworks = [
  NetworkChainId['Göerli'],
  NetworkChainId.Mainnet,
  NetworkChainId.Rinkeby,
  NetworkChainId.Ropsten,
  NetworkChainId.Kovan,
];

enum Testnet {
  'Göerli',
  'Kintsugi',
  'Kiln',
}

enum Mainnet {
  'Mainnet',
}

export const AllowedELNetworks = IS_MAINNET ? Mainnet : Testnet;
export const metamask: InjectedConnector = new MetamaskConnector({
  supportedChainIds: supportedNetworks,
});

export const portis: PortisConnector = new PortisConnector({
  dAppId: PORTIS_DAPP_ID,
  networks: portisSupportedNetworks,
});

export const fortmatic: FortmaticConnector = new FortmaticConnector({
  apiKey: FORTMATIC_KEY as string,
  chainId: IS_MAINNET ? NetworkChainId.Mainnet : NetworkChainId['Göerli'],
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
