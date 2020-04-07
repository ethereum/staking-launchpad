import React, { useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import BigNumber from 'bignumber.js';
import styled from 'styled-components';
import { Box, CheckBox } from 'grommet';
import { FormNextLink } from 'grommet-icons';
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
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { AcknowledgementSection } from './AcknowledgementSection';
import { Text } from '../../components/Text';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { InfoBox } from '../../components/InfoBox';
import { KeyList } from './KeyList';
import {
  DispatchWorkflowUpdateType,
  WorkflowStep,
  updateWorkflow,
} from '../../store/actions/workflowActions';
import { IS_MAINNET, PRICE_PER_VALIDATOR } from '../../utils/envVars';

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
}

interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _SummaryPage = ({
  workflow,
  dispatchWorkflowUpdate,
  depositKeys,
}: Props): JSX.Element => {
  const [allChecked, setAllChecked] = useState(false);
  const [losePhrase, setLosePhrase] = useState(false);
  const [earlyAdopt, setEarlyAdopt] = useState(false);
  const [nonReverse, setNonReverse] = useState(false);
  const [noPhish, setNoPhish] = useState(false);
  const amountValidators = new BigNumber(depositKeys.length);
  const convertedPrice = new BigNumber(PRICE_PER_VALIDATOR);

  useEffect(() => {
    setAllChecked(losePhrase && earlyAdopt && nonReverse && noPhish);
  }, [losePhrase, earlyAdopt, nonReverse, noPhish]);

  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const handleSubmit = () => {
    if (workflow === WorkflowStep.SUMMARY) {
      dispatchWorkflowUpdate(WorkflowStep.TRANSACTION_SIGNING);
    }
  };

  if (workflow < WorkflowStep.SUMMARY)
    return routeToCorrectWorkflowStep(workflow);

  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== NETWORK_ID) return <WrongNetwork />;

  return (
    <WorkflowPageTemplate title="Summary">
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          Deposit Ceremony Summary
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
              ETH
            </InfoBox>
          </Container>
        </Box>
      </Paper>
      <KeyList depositKeys={depositKeys} />
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
          lure you into sending the {PRICE_PER_VALIDATOR} ETH to them, instead
          of the official deposit contract. Please check that the address you
          are sending the transaction to is the correct address.
        </Text>
        <Link to="https://www.google.com" external className="mt10" primary>
          Learn here how to do it safely <FormNextLink />
        </Link>
        <span className="mt20">
          <CheckBox
            onChange={e => setNoPhish(e.target.checked)}
            checked={noPhish}
            label={
              <Text>
                I know how to check that I am sending my ETH into the correct
                deposit contract and will do so.
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
