import React from 'react';
import styled from 'styled-components';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from '../../store/reducers';
import {
  KeyFileInterface,
  ProgressStep,
  TransactionStatuses,
  updateProgress,
  updateTransactionStatus,
} from '../../store/actions';
import { rainbowLightColors } from '../../styles/styledComponentsTheme';
import { AppBar } from '../../components/AppBar';
import { Heading } from '../../components/Heading';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { KeyList } from './Keylist';
import { handleTransaction } from './transactionUtils';
import { NetworkChainId } from '../ConnectWallet/web3Utils';
import { web3ReactInterface } from '../ConnectWallet';
import { WalletDisconnected } from '../Summary/WalletDisconnected';
import { WrongNetwork } from '../Summary/WrongNetwork';
import { connect } from 'react-redux';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';

interface TransactionsPageProps {
  keyFiles: KeyFileInterface[];
  progress: ProgressStep;
  updateProgress: (step: ProgressStep) => void;
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatuses
  ) => void;
}

const NETWORK_NAME = 'Göerli Testnet';
const NETWORK_ID = NetworkChainId[NETWORK_NAME];

const _TransactionsPage = ({
  keyFiles,
  progress,
  updateTransactionStatus,
}: TransactionsPageProps): JSX.Element => {
  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const totalTxCount = keyFiles.length;
  const remainingTxCount = keyFiles.filter(
    file => file.transactionStatus === TransactionStatuses.READY
  ).length;
  console.log('reaminging: ', remainingTxCount);

  const createButtonText = (): string => {
    if (totalTxCount === remainingTxCount)
      return `Initiate all ${totalTxCount} transactions`;
    if (remainingTxCount > 1)
      return `Initiate remaining ${remainingTxCount} transactions`;
    if (remainingTxCount === 1) return `Initiate last transaction`;
    return 'No pending transactions';
  };

  const handleAllTransactionClick = async () =>
    keyFiles.forEach(validator => {
      if (validator.transactionStatus === TransactionStatuses.READY) {
        handleTransaction(
          validator,
          connector as AbstractConnector,
          account,
          updateTransactionStatus
        );
      }
    });

  // if (progress !== ProgressStep.TRANSACTION_SIGNING)
  //   return routeToCorrectProgressStep(progress);
  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== NETWORK_ID)
    return <WrongNetwork networkName={NETWORK_NAME} />;

  return (
    <WorkflowPageTemplate
      title="Transactions"
      backgroundColor={rainbowLightColors[ProgressStep.TRANSACTION_SIGNING]}
    >
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          Transactions for {keyFiles.length} validators
        </Heading>
        <Text>
          You must sign an individual transaction for each key you created.
        </Text>
        <Text>
          You can initiate these all at once, or sign them individually from the
          keylist below
        </Text>
        <div className="flex center mt30">
          <Button
            width={300}
            rainbow
            label={createButtonText()}
            onClick={handleAllTransactionClick}
            disabled={remainingTxCount === 0}
          />
        </div>
      </Paper>
      <KeyList />
    </WorkflowPageTemplate>
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
  updateTransactionStatus: (
    pubkey: string,
    status: TransactionStatuses
  ): void => {
    dispatch(updateTransactionStatus(pubkey, status));
  },
});

export const TransactionsPage = connect(mstp, mdtp)(_TransactionsPage);
