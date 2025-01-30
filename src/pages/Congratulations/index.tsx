import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import styled from 'styled-components';
import { FormNext, FormPrevious, FlagFill } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import _every from 'lodash/every';
import BigNumber from 'bignumber.js';
import { AppBar } from '../../components/AppBar';
import { Button } from '../../components/Button';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';
import { KeyList } from '../Transactions/Keylist';
import { handleMultipleTransactions } from '../Transactions/transactionUtils';
import { web3ReactInterface } from '../ConnectWallet';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { WorkflowStep } from '../../store/actions/workflowActions';
import {
  TESTNET_LAUNCHPAD_NAME,
  IS_MAINNET,
  MAINNET_LAUNCHPAD_URL,
  TESTNET_LAUNCHPAD_URL,
  TICKER_NAME,
  ETHER_TO_GWEI,
} from '../../utils/envVars';
import { routesEnum } from '../../Routes';
import LeslieTheRhinoPNG from '../../static/leslie-rhino.png';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import {
  DepositStatus,
  TransactionStatus,
  DispatchTransactionStatusUpdateType,
  updateTransactionStatus,
} from '../../store/actions/depositFileActions';
// Types
import { useBeaconchainData } from '../../hooks/useBeaconchainData';

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  min-height: 100vh;
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

const BoldGreen = styled.span`
  color: ${(p: { theme: any }) => p.theme.green.dark};
  font-size: 1.5rem;
  font-weight: bold;
  margin-inline-end: 10px;
`;

const Card = styled.div`
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 496px;
  margin-bottom: 24px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
    width: 100%;
  }
`;

const CardLink = styled(Link)`
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 496px;
  margin-bottom: 24px;
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
    width: 100%;
  }
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const CardButton = styled.div`
  padding: 24px;
  border: 1px solid ${p => p.theme.gray.dark};
  border-radius: 4px;
  width: 496px;
  margin-bottom: 24px;
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    margin: 0px;
    margin-top: 16px;
    width: 100%;
  }
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
  }
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
`;

const WarningRow = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  color: ${p => p.theme.red.medium};
  margin-top: 1rem;
  gap: 20px;
`;

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const WarningText = styled(Text)`
  color: ${p => p.theme.red.medium};
`;

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 32px;
  flex-wrap: wrap;
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
    margin-top: 32px;
    margin-bottom: 32px;
  }
`;

const ChecklistAlert = styled.div`
  display: flex;
  margin: 3rem 0rem;
  padding: 1rem;
  background: #5da2b2;
  border-radius: 4px;
  > div {
    margin-inline-start: 5rem;
  }
  .flex {
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
  @media only screen and (max-width: ${p => p.theme.screenSizes.medium}) {
    flex-direction: column;
    > div {
      margin-inline-start: 0rem;
    }
  }
`;

const Leslie = styled.img.attrs({ src: LeslieTheRhinoPNG })`
  width: 200px;
  transform: scale(-1.2, 1.2);
  margin: 3rem 0 5rem 4rem;
`;

interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
}
interface DispatchProps {
  dispatchTransactionStatusUpdate: DispatchTransactionStatusUpdateType;
}

type Props = StateProps & DispatchProps & OwnProps;

const _CongratulationsPage = ({
  depositKeys,
  workflow,
  dispatchTransactionStatusUpdate,
}: Props): JSX.Element => {
  const state = useBeaconchainData();
  const { status, apr } = state;
  const { locale, formatMessage } = useIntl();
  const { account, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const remainingTxCount = depositKeys.filter(
    file =>
      file.depositStatus !== DepositStatus.ALREADY_DEPOSITED &&
      file.transactionStatus !== TransactionStatus.SUCCEEDED
  ).length;

  const allTxConfirmed = _every(
    depositKeys.map(
      file => file.transactionStatus === TransactionStatus.SUCCEEDED
    )
  );

  const succeededDeposits = depositKeys.filter(
    key => key.transactionStatus === TransactionStatus.SUCCEEDED
  );

  const actualTxConfirmed = succeededDeposits.length;

  const stakedGwei = succeededDeposits.reduce((acc, key) => {
    const bigAmount = new BigNumber(key.amount);
    return acc.plus(bigAmount);
  }, new BigNumber(0));

  const formattedStakedEther = stakedGwei.dividedBy(ETHER_TO_GWEI).toString();

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

  const LoadingHandler: React.FC<{
    value?: string;
  }> = ({ value }): JSX.Element => {
    if (status === 200) {
      return <span>{value}</span>;
    }
    if (status === 500) {
      return <FormattedMessage defaultMessage="Loading error" />;
    }
    return <FormattedMessage defaultMessage="Loading..." />;
  };

  const formArrow = React.useMemo(
    () =>
      locale === 'ar' ? (
        <FormPrevious size="large" />
      ) : (
        <FormNext size="large" />
      ),
    [locale]
  );

  if (workflow < WorkflowStep.CONGRATULATIONS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <RainbowBackground>
      <AppBar />
      <Gutter>
        <Content>
          <Heading
            level={2}
            size="medium"
            className="mt30"
            color="blueDark"
            margin="none"
          >
            <FormattedMessage defaultMessage="Your stake has reached the deposit contract!" />
            <span
              role="img"
              aria-label={formatMessage({ defaultMessage: 'congratulations' })}
            >
              {' '}
              🎉
            </span>
          </Heading>
          <Alert variant="info" className="mt30" pad="medium">
            {IS_MAINNET && (
              <>
                <FormattedMessage
                  defaultMessage="There is a short wait before your validator becomes active on the Beacon Chain. Use this time to complete the checklist and spend some time validating the {testnet}"
                  values={{
                    testnet: (
                      <Link primary inline to={TESTNET_LAUNCHPAD_URL}>
                        <FormattedMessage
                          defaultMessage="{TESTNET_LAUNCHPAD_NAME} testnet"
                          values={{ TESTNET_LAUNCHPAD_NAME }}
                        />
                      </Link>
                    ),
                  }}
                />{' '}
                <Link
                  primary
                  to="https://kb.beaconcha.in/ethereum-2.0-depositing"
                  className="mt10"
                >
                  <FormattedMessage defaultMessage="Why is there a wait?" />
                </Link>
              </>
            )}
            {!IS_MAINNET && (
              <FormattedMessage
                defaultMessage="You've successfully set up a testnet validator! We recommend you complete the checklist before validating on {mainnet}"
                values={{
                  mainnet: (
                    <Link primary inline to={MAINNET_LAUNCHPAD_URL}>
                      <FormattedMessage defaultMessage="Mainnet" />
                    </Link>
                  ),
                }}
              />
            )}
          </Alert>
          <div>
            <Heading
              level={3}
              size="medium"
              color="blueDark"
              margin="none"
              className="mt60"
            >
              <FormattedMessage defaultMessage="Overview" />
            </Heading>
            <CardContainer>
              <Card>
                <Heading level={3} size="medium" color="blueDark" margin="none">
                  <FormattedMessage defaultMessage="Your stake" />
                </Heading>
                <Text size="x-large" className="mt20">
                  <BoldGreen>
                    {formattedStakedEther} {TICKER_NAME}
                  </BoldGreen>
                </Text>
              </Card>
              <Card>
                <Heading level={3} size="medium" color="blueDark" margin="none">
                  <FormattedMessage defaultMessage="Your validators" />
                </Heading>
                <Text size="x-large" className="mt20">
                  <BoldGreen>
                    <FormattedMessage
                      defaultMessage="{totalTxCount} validators"
                      values={{
                        totalTxCount: <span>{actualTxConfirmed}</span>,
                      }}
                    />
                  </BoldGreen>
                </Text>
                {!allTxConfirmed && (
                  <WarningRow>
                    <FlagFill color="red" />
                    <WarningText>
                      {remainingTxCount === 1 ? (
                        <FormattedMessage
                          defaultMessage="You have {remainingTxCount} outstanding deposit"
                          values={{ remainingTxCount }}
                          description="Singular form, for only one deposit"
                        />
                      ) : (
                        <FormattedMessage
                          defaultMessage="You have {remainingTxCount} outstanding deposits"
                          values={{ remainingTxCount }}
                          description="Plural form, for multiple remaining deposits"
                        />
                      )}
                    </WarningText>
                  </WarningRow>
                )}
              </Card>
              <Card>
                <Heading level={3} size="medium" color="blueDark" margin="none">
                  <FormattedMessage defaultMessage="Current APR" />
                </Heading>
                <Text size="x-large" className="mt20">
                  <BoldGreen className="mr10">
                    <LoadingHandler value={apr} />
                  </BoldGreen>
                </Text>
              </Card>
              {!allTxConfirmed ? (
                <CardButton onClick={handleAllTransactionsClick}>
                  <Row>
                    <div>
                      <Heading
                        level={3}
                        size="medium"
                        color="blueDark"
                        margin="none"
                      >
                        <span
                          role="img"
                          aria-label={formatMessage({
                            defaultMessage: 'clipboard',
                          })}
                        >
                          📋{' '}
                        </span>
                        <FormattedMessage defaultMessage="Next" />
                      </Heading>
                      <Text size="x-large" className="mt20">
                        {remainingTxCount === 1 ? (
                          <FormattedMessage defaultMessage="Complete your last deposit" />
                        ) : (
                          <FormattedMessage
                            defaultMessage="Complete remaining {remainingTxCount} deposits"
                            values={{ remainingTxCount }}
                          />
                        )}
                      </Text>
                      {remainingTxCount !== 1 && (
                        <Text size="medium">
                          <FormattedMessage defaultMessage="You can also confirm the deposits individually below..." />
                        </Text>
                      )}
                    </div>
                    {formArrow}
                  </Row>
                </CardButton>
              ) : (
                <CardLink to={`${routesEnum.checklistPage}/#section-three`}>
                  <Row>
                    <div>
                      <Heading
                        level={3}
                        size="medium"
                        color="blueDark"
                        margin="none"
                      >
                        <span
                          role="img"
                          aria-label={formatMessage({
                            defaultMessage: 'clipboard',
                          })}
                        >
                          📋{' '}
                        </span>
                        <FormattedMessage defaultMessage="Next" />
                      </Heading>
                      <Text size="x-large" className="mt20">
                        <FormattedMessage defaultMessage="Complete the staker checklist" />
                      </Text>
                    </div>
                    {formArrow}
                  </Row>
                </CardLink>
              )}
            </CardContainer>
          </div>
          {!allTxConfirmed && (
            <div id="keylist">
              <Heading level={3} className="mt20">
                {remainingTxCount === 1 ? (
                  <FormattedMessage defaultMessage="Outstanding deposit" />
                ) : (
                  <FormattedMessage defaultMessage="Outstanding deposits ({remainingTxCount})" />
                )}
                {remainingTxCount})
              </Heading>
              <Text className="mt20">
                {remainingTxCount === 1 ? (
                  <FormattedMessage defaultMessage="Your deposit_data.json suggests you wanted to set up one more validator. This deposit is still outstanding. If you think you've already made this deposit, wait an hour before trying again to avoid duplicate deposits." />
                ) : (
                  <FormattedMessage defaultMessage="Your deposit_data.json suggests you wanted to set up more validators. These deposits are still outstanding. If you think you've already made these deposits, wait an hour before trying again to avoid duplicate deposits." />
                )}
                {remainingTxCount})
              </Text>
              <KeyList />
            </div>
          )}
          <ChecklistAlert>
            <Leslie />
            <div>
              <div className="flex">
                <Heading level={3} size="medium" color="white" margin="none">
                  <FormattedMessage defaultMessage="Thank you for supporting the Ethereum network!" />
                </Heading>
                <Text color="white" className="mt10">
                  <FormattedMessage
                    defaultMessage="Be sure to complete the {stakerChecklist} as soon as possible. And join the EthStaker community for support and discussion with fellow validators."
                    values={{
                      stakerChecklist: (
                        <strong>
                          {formatMessage({
                            defaultMessage: 'staker checklist',
                          })}
                        </strong>
                      ),
                    }}
                    description="{stakerChecklist} = 'Staker Checklist' bolded to draw attention"
                  />
                </Text>
                <ButtonRow>
                  <Link to={routesEnum.checklistPage} className="mt20">
                    <Button
                      label={formatMessage({ defaultMessage: 'Checklist' })}
                      rainbow
                    />
                  </Link>
                  <Link
                    isTextLink={false}
                    to="https://dsc.gg/ethstaker"
                    className="mt20"
                  >
                    <Button
                      fullWidth
                      label={formatMessage({
                        defaultMessage: 'EthStaker community',
                      })}
                    />
                  </Link>
                </ButtonRow>
              </div>
            </div>
          </ChecklistAlert>
        </Content>
      </Gutter>
    </RainbowBackground>
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
  dispatchTransactionStatusUpdate: (pubkey, status, txHash) =>
    dispatch(updateTransactionStatus(pubkey, status, txHash)),
});

export const CongratulationsPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_CongratulationsPage);
