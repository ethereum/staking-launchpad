import React, { useState } from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from '../../store/reducers';
import {
  KeyFileInterface,
  ProgressStep,
  TransactionStatuses,
  updateProgress,
} from '../../store/actions';
import { rainbowMutedColors } from '../../styles/styledComponentsTheme';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { KeyList } from './Keylist';
import { handleTransaction } from './transactionUtils';
import { NetworkChainId } from '../ConnectWallet/web3Utils';
import { web3ReactInterface } from '../ConnectWallet';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';
import { WalletDisconnected } from '../Summary/WalletDisconnected';
import { WrongNetwork } from '../Summary/WrongNetwork';
import { connect } from 'react-redux';
import { AbstractConnector } from '@web3-react/abstract-connector';

const Container = styled.div`
  min-height: 100vh;
  background-color: ${rainbowMutedColors[5]};
`;
const Gutter = styled.div`
  padding: 0 48px;
  display: flex;
  justify-content: center;
`;

const Content = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 30px 0;
`;

interface TransactionsPageProps {
  keyFiles: KeyFileInterface[];
  progress: ProgressStep;
  updateProgress: (step: ProgressStep) => void;
}

const NETWORK_NAME = 'Göerli Testnet';
const NETWORK_ID = NetworkChainId[NETWORK_NAME];

const _TransactionsPage = ({
  keyFiles,
  progress,
}: TransactionsPageProps): JSX.Element => {
  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();
  const [status, setStatus] = useState<TransactionStatuses>(
    TransactionStatuses.READY
  );

  const handleAllTransactionClick = async () =>
    keyFiles.forEach(validator =>
      handleTransaction(
        validator,
        connector as AbstractConnector,
        account,
        setStatus
      )
    );

  // if (progress !== ProgressStep.TRANSACTION_SIGNING)
  //   return routeToCorrectProgressStep(progress);
  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== NETWORK_ID)
    return <WrongNetwork networkName={NETWORK_NAME} />;

  return (
    <Container>
      <AppBar />
      <Gutter>
        <Content>
          <Heading level={2} size="small" color="blueMedium">
            Transactions
          </Heading>
          <Paper className="mt20">
            <Heading level={3} size="small" color="blueMedium">
              Transactions for {keyFiles.length} validators
            </Heading>
            <Text>
              You must sign an individual transaction for each key you created.
            </Text>
            <Text>
              You can initiate these all at once, or sign them individually from
              the keylist below
            </Text>
            <div className="flex center mt30">
              <Button
                width={300}
                rainbow
                label={`Initiate all ${keyFiles.length} transactions`}
                onClick={handleAllTransactionClick}
              />
            </div>
          </Paper>
          <KeyList />
        </Content>
      </Gutter>
    </Container>
  );
};

const mstp = ({ keyFiles, progress }: StoreState) => ({
  keyFiles,
  progress,
});

const mdtp = (dispatch: any) => ({
  updateProgress: (step: ProgressStep): void => {
    dispatch(updateProgress(step));
  },
});

export const TransactionsPage = connect(mstp, mdtp)(_TransactionsPage);
