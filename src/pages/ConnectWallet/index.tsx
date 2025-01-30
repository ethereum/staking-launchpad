import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  AllowedELNetworks,
  fortmatic,
  metamask,
  NetworkChainId,
  useMetamaskEagerConnect,
  useMetamaskListener,
} from './web3Utils';
import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { WalletButton } from './WalletButton';
import metamaskLogo from '../../static/metamask.svg';
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
  ENABLE_RPC_FEATURES,
  IS_MAINNET,
  TICKER_NAME,
  IS_NON_INFURA_TESTNET,
  FAUCET_URL,
  ETHER_TO_GWEI,
} from '../../utils/envVars';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { MetamaskHardwareButton } from './MetamaskHardwareButton';
import useIntlNetworkName from '../../hooks/useIntlNetworkName';

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
  margin-inline: auto;
  @media only screen and (max-width: ${p => p.theme.screenSizes.large}) {
    width: 100%;
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
  gap: 10px;
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
  gap: 10px;
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
  const { executionLayerName } = useIntlNetworkName();

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
  const balanceRef = useRef<number | null>(null);
  const { formatMessage } = useIntl();

  // sets balanceRef to always have current balance (to refer to in callbacks)
  balanceRef.current = balance;

  // setup RPC event listener
  const attemptedMMConnection: boolean = useMetamaskEagerConnect();
  useMetamaskListener(!attemptedMMConnection);

  // sets the balance to the current wallet on provider or network change
  useEffect((): any => {
    if (!!account && !!library) {
      library
        .getBalance(account)
        .then((wei: any) => {
          const etherBalance = Number(
            parseFloat(formatEther(wei)).toPrecision(5)
          );

          const gweiBalance = etherBalance * ETHER_TO_GWEI;

          const requiredGweiBalance = depositKeys.reduce(
            (acc, key) => acc + key.amount,
            0
          );

          setBalance(etherBalance);

          setLowBalance(gweiBalance < requiredGweiBalance || gweiBalance === 0);
        })
        .catch(() => setBalance(null));
      return () => setBalance(null);
    }
  }, [selectedWallet, walletProvider, library, chainId, depositKeys, account]);

  // adds event emitter to listen to new blocks & update balance if it changed
  useEffect((): any => {
    if (!!account && !!library) {
      library.on('block', () => {
        library
          .getBalance(account)
          .then((wei: any) => {
            const etherBalance = Number(
              parseFloat(formatEther(wei)).toPrecision(5)
            );

            const gweiBalance = etherBalance * ETHER_TO_GWEI;

            if (etherBalance !== balanceRef.current) {
              setBalance(etherBalance);
              const requiredGweiBalance = depositKeys.reduce(
                (acc, key) => acc + key.amount,
                0
              );
              setLowBalance(
                gweiBalance < requiredGweiBalance || gweiBalance === 0
              );
            }
          })
          .catch(() => setBalance(null));
      });

      return () => library.off('block');
    }
  }, [library, account, depositKeys]);

  const getWalletName = (provider?: AbstractConnector) => {
    if (!provider) return '';
    if (provider === metamask) return 'Metamask';
    if (provider === fortmatic) return 'Fortmatic';
    return '';
  };

  // sets the status copy on provider or network change
  useEffect(() => {
    if (chainId) {
      setNetwork(NetworkChainId[chainId]);
      setNetworkAllowed(AllowedELNetworks.includes(network));
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
          { defaultMessage: 'Connect {wallet} to {executionLayerName}' },
          {
            wallet: getWalletName(walletProvider),
            executionLayerName,
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
    executionLayerName,
  ]);

  const withdrawalAddress = useMemo<string>(() => {
    // eslint-disable-next-line camelcase
    const credentials = depositKeys[0]?.withdrawal_credentials ?? '';
    if (credentials.startsWith('01')) return `0x${credentials.slice(-40)}`;
    return '';
  }, [depositKeys]);
  const withdrawalAddressShort = useMemo<string>(
    () => `${withdrawalAddress.slice(0, 6)}...${withdrawalAddress.slice(-4)}`,
    [withdrawalAddress]
  );

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
        {walletConnected ? (
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
                    <Dot success={networkAllowed} error={!networkAllowed} />
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
                    {executionLayerName}
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
                        <Dot success={!lowBalance} error={lowBalance} />
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
                        <FaucetLink to={FAUCET_URL} primary>
                          <FormattedMessage
                            defaultMessage="Get {TICKER_NAME}"
                            values={{
                              TICKER_NAME,
                            }}
                          />
                        </FaucetLink>
                      )}
                    </div>
                    <Alert
                      variant={withdrawalAddress ? 'warning' : 'error'}
                      className="mt20"
                    >
                      {withdrawalAddress ? (
                        <FormattedMessage
                          defaultMessage="The withdrawal address for these validators will be set to {withdrawalAddress}.
                        Make 100% sure you control this address before depositing, as this cannot be changed."
                          values={{
                            withdrawalAddress: (
                              <span title={withdrawalAddress}>
                                {withdrawalAddressShort}
                              </span>
                            ),
                          }}
                        />
                      ) : (
                        <FormattedMessage
                          defaultMessage="A withdrawal address has not been set for these validators.
                        Staked funds and rewards will remain locked until withdrawal credentials are provided."
                        />
                      )}
                    </Alert>
                  </>
                )}
              </Paper>
            </Animated>
          </WalletConnectedContainer>
        ) : (
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
                {!IS_NON_INFURA_TESTNET && (
                  <WalletButton
                    invalid={!ENABLE_RPC_FEATURES}
                    selectedWallet={selectedWallet}
                    setSelectedWallet={setSelectedWallet}
                    logoSource={fortmaticLogo}
                    walletProvider={fortmatic}
                    title="Fortmatic"
                    error={walletProvider === fortmatic ? error : undefined}
                  />
                )}
                <MetamaskHardwareButton />
              </WalletButtonSubContainer>
            </Animated>
          </WalletButtonContainer>
        )}
      </Container>

      {error && error instanceof NoEthereumProviderError && (
        <MetaMaskError>
          <Text className="mb30">
            <FormattedMessage defaultMessage="We can't detect MetaMask. Switch browsers or install MetaMask." />
          </Text>
          <Link isTextLink={false} to="https://metamask.io/">
            <Button
              label={formatMessage({ defaultMessage: 'Download MetaMask' })}
            />
          </Link>
        </MetaMaskError>
      )}

      {isInvalidNetwork && (
        <div className="flex center mt20">
          <FormattedMessage
            defaultMessage="Your wallet is on the wrong network. Switch to {executionLayerName}"
            values={{ executionLayerName }}
          />
        </div>
      )}

      <ButtonRow>
        {!walletConnected && (
          <Link to={routesEnum.uploadValidatorPage}>
            <Button
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
