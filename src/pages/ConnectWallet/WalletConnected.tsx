import React from 'react';
import { Box, Heading, Text } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { fortmatic, metamask, portis } from './web3Utils';
import { web3ReactInterface } from './index';
import { Paper } from '../../components/Paper';
import { Dot } from '../../components/Dot';

interface Props {
  network: string;
  networkAllowed: boolean;
}

export const WalletConnected = ({ network, networkAllowed }: Props) => {
  const {
    account,
    connector: walletProvider,
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  const getWalletName = (provider?: AbstractConnector) => {
    if (!provider) return '';
    if (provider === metamask) return 'Metamask';
    if (provider === portis) return 'Portis';
    if (provider === fortmatic) return 'Fortmatic';
    return '';
  };

  return (
    <div>
      <Paper>
        <Heading level={3} size="small" color="blueDark" className="mt0">
          {getWalletName(walletProvider)}
        </Heading>
        <Box className="flex flex-row">
          <Dot success={networkAllowed} error={!networkAllowed} />
          <Text className="ml10">{account}</Text>
        </Box>
        <Text
          className="mt10 ml30"
          color={networkAllowed ? 'greenDark' : 'redMedium'}
        >
          {network}
        </Text>
      </Paper>
    </div>
  );
};
