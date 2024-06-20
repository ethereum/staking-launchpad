import React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import { AbstractConnector } from '@web3-react/abstract-connector';
import _every from 'lodash/every';
import _some from 'lodash/some';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { routesEnum } from '../../Routes';
import { KeyList } from './Keylist';
import { handleMultipleTransactions } from './transactionUtils';
import { TARGET_NETWORK_CHAIN_ID } from '../ConnectWallet/web3Utils';
import { web3ReactInterface } from '../ConnectWallet';
import { WalletDisconnected } from '../ConnectWallet/WalletDisconnected';
import { WrongNetwork } from '../ConnectWallet/WrongNetwork';
import {
  DepositStatus,
  DispatchTransactionStatusUpdateType,
  TransactionStatus,
  updateTransactionStatus,
} from '../../store/actions/depositFileActions';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 30px;
  margin-top: 20px;
  gap: 10px;
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
}
interface DispatchProps {
  dispatchTransactionStatusUpdate: DispatchTransactionStatusUpdateType;
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _TransactionsPage = ({
  depositKeys,
  workflow,
  dispatchTransactionStatusUpdate,
  dispatchWorkflowUpdate,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const totalTxCount = depositKeys.filter(
    key => key.depositStatus !== DepositStatus.ALREADY_DEPOSITED
  ).length;

  const remainingTxCount = depositKeys.filter(
    file =>
      file.depositStatus !== DepositStatus.ALREADY_DEPOSITED &&
      (file.transactionStatus === TransactionStatus.READY ||
        file.transactionStatus === TransactionStatus.REJECTED)
  ).length;

  const allTxConfirmed = _every(
    depositKeys.map(
      file => file.transactionStatus === TransactionStatus.SUCCEEDED
    )
  );

  const oneTxConfirmed = _some(
    depositKeys.map(
      file => file.transactionStatus === TransactionStatus.SUCCEEDED
    )
  );

  const createButtonText = (): string => {
    if (totalTxCount === 1) {
      return formatMessage({ defaultMessage: 'Send deposit' });
    }
    if (totalTxCount === remainingTxCount && totalTxCount > 0) {
      return formatMessage(
        {
          defaultMessage: `Send all {totalTxCount} deposits`,
        },
        { totalTxCount }
      );
    }
    if (remainingTxCount > 1) {
      return formatMessage(
        {
          defaultMessage: `Send remaining {remainingTxCount} deposits`,
        },
        { remainingTxCount }
      );
    }
    if (remainingTxCount === 1) {
      return formatMessage({ defaultMessage: `Send last deposit` });
    }
    return formatMessage({ defaultMessage: 'No pending deposits' });
  };

  const createContinueButtonText = (): string => {
    if (!oneTxConfirmed) {
      return formatMessage({ defaultMessage: 'Continue' });
    }
    return allTxConfirmed
      ? formatMessage({ defaultMessage: 'Continue' })
      : formatMessage({
          defaultMessage: 'Continue without all transactions confirmed',
        });
  };

  const handleAllTransactionsClick = () => {
    handleMultipleTransactions(
      depositKeys.filter(
        key => key.depositStatus !== DepositStatus.ALREADY_DEPOSITED
      ),
      connector as AbstractConnector,
      account,
      dispatchTransactionStatusUpdate
    );
  };

  const handleSubmit = () => {
    if (workflow === WorkflowStep.TRANSACTION_SIGNING) {
      dispatchWorkflowUpdate(WorkflowStep.CONGRATULATIONS);
    }
  };

  if (workflow < WorkflowStep.TRANSACTION_SIGNING) {
    return routeToCorrectWorkflowStep(workflow);
  }

  if (!account || !connector) return <WalletDisconnected />;

  if (chainId !== TARGET_NETWORK_CHAIN_ID) return <WrongNetwork />;

  return (
    <WorkflowPageTemplate
      title={formatMessage({ defaultMessage: 'Transactions' })}
    >
      <Paper className="mt20">
        {depositKeys.find(
          k => k.transactionStatus === TransactionStatus.LEDGER_ERROR
        ) && (
          <Alert variant="error" className="mb20">
            <FormattedMessage
              defaultMessage="There was a problem trying to sign with your Ledger device. Please verify your Ledger
              device has both {blindSigning} and {debugData} set to {enabled}. These can be accessed by selecting
              the Ethereum application and then entering the {settings} menu."
              values={{
                blindSigning: <strong>Blind Signing</strong>,
                debugData: <strong>Debug Data</strong>,
                enabled: <strong>Enabled</strong>,
                settings: <strong>Settings</strong>,
              }}
            />
          </Alert>
        )}
        <Heading level={3} size="small" color="blueMedium">
          {depositKeys.length === 1 ? (
            <FormattedMessage defaultMessage="Confirm deposit" />
          ) : (
            <FormattedMessage
              defaultMessage="Confirm deposits ({depositKeys})"
              values={{ depositKeys: depositKeys.length }}
            />
          )}
        </Heading>
        {depositKeys.length === 1 && (
          <Text className="mt20">
            <FormattedMessage defaultMessage="Submit a transaction to finish your deposit." />
          </Text>
        )}
        {depositKeys.length > 1 && (
          <>
            <Text className="mt20">
              <FormattedMessage defaultMessage="You must sign a transaction for every deposit you want to make." />
            </Text>
            <Text className="mt10">
              <FormattedMessage defaultMessage="You can start all the transactions at once, or start them individually." />
            </Text>
          </>
        )}
        {depositKeys.length >= 1 && <KeyList />}
        <div className="flex center mt30">
          <Button
            fullWidth
            rainbow
            label={createButtonText()}
            onClick={handleAllTransactionsClick}
            disabled={remainingTxCount === 0}
          />
        </div>
      </Paper>

      <ButtonContainer>
        <Link to={routesEnum.summaryPage}>
          <Button
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Link to={routesEnum.congratulationsPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            label={createContinueButtonText()}
            disabled={!oneTxConfirmed}
          />
        </Link>
      </ButtonContainer>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({
  depositFile,
  workflow,
}: StoreState): StateProps => ({
  depositKeys: depositFile.keys,
  workflow,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: step => dispatch(updateWorkflow(step)),
  dispatchTransactionStatusUpdate: (pubkey, status, txHash) =>
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
