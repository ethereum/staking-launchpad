import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import {
  AbstractConnector,
  AbstractConnector as AbstractConnectorInterface,
} from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
import { StatusWarning } from 'grommet-icons';
import ReactTooltip from 'react-tooltip';
import {
  AllowedNetworks,
  fortmatic,
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
import { Text } from '../../components/Text';
import { WalletButton } from './WalletButton';
import metamaskLogo from '../../static/metamask.svg';
import portisLogo from '../../static/portis.svg';
import fortmaticLogo from '../../static/fortmatic.svg';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { Dot } from '../../components/Dot';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { KeyFileInterface } from '../../store/actions/keyFileActions';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { IS_MAINNET, PRICE_PER_VALIDATOR } from '../../utils/envVars';

// styled components
const Container = styled.div`
  margin: auto;
  position: relative;
`;
const WalletConnectedContainer = styled.div`
  pointer-events: none;
  width: 500px;
  margin: auto;
  position: absolute;
  left: calc(50% - 250px); // center - half width
`;
const WalletButtonContainer = styled.div`
  margin: auto;
  .wallet-button-sub-container {
    display: flex;
    flex-wrap: wrap;
    width: 750px;
    margin: auto;
    @media only screen and (max-width: ${p => p.theme.screenSizes.large}) {
      width: 400px;
    }
  }
  .wallet-button {
    width: 350px;
    margin: 10px;
  }
`;
const WalletInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid ${(p: { theme: any }) => p.theme.gray.medium};
  padding-bottom: 20px;
`;
const StatusText = styled(Text)`
  font-size: 22px;
  margin-left: 10px;
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
  workflow: WorkflowStep;
  keyFiles: KeyFileInterface[];
}
interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _ConnectWalletPage = ({
  workflow,
  dispatchWorkflowUpdate,
  keyFiles,
}: Props): JSX.Element => {
  // setup RPC event listener
  const attemptedMMConnection: boolean = useMetamaskEagerConnect();
  useMetamaskListener(!attemptedMMConnection);

  // get wallet info from Web3React
  const {
    active: walletConnected,
    deactivate,
    chainId,
    connector: walletProvider,
    error,
    account,
    library,
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  const [balance, setBalance] = useState<number | null>(null);
  const [lowBalance, setLowBalance] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<
    AbstractConnector | null | undefined
  >(null);
  const [network, setNetwork] = useState<string>('');
  const [networkAllowed, setNetworkAllowed] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');

  // sets the balance to the current wallet on provider or network change
  useEffect((): any => {
    if (!!account && !!library) {
      library
        .getBalance(account)
        .then((amount: any) => {
          const formattedBalance = Number(
            parseFloat(formatEther(amount)).toPrecision(5)
          );
          const requiredBalance = keyFiles.length * PRICE_PER_VALIDATOR;

          setBalance(formattedBalance);
          if (formattedBalance < requiredBalance || formattedBalance === 0) {
            setLowBalance(true);
          } else {
            setLowBalance(false);
          }
        })
        .catch(() => setBalance(null));
      return () => setBalance(null);
    }
  }, [selectedWallet, walletProvider, library, chainId, keyFiles]);

  // sets the status copy on provider or network change
  useEffect(() => {
    if (chainId) {
      setNetwork(NetworkChainId[chainId]);
      setNetworkAllowed(Object.values(AllowedNetworks).includes(network));
    }

    if (
      walletConnected &&
      networkAllowed &&
      !error &&
      (balance || balance === 0)
    ) {
      setStatus(`${balance} ${IS_MAINNET ? '' : network} ETH available`);
    } else if (walletConnected && error) {
      setStatus('Error');
    } else if (!networkAllowed) {
      setStatus(
        `Please connect to ${
          IS_MAINNET ? 'Ethereum Mainnet' : 'Göerli Testnet'
        }`
      );
    }
  });

  const handleSubmit = () => {
    if (workflow === WorkflowStep.CONNECT_WALLET) {
      dispatchWorkflowUpdate(WorkflowStep.SUMMARY);
    }
  };

  const getWalletName = (provider?: AbstractConnector) => {
    if (!provider) return '';
    if (provider === metamask) return 'Metamask';
    if (provider === portis) return 'Portis';
    if (provider === fortmatic) return 'Fortmatic';
    return '';
  };

  if (workflow < WorkflowStep.CONNECT_WALLET) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate title="Connect Wallet">
      <Container>
        <WalletConnectedContainer>
          <Animated
            animationIn="fadeInRight"
            animationOut="fadeOutRight"
            isVisible={walletConnected}
            animateOnMount={false}
            animationInDuration={200}
            animationOutDuration={200}
          >
            <Paper pad="medium">
              <WalletInfoContainer>
                <div className="flex">
                  <Dot
                    className="mt10"
                    success={networkAllowed}
                    error={!networkAllowed}
                  />
                  <div className="ml20">
                    <Heading
                      level={3}
                      size="small"
                      color="blueDark"
                      className="mt0"
                    >
                      {getWalletName(walletProvider)}
                    </Heading>
                    {account && (
                      <Text size="small">{`${account.slice(
                        0,
                        6
                      )}...${account.slice(-6)}`}</Text>
                    )}
                  </div>
                </div>
                <Text color={networkAllowed ? 'greenDark' : 'redMedium'}>
                  {network === 'Mainnet' ? network : `${network} Testnet`}
                </Text>
              </WalletInfoContainer>
              <div className="flex center mt20">
                {lowBalance && (
                  <>
                    <ReactTooltip
                      id="status-warning"
                      type="warning"
                      effect="solid"
                    >
                      <span>
                        You do not have enough ETH in this wallet for{' '}
                        {keyFiles.length} validator
                        {keyFiles.length > 1 ? 's' : ''}
                      </span>
                    </ReactTooltip>
                    <StatusWarning
                      data-tip
                      data-for="status-warning"
                      color="yellowDark"
                    />
                  </>
                )}
                <StatusText>{status}</StatusText>
              </div>
            </Paper>
          </Animated>
        </WalletConnectedContainer>
        <WalletButtonContainer>
          <Animated
            animationIn="fadeInLeft"
            animationOut="fadeOutLeft"
            isVisible={!walletConnected}
            animateOnMount={false}
            animationInDuration={200}
            animationOutDuration={200}
          >
            <div className="wallet-button-sub-container">
              <WalletButton
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                logoSource={metamaskLogo}
                walletProvider={metamask}
                title="Metamask"
                error={walletProvider === metamask ? error : undefined}
              />
              <WalletButton
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                logoSource={portisLogo}
                walletProvider={portis}
                title="Portis"
                error={walletProvider === portis ? error : undefined}
              />
              <WalletButton
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                logoSource={fortmaticLogo}
                walletProvider={fortmatic}
                title="Fortmatic"
                error={walletProvider === fortmatic ? error : undefined}
              />
            </div>
          </Animated>
        </WalletButtonContainer>
      </Container>

      {error && error instanceof NoEthereumProviderError && (
        <div className="flex center mt20">Please install MetaMask.</div>
      )}

      <div className="flex center p30 mt20">
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
            disabled={!walletProvider || !walletConnected || !networkAllowed}
            label="Continue"
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: step => dispatch(updateWorkflow(step)),
});

const mapStateToProps = ({ workflow, keyFiles }: StoreState): StateProps => ({
  workflow,
  keyFiles,
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
