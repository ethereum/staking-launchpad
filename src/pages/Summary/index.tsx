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
import { Button } from '../../components/Button';
import { WalletDisconnected } from '../ConnectWallet/WalletDisconnected';
import { WrongNetwork } from '../ConnectWallet/WrongNetwork';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';
import { AcknowledgementSection } from './AcknowledgementSection';
import { Text } from '../../components/Text';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { InfoBox } from '../../components/InfoBox';
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
    <WorkflowPageTemplate title="Summary">
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          Launch Pad Summary
        </Heading>
        <Box className="flex flex-row space-between mt10">
          <Container>
            <Text>Validators</Text>
            <InfoBox>{amountValidators.toString()}</InfoBox>
          </Container>
          <Container className="mx20">
            <Text>Total Amount Required</Text>
            <InfoBox>
              {amountValidators.times(convertedPrice).toString()}
              {TICKER_NAME}
            </InfoBox>
          </Container>
        </Box>
      </Paper>
      <AcknowledgementSection title="Please proceed with caution">
        <CheckBox
          onChange={e => setLosePhrase(e.target.checked)}
          checked={losePhrase}
          label={
            <Text>
              I understand that if I lose my mnemonic phrase, I will not be able
              to withdraw my funds
            </Text>
          }
        />
        <span className="mt20">
          <CheckBox
            onChange={e => setEarlyAdopt(e.target.checked)}
            checked={earlyAdopt}
            label={
              <Text> I am aware of the early adopter and slashing risks</Text>
            }
          />
        </span>
        <span className="mt20">
          <CheckBox
            onChange={e => setNonReverse(e.target.checked)}
            checked={nonReverse}
            label={
              <Text> I am aware that this transaction is not reversible</Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection title="Please make sure you aren't being phished">
        <Text>
          You are responsible for the transaction. Fraudulent websites might
          lure you into sending the {PRICE_PER_VALIDATOR} {TICKER_NAME} to them,
          instead of the official deposit contract. Please check that the
          address you are sending the transaction to is the correct address.
        </Text>
        <Link to={routesEnum.phishingPage} className="my10" primary withArrow>
          Learn here how to do it safely
        </Link>
        <span className="mt20">
          <CheckBox
            onChange={e => setNoPhish(e.target.checked)}
            checked={noPhish}
            label={
              <Text>
                I know how to check that I am sending my {TICKER_NAME} into the
                correct deposit contract and will do so.
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <AcknowledgementSection title="Protect yourself against double deposits">
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
                Proceed with caution. Our on-chain data source is down and we
                are unable to flag any double deposits.
              </Text>
            </div>
          </Alert>
        )}

        <Text>
          Again, <i>you are responsible for this transaction!</i> Duplicate
          deposits with the same keyfile public key will be considered as a
          top-up and the extra balance more than {PRICE_PER_VALIDATOR}{' '}
          {TICKER_NAME} will NOT be counted in your effective balance on the
          beacon chain.
        </Text>
        <ul>
          <li>
            <Text className="mt10">
              Do not submit any transaction with a deposit_data file that you
              did not create yourself, or that you do not own the mnemonic
              phrase for.
            </Text>
          </li>
          <li>
            <Text className="mt10">
              If you've recently submitted a transaction with this deposit_data
              file, and are now resubmitting for some reason, we recommend
              waiting at least 30 minutes for our on-chain data source to flag
              any duplicates.
            </Text>
          </li>
        </ul>

        <span className="mt20">
          <CheckBox
            onChange={e => setDuplicatesAcknowledged(e.target.checked)}
            checked={duplicatesAcknowledged}
            label={
              <Text>
                I understand that sending a deposit more than once will result
                in my validator's balance exceeding 32 ETH, and that there is no
                advantage to this since a validator's maximum stake is limited
                to 32 ETH.
              </Text>
            }
          />
        </span>
      </AcknowledgementSection>
      <div className="flex center p30">
        <Link to={routesEnum.connectWalletPage}>
          <Button className="mr10" width={100} label="Back" />
        </Link>
        <Link to={routesEnum.transactionsPage} onClick={handleSubmit}>
          <Button width={300} rainbow disabled={!allChecked} label="Continue" />
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
