import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { Box, CheckBox } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { web3ReactInterface } from '../ConnectWallet';
import { NetworkChainId } from '../ConnectWallet/web3Utils';
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
import { FormattedMessage, useIntl } from 'react-intl';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import {
  IS_MAINNET,
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
} from '../../utils/envVars';
import { Alert } from '../../components/Alert';
import { Alert as GrommetAlert } from 'grommet-icons';
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
`;

const Container = styled.div`
  width: 100%;
`;
const NETWORK_ID = IS_MAINNET
  ? NetworkChainId.Mainnet
  : NetworkChainId['Göerli'];

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
  const [losePhrase, setLosePhrase] = useState(false);
  const [earlyAdopt, setEarlyAdopt] = useState(false);
  const [nonReverse, setNonReverse] = useState(false);
  const [noPhish, setNoPhish] = useState(false);
  const [duplicatesAcknowledged, setDuplicatesAcknowledged] = useState(false);
  const amountValidators = new BigNumber(depositKeys.length);
  const convertedPrice = new BigNumber(PRICE_PER_VALIDATOR);
  const intl = useIntl();
  const allChecked = React.useMemo(
    () =>
      losePhrase &&
      earlyAdopt &&
      nonReverse &&
      noPhish &&
      duplicatesAcknowledged,
    [losePhrase, earlyAdopt, nonReverse, noPhish, duplicatesAcknowledged]
  );

  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const handleSubmit = () => {
    if (workflow === WorkflowStep.SUMMARY) {
      dispatchWorkflowUpdate(WorkflowStep.TRANSACTION_SIGNING);
    }
  };

  if (workflow < WorkflowStep.SUMMARY) {
    return routeToCorrectWorkflowStep(workflow);
  }

  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== NETWORK_ID) return <WrongNetwork />;

  return (
    <WorkflowPageTemplate
      title={intl.formatMessage({ defaultMessage: 'Summary' })}
    >
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
              {amountValidators.times(convertedPrice).toString()}
              {TICKER_NAME}
            </InfoBox>
          </Container>
        </Box>
      </Paper>
      <AcknowledgementSection
        title={intl.formatMessage({ defaultMessage: 'Understand the risks' })}
      >
        <CheckBox
          onChange={e => setLosePhrase(e.target.checked)}
          checked={losePhrase}
          label={
            <Text>
              <FormattedMessage defaultMessage="I understand that I will not be able to withdraw my funds if I lose my mnemonic phrase." />
            </Text>
          }
        />
        <span className="mt20">
          <CheckBox
            onChange={e => setEarlyAdopt(e.target.checked)}
            checked={earlyAdopt}
            label={
              <Text>
                <FormattedMessage defaultMessage="I understand the early adopter and slashing risks." />
              </Text>
            }
          />
        </span>
        <span className="mt20">
          <CheckBox
            onChange={e => setNonReverse(e.target.checked)}
            checked={nonReverse}
            label={
              <Text>
                <FormattedMessage defaultMessage="I understand that this transaction is not reversible." />
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection
        title={intl.formatMessage({
          defaultMessage: "Make sure you aren't being phished",
        })}
      >
        <Text>
          <FormattedMessage
            defaultMessage="You are responsible for the transaction. Fraudulent websites might
          try and lure you into sending the {pricePerValidator} to them,
          instead of the official deposit contract. Make sure that the
          address you are sending the transaction to is the correct address."
            values={{
              pricePerValidator: (
                <span>
                  {PRICE_PER_VALIDATOR} {TICKER_NAME}
                </span>
              ),
            }}
          />
        </Text>
        <Row>
          <Link to="https://ethereum.org/eth2/deposit-contract/" primary>
            <Button
              width={420}
              label={intl.formatMessage({
                defaultMessage: 'Check deposit contract address',
              })}
            />
          </Link>
          <Link to={routesEnum.phishingPage} primary className="ml20">
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
                  defaultMessage="I know how to check that I am sending my {eth} into the
                correct deposit contract and will do so."
                  values={{ eth: <span>{TICKER_NAME}</span> }}
                />
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection
        title={intl.formatMessage({
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
            defaultMessage="{italicsWarning} Duplicate
          deposits with the same keyfile public key will be considered as a
          double deposit. Any extra balance more than {eth} will NOT be counted in your effective balance on the
          Beacon Chain."
            values={{
              italicsWarning: (
                <i>
                  {intl.formatMessage({
                    defaultMessage: 'You are responsible for this transaction!',
                  })}
                </i>
              ),
              eth: (
                <span>
                  {PRICE_PER_VALIDATOR} {TICKER_NAME}
                </span>
              ),
            }}
          />
        </Text>

        <ul>
          <li>
            <Text className="mt10">
              <FormattedMessage
                defaultMessage="Do not submit any transaction with a {depositData} file that you
              did not create yourself, or that you do not own the mnemonic
              phrase for."
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
                  defaultMessage="I understand that there is no advantage to depositing more than once per validator. Any extra {eth} sent in a duplicate deposit will not be counted in my effective validator balance and I will not be able to withdraw it."
                  values={{ eth: <span>{TICKER_NAME}</span> }}
                />
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <div className="flex center p30">
        <Link to={routesEnum.connectWalletPage}>
          <Button
            className="mr10"
            width={100}
            label={intl.formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Link to={routesEnum.transactionsPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!allChecked}
            label={intl.formatMessage({ defaultMessage: 'Continue' })}
          />
        </Link>
      </div>
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
