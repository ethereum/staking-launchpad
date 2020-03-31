import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { connect } from 'react-redux';
import { AbstractConnector } from '@web3-react/abstract-connector';
import _every from 'lodash/every';
import { StoreState } from '../../store/reducers';
import { Heading } from '../../components/Heading';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { KeyList } from './Keylist';
import { handleTransaction } from './transactionUtils';
import { NetworkChainId } from '../ConnectWallet/web3Utils';
import { web3ReactInterface } from '../ConnectWallet';
import { WalletDisconnected } from '../ConnectWallet/WalletDisconnected';
import { WrongNetwork } from '../ConnectWallet/WrongNetwork';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { routeToCorrectWorkflowProgressStep } from '../../utils/RouteToCorrectWorkflowProgressStep';
import {
  DispatchUpdateTransactionStatusType,
  KeyFileInterface,
  TransactionStatus,
  updateTransactionStatus,
} from '../../store/actions/keyFileActions';
import {
  DispatchUpdateWorkflowProgressType,
  updateWorkflowProgress,
  WorkflowProgressStep,
} from '../../store/actions/workflowProgressActions';

const isMainnet = process.env.REACT_APP_IS_MAINNET === 'true';

const NETWORK_ID = isMainnet
  ? NetworkChainId.Mainnet
  : NetworkChainId['Göerli'];

// Prop definitions
interface OwnProps {}
interface StateProps {
  keyFiles: KeyFileInterface[];
  workflowProgress: WorkflowProgressStep;
}
interface DispatchProps {
  dispatchUpdateTransactionStatus: DispatchUpdateTransactionStatusType;
  dispatchUpdateWorkflowProgress: DispatchUpdateWorkflowProgressType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _TransactionsPage = ({
  keyFiles,
  workflowProgress,
  dispatchUpdateTransactionStatus,
  dispatchUpdateWorkflowProgress,
}: Props): JSX.Element => {
  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const [routeToCongratulationsPage, setRouteToCongratulationsPage] = useState(
    false
  );
  const totalTxCount = keyFiles.length;
  const remainingTxCount = keyFiles.filter(
    file => file.transactionStatus === TransactionStatus.READY
  ).length;
  const allTxConfirmed = _every(
    keyFiles.map(file => file.transactionStatus === TransactionStatus.SUCCEEDED)
  );

  const createButtonText = (): string => {
    if (totalTxCount === remainingTxCount)
      return `Initiate all ${totalTxCount} transactions`;
    if (remainingTxCount > 1)
      return `Initiate remaining ${remainingTxCount} transactions`;
    if (remainingTxCount === 1) return `Initiate last transaction`;
    return 'No pending transactions';
  };

  const handleAllTransactionsClick = () =>
    keyFiles.forEach(async validator => {
      if (validator.transactionStatus === TransactionStatus.READY) {
        await handleTransaction(
          validator,
          connector as AbstractConnector,
          account,
          dispatchUpdateTransactionStatus
        );
      }
    });

  if (workflowProgress !== WorkflowProgressStep.TRANSACTION_SIGNING)
    return routeToCorrectWorkflowProgressStep(workflowProgress);

  if (!account || !connector) return <WalletDisconnected />;

  if (chainId !== NETWORK_ID) return <WrongNetwork />;

  if (allTxConfirmed) {
    setTimeout(() => {
      dispatchUpdateWorkflowProgress(WorkflowProgressStep.CONGRATULATIONS);
      setRouteToCongratulationsPage(true);
    }, 3000);
  }
  if (routeToCongratulationsPage)
    return routeToCorrectWorkflowProgressStep(
      WorkflowProgressStep.CONGRATULATIONS
    );

  return (
    <WorkflowPageTemplate title="Transactions">
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          Transactions for {keyFiles.length} validators
        </Heading>
        <Text className="mt20">
          You must sign an individual transaction for each key you created.
        </Text>
        <Text className="mt10">
          You can initiate these all at once, or sign them individually from the
          keylist below
        </Text>
        <div className="flex center mt30">
          <Button
            width={300}
            rainbow
            label={createButtonText()}
            onClick={handleAllTransactionsClick}
            disabled={remainingTxCount === 0}
          />
        </div>
      </Paper>
      <KeyList />
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({
  keyFiles,
  workflowProgress,
}: StoreState): StateProps => ({
  keyFiles,
  workflowProgress,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchUpdateWorkflowProgress: step =>
    dispatch(updateWorkflowProgress(step)),
  dispatchUpdateTransactionStatus: (pubkey, status, txHash) =>
    dispatch(updateTransactionStatus(pubkey, status, txHash)),
});

export const TransactionsPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_TransactionsPage);
