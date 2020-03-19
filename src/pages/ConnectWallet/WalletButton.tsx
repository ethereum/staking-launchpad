import React from 'react';
import { Button, Heading, Text } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { getErrorMessage } from './web3Utils';
import { Paper } from '../../components/Paper';

export const WalletButton = ({
  title,
  walletProvider,
  error,
}: {
  title: string;
  walletProvider: any;
  error: Error | undefined;
}) => {
  const { activate } = useWeb3React<Web3Provider>();
  const handleClick = () => activate(walletProvider);

  return (
    <Paper className="m10">
      <Heading level={3} size="small" color="blueDark">
        {title}
      </Heading>
      <Button primary onClick={handleClick} label="CONNECT" />
      {error && (
        <Text textAlign="center" className="mt10" color="error">
          {getErrorMessage(error)}
        </Text>
      )}
    </Paper>
  );
};
