import React from 'react';
import { connect } from 'react-redux';
import { Box, Heading, Text } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import {
  AllowedNetworks,
  fortmatic,
  metamask,
  NetworkChainId,
  portis,
} from './web3Utils';
import { web3ReactInterface } from './index';
import { ProgressStep, updateProgress } from '../../store/actions';
import { Paper } from '../../components/Paper';
import { Dot } from '../../components/Dot';
import { Button } from '../../components/Button';
import { routesEnum } from '../../Routes';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Link } from '../../components/Link';
import { StoreState } from '../../store/reducers';

const _WalletConnected = ({
  progress,
  updateProgress,
}: {
  progress: ProgressStep;
  updateProgress: (step: ProgressStep) => void;
}) => {
  const {
    account,
    chainId,
    connector: walletProvider,
    deactivate,
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  let network;
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = Object.values(AllowedNetworks).includes(network);
  }

  const handleSubmit = () => {
    if (progress === ProgressStep.CONNECT_WALLET) {
      updateProgress(ProgressStep.SUMMARY);
    }
  };

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
      <Box align="center" pad="large">
        {!networkAllowed && (
          <Text className="mb10">Please connect to Göerli Testnet</Text>
        )}
        <div className="flex">
          <Button
            width={300}
            onClick={deactivate}
            label="Connect a different wallet"
            className="mr10"
            color="blueDark"
          />
          <Link to={routesEnum.summaryPage} onClick={handleSubmit}>
            <Button
              width={300}
              rainbow
              disabled={!networkAllowed}
              label="Continue on testnet"
            />
          </Link>
        </div>
      </Box>
    </div>
  );
};

const mstp = ({ progress }: StoreState) => ({
  progress,
});
const mdtp = (dispatch: any) => ({
  updateProgress: (step: ProgressStep): void => dispatch(updateProgress(step)),
});

export const WalletConnected = connect(mstp, mdtp)(_WalletConnected);
