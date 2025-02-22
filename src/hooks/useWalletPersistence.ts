import { useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import { InjectedConnector } from '@web3-react/injected-connector';
import { Web3Provider } from '@ethersproject/providers';

const WALLET_CONNECTED_KEY = 'walletConnected';
const LAST_WALLET_KEY = 'lastWalletType';

export const injected = new InjectedConnector({
  supportedChainIds: [1, 5, 11155111] // mainnet, goerli, sepolia
});

export function useWalletPersistence() {
  const { activate, active, account, deactivate } = useWeb3React<Web3Provider>();

  // Try to reconnect on mount
  useEffect(() => {
    const wasConnected = localStorage.getItem(WALLET_CONNECTED_KEY) === 'true';
    const lastWallet = localStorage.getItem(LAST_WALLET_KEY);

    if (wasConnected && lastWallet === 'injected') {
      injected.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          activate(injected, undefined, true).catch(() => {
            localStorage.removeItem(WALLET_CONNECTED_KEY);
            localStorage.removeItem(LAST_WALLET_KEY);
          });
        }
      });
    }
  }, [activate]);

  // Update persistence when connection status changes
  useEffect(() => {
    if (active && account) {
      localStorage.setItem(WALLET_CONNECTED_KEY, 'true');
      localStorage.setItem(LAST_WALLET_KEY, 'injected');
    } else {
      localStorage.removeItem(WALLET_CONNECTED_KEY);
      localStorage.removeItem(LAST_WALLET_KEY);
    }
  }, [active, account]);

  // Monitor wallet connection status
  useEffect(() => {
    const checkConnection = async () => {
      if (active && account) {
        try {
          const isStillAuthorized = await injected.isAuthorized();
          if (!isStillAuthorized) {
            deactivate();
            localStorage.removeItem(WALLET_CONNECTED_KEY);
            localStorage.removeItem(LAST_WALLET_KEY);
          }
        } catch (error) {
          console.error('Failed to check wallet authorization:', error);
        }
      }
    };

    const interval = setInterval(checkConnection, 5000);
    return () => clearInterval(interval);
  }, [active, account, deactivate]);

  return { activate, deactivate };
}
