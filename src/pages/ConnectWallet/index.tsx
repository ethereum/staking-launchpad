import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { Dispatch } from 'redux';
import { Animated } from 'react-animated-css';
import { connect } from 'react-redux';
import { FormattedMessage, useIntl } from 'react-intl';
import {
  AbstractConnector,
  AbstractConnector as AbstractConnectorInterface,
} from '@web3-react/abstract-connector';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';
import { NoEthereumProviderError } from '@web3-react/injected-connector';
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
import { DepositKeyInterface, StoreState } from '../../store/reducers';
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
import {
  PORTIS_DAPP_ID,
  ENABLE_RPC_FEATURES,
  IS_MAINNET,
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
} from '../../utils/envVars';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { MetamaskHardwareButton } from './MetamaskHardwareButton';

// styled components
const Container = styled.div`
  margin: auto;
  position: relative;
  margin-bottom: 40px;
  margin-top: 40px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.large}) {
    margin-bottom: 0;
  }
`;
const WalletConnectedContainer = styled.div`
  pointer-events: none;
  width: 800px;
  margin: auto;
  position: absolute;
  left: calc(50% - 400px); // center - half width
  @media only screen and (max-width: ${p => p.theme.screenSizes.large}) {
    width: 100%;
    left: 0;
    height: 100%;
  }
`;

const WalletButtonContainer = styled.div`
  margin: auto;
`;
const WalletButtonSubContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 750px;
  margin: auto;
  @media only screen and (max-width: ${p => p.theme.screenSizes.large}) {
    width: 400px;
  }
`;
const WalletInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid ${(p: { theme: any }) => p.theme.gray.medium};
  padding-bottom: 20px;
`;
const StatusText = styled(Text)`
  font-size: 18px;
`;
const FaucetLink = styled(Link)`
  margin: auto;
  margin-top: 10px;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Network = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
`;

const Balance = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 16px;
  margin-top: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  margin-top: 128px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.large}) {
    flex-direction: column;
    align-items: center;
  }
`;

const MetaMaskError = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 0px;
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
  depositKeys: DepositKeyInterface[];
}
interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _ConnectWalletPage = ({
  workflow,
  dispatchWorkflowUpdate,
  depositKeys,
}: Props): JSX.Element => {
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

  // initialize state
  const [balance, setBalance] = useState<number | null>(null);
  const [lowBalance, setLowBalance] = useState<boolean>(false);
  const [selectedWallet, setSelectedWallet] = useState<
    AbstractConnector | null | undefined
  >(null);
  const [network, setNetwork] = useState<string>('');
  const [networkAllowed, setNetworkAllowed] = useState<boolean>(false);
  const [status, setStatus] = useState<string>('');
  const isInvalidNetwork = useMemo(() => {
    return (
      error &&
      (error instanceof UnsupportedChainIdError ||
        error.message === 'Invariant failed: chainId 0xNaN is not an integer')
    );
  }, [error]);
  const { formatMessage } = useIntl();

  // setup RPC event listener
  const attemptedMMConnection: boolean = useMetamaskEagerConnect();
  useMetamaskListener(!attemptedMMConnection);

  // sets the balance to the current wallet on provider or network change
  useEffect((): any => {
    if (!!account && !!library) {
      library
        .getBalance(account)
        .then((amount: any) => {
          const formattedBalance = Number(
            parseFloat(formatEther(amount)).toPrecision(5)
          );
          // @ts-ignore (type check performed in envVars.ts)
          const requiredBalance = depositKeys.length * PRICE_PER_VALIDATOR;

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
  }, [selectedWallet, walletProvider, library, chainId, depositKeys, account]);

  const getWalletName = (provider?: AbstractConnector) => {
    if (!provider) return '';
    if (provider === metamask) return 'Metamask';
    if (provider === portis) return 'Portis';
    if (provider === fortmatic) return 'Fortmatic';
    return '';
  };

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
      setStatus(`${balance} ${TICKER_NAME}`);
    } else if (walletConnected && error) {
      setStatus(formatMessage({ defaultMessage: 'Error' }));
    } else if (!networkAllowed) {
      setStatus(
        formatMessage(
          { defaultMessage: 'Connect {wallet} to {network}' },
          {
            wallet: getWalletName(walletProvider),
            network: IS_MAINNET ? 'Ethereum mainnet' : 'Göerli testnet',
          }
        )
      );
    }
  }, [
    chainId,
    walletConnected,
    networkAllowed,
    error,
    balance,
    network,
    formatMessage,
    walletProvider,
  ]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.CONNECT_WALLET) {
      dispatchWorkflowUpdate(WorkflowStep.SUMMARY);
    }
  };

  if (workflow < WorkflowStep.CONNECT_WALLET) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate
      title={formatMessage({ defaultMessage: 'Connect wallet' })}
    >
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
                <Heading level={3} size="small" color="blueDark">
                  {getWalletName(walletProvider)}
                </Heading>
                {account && (
                  <Text size="medium">
                    {`${account.slice(0, 6)}...${account.slice(-6)}`}
                  </Text>
                )}
              </WalletInfoContainer>
              <Network>
                <Row>
                  <Dot
                    className="mr10"
                    success={networkAllowed}
                    error={!networkAllowed}
                  />
                  <Heading
                    level={3}
                    size="small"
                    color="blueDark"
                    className="mt0"
                  >
                    <FormattedMessage defaultMessage="Network" />
                  </Heading>
                </Row>
                <Text color={networkAllowed ? 'greenDark' : 'redMedium'}>
                  {network === 'Mainnet' ? network : `${network} testnet`}
                </Text>
              </Network>
              <div>
                {!networkAllowed && (
                  <>
                    <StatusText className="mt10">{status}</StatusText>
                  </>
                )}
              </div>
              {networkAllowed && (
                <>
                  <Balance>
                    <Row>
                      <Dot
                        className="mr10"
                        success={!lowBalance}
                        error={lowBalance}
                      />
                      <Heading level={3} size="small" color="blueDark">
                        <FormattedMessage defaultMessage="Balance" />
                      </Heading>
                    </Row>
                    <StatusText className="mt10">{status}</StatusText>
                  </Balance>
                  <div>
                    {networkAllowed && lowBalance && (
                      <>
                        <FormattedMessage
                          defaultMessage="You do not have enough {eth} in this account for
                          {numberOfValidators} {validator}"
                          values={{
                            numberOfValidators: depositKeys.length,
                            eth: TICKER_NAME,
                            validator:
                              depositKeys.length > 1
                                ? formatMessage({
                                    defaultMessage: 'validators',
                                  })
                                : formatMessage({
                                    defaultMessage: 'validator',
                                  }),
                          }}
                        />
                      </>
                    )}
                    {!IS_MAINNET && lowBalance && (
                      <FaucetLink
                        to="https://faucet.goerli.mudit.blog/"
                        primary
                      >
                        <FormattedMessage
                          defaultMessage="Get {TICKER_NAME}"
                          values={{
                            TICKER_NAME,
                          }}
                        />
                      </FaucetLink>
                    )}
                  </div>
                </>
              )}
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
            <WalletButtonSubContainer>
              <WalletButton
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                logoSource={metamaskLogo}
                walletProvider={metamask}
                title="Metamask"
                error={walletProvider === metamask ? error : undefined}
              />

              <WalletButton
                invalid={PORTIS_DAPP_ID === ''}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                logoSource={portisLogo}
                walletProvider={portis}
                title="Portis"
                error={walletProvider === portis ? error : undefined}
              />

              <WalletButton
                invalid={!ENABLE_RPC_FEATURES}
                selectedWallet={selectedWallet}
                setSelectedWallet={setSelectedWallet}
                logoSource={fortmaticLogo}
                walletProvider={fortmatic}
                title="Fortmatic"
                error={walletProvider === fortmatic ? error : undefined}
              />
              <MetamaskHardwareButton />
            </WalletButtonSubContainer>
          </Animated>
        </WalletButtonContainer>
      </Container>

      {error && error instanceof NoEthereumProviderError && (
        <MetaMaskError>
          <Text className="mb30">
            <FormattedMessage defaultMessage="We can't detect MetaMask. Switch browsers or install MetaMask." />
          </Text>
          <Link isTextLink={false} to="https://metamask.io/">
            <Button
              className="mr10"
              label={formatMessage({ defaultMessage: 'Download MetaMask' })}
            />
          </Link>
        </MetaMaskError>
      )}

      {isInvalidNetwork && (
        <div className="flex center mt20">
          <FormattedMessage
            defaultMessage="Your wallet is on the wrong network. Switch to {network}"
            values={{
              network: IS_MAINNET ? 'Ethereum mainnet' : 'Göerli testnet',
            }}
          />
        </div>
      )}

      <ButtonRow>
        {!walletConnected && (
          <Link to={routesEnum.uploadValidatorPage}>
            <Button
              className="mr10"
              width={100}
              label={formatMessage({ defaultMessage: 'Back' })}
            />
          </Link>
        )}
        {walletConnected && (
          <Button
            width={300}
            onClick={deactivate}
            label={formatMessage({ defaultMessage: 'Connect new wallet' })}
            className="mr10"
            color="blueDark"
          />
        )}
        <Link to={routesEnum.summaryPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={
              !walletProvider ||
              !walletConnected ||
              !networkAllowed ||
              lowBalance
            }
            label={formatMessage({ defaultMessage: 'Continue' })}
          />
        </Link>
      </ButtonRow>
    </WorkflowPageTemplate>
  );
};

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: step => dispatch(updateWorkflow(step)),
});

const mapStateToProps = ({
  workflow,
  depositFile,
}: StoreState): StateProps => ({
  workflow,
  depositKeys: depositFile.keys,
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
