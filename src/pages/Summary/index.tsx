import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { Box, CheckBox } from 'grommet';
import { Alert as GrommetAlert } from 'grommet-icons';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { web3ReactInterface } from '../ConnectWallet';
import { TARGET_NETWORK_CHAIN_ID } from '../ConnectWallet/web3Utils';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { WalletDisconnected } from '../ConnectWallet/WalletDisconnected';
import { WrongNetwork } from '../ConnectWallet/WrongNetwork';
import { Link } from '../../components/Link';
import { Button } from '../../components/Button';
import { routesEnum } from '../../Routes';
import { AcknowledgementSection } from './AcknowledgementSection';
import { Text } from '../../components/Text';
import { Code } from '../../components/Code';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { InfoBox } from '../../components/InfoBox';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import {
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
  ETHER_TO_GWEI,
} from '../../utils/envVars';
import { Alert } from '../../components/Alert';
import { BeaconChainStatus } from '../../store/actions/depositFileActions';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';

const AlertIcon = styled(p => <GrommetAlert {...p} />)`
  display: block;
  margin: 1.3rem;
`;

const Row = styled.div`
  display: flex;
  margin: 2rem 0rem;
  align-items: center;
  gap: 20px;
`;

const Container = styled.div`
  width: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 30px;
  gap: 10px;
  @media (max-width: ${p => p.theme.screenSizes.small}) {
    flex-direction: column;
    padding-inline: 0;
    button,
    a {
      width: 100% !important;
    }
  }
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
  beaconChainApiStatus: BeaconChainStatus;
}

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _SummaryPage = ({
  workflow,
  dispatchWorkflowUpdate,
  depositKeys,
  beaconChainApiStatus,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();

  const accountType = +depositKeys[0].withdrawal_credentials.slice(0, 2);

  const [losePhrase, setLosePhrase] = useState(accountType > 0);
  const [softwareRisk, setSoftwareRisk] = useState(false);
  const [nonReverse, setNonReverse] = useState(false);
  const [noPhish, setNoPhish] = useState(false);
  const [duplicatesAcknowledged, setDuplicatesAcknowledged] = useState(false);

  const allChecked = React.useMemo(
    () =>
      losePhrase &&
      softwareRisk &&
      nonReverse &&
      noPhish &&
      duplicatesAcknowledged,
    [losePhrase, softwareRisk, nonReverse, noPhish, duplicatesAcknowledged]
  );

  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const handleSubmit = () => {
    if (workflow === WorkflowStep.SUMMARY) {
      dispatchWorkflowUpdate(WorkflowStep.TRANSACTION_SIGNING);
    }
  };

  const maxEB =
    accountType > 1 ? MAX_EFFECTIVE_BALANCE : MIN_ACTIVATION_BALANCE;

  const amountValidators = new BigNumber(depositKeys.length);

  const requiredAmountEther = depositKeys.reduce((acc, key) => {
    const bigAmount = new BigNumber(key.amount);
    return acc.plus(bigAmount);
  }, new BigNumber(0));

  if (workflow < WorkflowStep.SUMMARY) {
    return routeToCorrectWorkflowStep(workflow);
  }

  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== TARGET_NETWORK_CHAIN_ID) return <WrongNetwork />;

  return (
    <WorkflowPageTemplate title={formatMessage({ defaultMessage: 'Summary' })}>
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          <FormattedMessage defaultMessage="Launchpad summary" />
        </Heading>
        <Box className="flex flex-row space-between mt10">
          <Container>
            <Text>
              <FormattedMessage defaultMessage="Validators" />
            </Text>
            <InfoBox>{amountValidators.toString()}</InfoBox>
          </Container>
          <Container className="mx20">
            <Text>
              <FormattedMessage defaultMessage="Total amount required" />
            </Text>
            <InfoBox>
              {requiredAmountEther.div(ETHER_TO_GWEI).toString()} {TICKER_NAME}
            </InfoBox>
          </Container>
        </Box>
      </Paper>
      <AcknowledgementSection
        title={formatMessage({ defaultMessage: 'Understand the risks' })}
      >
        {accountType === 0 && (
          <span className="mb20">
            <CheckBox
              onChange={e => setLosePhrase(e.target.checked)}
              checked={losePhrase}
              label={
                <Text>
                  <FormattedMessage defaultMessage="I understand that I will not be able to withdraw my funds if I lose my mnemonic phrase." />
                </Text>
              }
            />
          </span>
        )}
        <span className="mb20">
          <CheckBox
            onChange={e => setSoftwareRisk(e.target.checked)}
            checked={softwareRisk}
            label={
              <Text>
                <FormattedMessage defaultMessage="I understand the software and slashing risks." />
              </Text>
            }
          />
        </span>
        <CheckBox
          onChange={e => setNonReverse(e.target.checked)}
          checked={nonReverse}
          label={
            <Text>
              <FormattedMessage defaultMessage="I understand that this transaction is not reversible." />
            </Text>
          }
        />
      </AcknowledgementSection>
      <AcknowledgementSection
        title={formatMessage({
          defaultMessage: "Make sure you aren't being phished",
        })}
      >
        <Text>
          <FormattedMessage
            defaultMessage="You are responsible for the transaction. Fraudulent websites might
          try and lure you into sending {TICKER_NAME} to them,
          instead of the official deposit contract. Make sure that the
          address you are sending the transaction to is the correct address."
            values={{ TICKER_NAME }}
          />
        </Text>
        <Row>
          <Link
            isTextLink={false}
            to="https://ethereum.org/en/staking/deposit-contract/"
            primary
          >
            <Button
              width={420}
              label={formatMessage({
                defaultMessage: 'Check deposit contract address',
              })}
            />
          </Link>
          <Link shouldOpenNewTab to={routesEnum.phishingPage} primary>
            <FormattedMessage defaultMessage="More on phishing" />
          </Link>
        </Row>
        <span className="mt20">
          <CheckBox
            onChange={e => setNoPhish(e.target.checked)}
            checked={noPhish}
            label={
              <Text>
                <FormattedMessage
                  defaultMessage="I know how to check that I am sending my {TICKER_NAME} into the
                correct deposit contract and will do so."
                  values={{ TICKER_NAME }}
                />
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection
        title={formatMessage({
          defaultMessage: 'Protect yourself against double deposits',
        })}
      >
        {beaconChainApiStatus === BeaconChainStatus.DOWN && (
          <Alert variant="warning" className="mb20">
            <div className="flex">
              <AlertIcon />
              <Text
                weight={500}
                color="yellowDarkest"
                className="my10"
                style={{ wordBreak: 'break-word' }}
              >
                <FormattedMessage
                  defaultMessage="Proceed with caution. Our on-chain data source is down and we
                are unable to flag any double deposits."
                />
              </Text>
            </div>
          </Alert>
        )}

        <Text>
          <FormattedMessage
            defaultMessage="{warning} Duplicate deposits with the same keyfile public key will be considered as a double deposit.
              If this balance exceeds your accounts maximum effective balance ({maxEB} {TICKER_NAME}), extra will not be counted towards your stake.
              Assuming a withdrawal address was set, these funds will automatically be redistributed after the account is activated.
              If no withdrawal address was provided, funds will remain locked until a withdrawal address is provided."
            values={{
              warning: (
                <em>
                  {formatMessage({
                    defaultMessage: 'You are responsible for this transaction!',
                  })}
                </em>
              ),
              maxEB,
              TICKER_NAME,
            }}
          />
        </Text>

        <ul>
          <li>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Do not submit any transaction with a {depositData} file that you did not create yourself, or that you do not own the mnemonic phrase for."
                values={{ depositData: <Code>deposit_data</Code> }}
              />
            </Text>
          </li>
          <li>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Wait at least 30 minutes before trying to resubmit a transaction with this {depositData} file. This will give our on-chain data source time to flag any duplicate deposits."
                values={{ depositData: <Code>deposit_data</Code> }}
              />
            </Text>
          </li>
        </ul>
        <span className="mt20">
          <CheckBox
            onChange={e => setDuplicatesAcknowledged(e.target.checked)}
            checked={duplicatesAcknowledged}
            label={
              <Text>
                <FormattedMessage
                  defaultMessage="I understand that there is no advantage to deposit more ETH than the maximum effective balance ({maxEB} {TICKER_NAME} for my account type).
                  Any extra {TICKER_NAME} sent in excess of this value will not count towards my stake, and will be automatically withdrawn once the account is activated with a valid withdrawal address."
                  values={{ maxEB, TICKER_NAME }}
                />
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <ButtonContainer>
        <Link to={routesEnum.connectWalletPage}>
          <Button
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Link to={routesEnum.transactionsPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!allChecked}
            label={formatMessage({ defaultMessage: 'Continue' })}
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
  beaconChainApiStatus: depositFile.beaconChainApiStatus,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (step: WorkflowStep) => {
    dispatch(updateWorkflow(step));
  },
});

export const SummaryPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_SummaryPage);
