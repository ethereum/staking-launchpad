import React from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import { AbstractConnector as AbstractConnectorInterface } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { WalletConnected } from './WalletConnected';
import {
  AllowedNetworks,
  fortmatic,
  getErrorMessage,
  metamask,
  NetworkChainId,
  portis,
  useMetamaskEagerConnect,
  useMetamaskListener,
} from './web3Utils';
import { Button } from '../../components/Button';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { StoreState } from '../../store/reducers';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';
import {
  DispatchUpdateWorkflowProgressType,
  updateWorkflowProgress,
  WorkflowProgressStep,
} from '../../store/actions/workflowProgressActions';
import { Text } from '../../components/Text';
import { WalletButton } from './WalletButton';
import metamaskLogo from '../../static/metamask.svg';
import portisLogo from '../../static/portis.svg';
import fortmaticLogo from '../../static/fortmatic.svg';

const Container = styled.div`
  width: 300px;
  margin: auto;
  cursor: pointer;
  position: relative;
  height: ${(p: { walletCount: number }) => `${100 * p.walletCount}px`};
`;
const SubContainer = styled.div`
  div:not(:first-child) {
    margin-top: 20px;
  }
  position: absolute;
  width: 100%;
`;

export interface web3ReactInterface {
  activate: (
    connector: AbstractConnectorInterface,
    onError?: (error: Error) => void,
    throwErrors?: boolean
  ) => Promise<void>;
  setError: (error: Error) => void;
  deactivate: () => void;
  connector?: AbstractConnectorInterface;
  library?: any;
  chainId?: number;
  account?: null | string;
  active: boolean;
  error?: Error;
}

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflowProgress: WorkflowProgressStep;
}
interface DispatchProps {
  dispatchUpdateWorkflowProgress: DispatchUpdateWorkflowProgressType;
}

type Props = StateProps & DispatchProps & OwnProps;

const _ConnectWalletPage = ({
  workflowProgress,
  dispatchUpdateWorkflowProgress,
}: Props): JSX.Element => {
  const attemptedMMConnection: boolean = useMetamaskEagerConnect();
  const {
    active: walletConnected,
    deactivate,
    chainId,
    connector: walletProvider,
    error,
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  useMetamaskListener(!attemptedMMConnection); // listen for RPC events

  const handleSubmit = () => {
    if (workflowProgress === WorkflowProgressStep.CONNECT_WALLET) {
      dispatchUpdateWorkflowProgress(WorkflowProgressStep.SUMMARY);
    }
  };

  // if (workflowProgress < WorkflowProgressStep.CONNECT_WALLET) {
  //   return routeToCorrectWorkflowProgressStep(workflowProgress);
  // }
  let network = '';
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = Object.values(AllowedNetworks).includes(network);
  }

  return (
    <WorkflowPageTemplate title="Connect Wallet">
      <Container walletCount={3}>
        <SubContainer>
          <Animated
            animationIn="fadeInLeft"
            animationOut="fadeOutRight"
            isVisible={walletConnected}
            animateOnMount={false}
            // animationInDelay={600}
            animationInDuration={200}
            animationOutDuration={200}
          >
            <WalletConnected
              network={network}
              networkAllowed={networkAllowed}
            />
          </Animated>
        </SubContainer>
        <SubContainer>
          <Animated
            animationIn="fadeIn"
            animationOut="fadeOutRight"
            isVisible={!walletConnected}
            animateOnMount={false}
            // animationOutDelay={600}
            animationInDuration={200}
            animationOutDuration={200}
          >
            <WalletButton
              logoSource={metamaskLogo}
              walletProvider={metamask}
              title="Metamask"
              error={walletProvider === metamask ? error : undefined}
            />
            <WalletButton
              logoSource={portisLogo}
              walletProvider={portis}
              title="Portis"
              error={walletProvider === portis ? error : undefined}
            />
            <WalletButton
              logoSource={fortmaticLogo}
              walletProvider={fortmatic}
              title="Fortmatic"
              error={walletProvider === fortmatic ? error : undefined}
            />
          </Animated>
        </SubContainer>
      </Container>
      <div className="flex center p30">
        {!walletConnected && (
          <Link to={routesEnum.uploadValidatorPage}>
            <Button className="mr10" width={100} label="Back" />
          </Link>
        )}
        {walletConnected && (
          <Button
            width={300}
            onClick={deactivate}
            label="Connect a different wallet"
            className="mr10"
            color="blueDark"
          />
        )}
        <Link to={routesEnum.summaryPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!networkAllowed}
            label="Continue on testnet"
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

// {
//   error && (
//     <Text textAlign="center" className="mt10" color="error">
//       {getErrorMessage(error)}
//     </Text>
//   );
// }
// {
//   !networkAllowed && (
//     <Text className="mb10">Please connect to Göerli Testnet</Text>
//   );
// }

const mapStateToProps = ({ workflowProgress }: StoreState): StateProps => ({
  workflowProgress,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchUpdateWorkflowProgress: (step: WorkflowProgressStep) =>
    dispatch(updateWorkflowProgress(step)),
});

export const ConnectWalletPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_ConnectWalletPage);
