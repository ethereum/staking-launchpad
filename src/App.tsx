import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Box, Grommet } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Routes } from './Routes';
import { NetworkStatus } from './components/NetworkStatus';
import { WhatsNew } from './components/WhatsNew';
import { PhishingProtection } from './components/PhishingProtection';
import { useWalletPersistence } from './hooks/useWalletPersistence';
import { theme } from './styles/theme';

export const App: React.FC = () => {
  useWalletPersistence();
  const { active } = useWeb3React<Web3Provider>();

  return (
    <Grommet theme={theme} full>
      <Router>
        <Box fill>
          <PhishingProtection />
          <Routes />
          {active && <NetworkStatus />}
          <WhatsNew />
        </Box>
      </Router>
    </Grommet>
  );
};
