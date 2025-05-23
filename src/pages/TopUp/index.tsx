import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import styled from 'styled-components';
import { FormPrevious } from 'grommet-icons';
import { Alert as AlertIcon } from 'grommet-icons/icons';
import {
  BeaconChainValidator,
  BeaconChainValidatorResponse,
  Props,
} from './types';
import { Text } from '../../components/Text';
import { web3ReactInterface } from '../ConnectWallet';
import WalletConnectModal from './components/WalletConnectModal';
import ValidatorTable from './components/ValidatorTable';
import TopupPage from './components/TopupPage';
import Spinner from '../../components/Spinner';
import { PageTemplate } from '../../components/PageTemplate';
import {
  BEACONCHAIN_URL,
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  EJECTION_PRICE,
  TICKER_NAME,
} from '../../utils/envVars';
import { AllowedELNetworks, NetworkChainId } from '../ConnectWallet/web3Utils';
import { Alert } from '../../components/Alert';
import { Link } from '../../components/Link';
import { Button } from '../../components/Button';

const Arrow = styled(props => <FormPrevious {...props} />)`
  position: absolute;
  left: 0;
  color: ${p => p.theme.blue.medium};
`;

const SubTextContainer = styled.div``;

const BackText = styled(Text)`
  margin-top: -25px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
  position: relative;
  padding-inline-start: 25px;
`;

const FakeLink = styled.span`
  color: blue;
  text-decoration: underline;
  cursor: pointer;
  display: inline;
`;

const ButtonLink = styled(FakeLink)`
  text-decoration: none;
  width: fit-content;
  button {
    padding: 16px 32px;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  @media screen and (max-width: 518px) {
    span,
    button {
      width: 100%;
    }
  }
`;

const _TopUpPage: React.FC<Props> = () => {
  const {
    account,
    active,
    chainId,
    deactivate,
  }: web3ReactInterface = useWeb3React<Web3Provider>();
  const [validators, setValidators] = useState<BeaconChainValidator[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [validatorLoadError, setValidatorLoadError] = React.useState<boolean>(
    false
  );
  const [
    showDepositVerificationWarning,
    setShowDepositVerificationWarning,
  ] = React.useState(false);

  const { formatMessage } = useIntl();

  // an effect that fetches validators from beaconchain when the user connects or changes their wallet
  useEffect(() => {
    const fetchValidatorsForUserAddress = async () => {
      setLoading(true);

      // beaconchain API requires two fetches - one that gets the public keys for an Ethereum address, and one that
      // queries by the validators public keys

      fetch(`${BEACONCHAIN_URL}/api/v1/validator/eth1/${account}`)
        .then(r => r.json())
        .then(
          ({
            data,
          }: {
            data: BeaconChainValidatorResponse[] | BeaconChainValidatorResponse;
          }) => {
            setShowDepositVerificationWarning(false);
            const response = Array.isArray(data) ? data : [data];
            // no validators for that user's wallet address
            if (response.length === 0) {
              setValidators([]);
              setLoading(false);
              return;
            }

            if (response.length === 0) {
              setValidators([]);
              setLoading(false);
            } else {
              // query by public keys
              const pubKeysCommaDelineated = `${response
                .slice(0, 50)
                .map(validator => validator.publickey)
                .join(',')}`;

              fetch(
                `${BEACONCHAIN_URL}/api/v1/validator/${pubKeysCommaDelineated}`
              )
                .then(r => r.json())
                .then(
                  ({
                    data,
                  }: {
                    data: BeaconChainValidator[] | BeaconChainValidator;
                  }) => {
                    const validatorsResponse = Array.isArray(data)
                      ? data
                      : [data];
                    if (validatorsResponse.length === 0) {
                      setShowDepositVerificationWarning(true);
                      setValidators([]);
                    } else {
                      setValidators(
                        validatorsResponse as BeaconChainValidator[]
                      );
                    }
                    setLoading(false);
                  }
                )
                .catch(error => {
                  console.log(error);
                  setLoading(false);
                  setValidatorLoadError(true);
                });
            }
          }
        )
        .catch(error => {
          console.log(error);
          setLoading(false);
          setValidatorLoadError(true);
        });
    };

    const network = NetworkChainId[chainId as number];

    const isValidNetwork = AllowedELNetworks.includes(network);

    if (active && account && isValidNetwork) {
      fetchValidatorsForUserAddress();
    }
  }, [account, active, chainId]);

  const [
    selectedValidator,
    setSelectedValidator,
  ] = useState<BeaconChainValidator | null>(null);

  const handleConnect = useCallback((): void => {
    setLoading(true);
    deactivate();
  }, [setLoading, deactivate]);

  const handleModalClose = useCallback((): void => {
    setLoading(false);
  }, [setLoading]);

  const BackButton = () => {
    if (!selectedValidator) return null;
    return (
      <BackText
        onClick={() => setSelectedValidator(null)}
        color="blueMedium"
        style={{ marginTop: '2px', marginBottom: '1rem' }}
      >
        <Arrow />
        <FormattedMessage defaultMessage="All validators" />
      </BackText>
    );
  };
  const topUpPageContent = useMemo(() => {
    if (loading) {
      return <Spinner className="mt40" />;
    }

    if (!active) {
      return (
        <ButtonContainer>
          <ButtonLink onClick={handleConnect}>
            <Button
              rainbow
              label={formatMessage({ defaultMessage: 'Connect wallet' })}
            />
          </ButtonLink>
        </ButtonContainer>
      );
    }
    if (validatorLoadError) {
      return (
        <Alert variant="warning" className="my10">
          <div
            style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
          >
            <AlertIcon color="redLight" />
            <Text>
              <FormattedMessage defaultMessage="There was an error loading your validator information from Beaconcha.in" />
            </Text>
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Text className="mt20">
              <FormattedMessage
                defaultMessage="You can {reloadYourWallet} to try again, or refresh the page. If issue persists, let us know on {github}."
                values={{
                  reloadYourWallet: (
                    <FakeLink onClick={deactivate}>
                      <FormattedMessage defaultMessage="reload your wallet" />
                    </FakeLink>
                  ),
                  github: (
                    <Link
                      inline
                      primary
                      to="https://github.com/ethereum/staking-launchpad/issues/new"
                    >
                      GitHub
                    </Link>
                  ),
                }}
                description="{reloadYourWallet} is a link labeled 'reload your wallet'"
              />
            </Text>
          </div>
        </Alert>
      );
    }

    if (selectedValidator) {
      return (
        <TopupPage validator={selectedValidator} backButton={<BackButton />} />
      );
    }

    return (
      <>
        {showDepositVerificationWarning && (
          <Alert variant="warning" className="my10">
            <div
              style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}
            >
              <AlertIcon color="redLight" />
              <Text>
                <FormattedMessage
                  defaultMessage="You may have an {TICKER_NAME} deposit that was accepted but is being
                    validated on chain. It will be available here when beaconcha.in
                    has confirmed 2048 blocks."
                  values={{ TICKER_NAME }}
                />
              </Text>
            </div>
          </Alert>
        )}
        <ValidatorTable
          validators={validators}
          setSelectedValidator={setSelectedValidator}
          handleConnect={handleConnect}
        />
      </>
    );
  }, [
    loading,
    validatorLoadError,
    selectedValidator,
    active,
    validators,
    showDepositVerificationWarning,
    deactivate,
    formatMessage,
    handleConnect,
  ]);

  return (
    <>
      {/* the wallet connect modal controls it's own display, so it is always rendered here */}
      <WalletConnectModal
        loading={loading}
        handleModalClose={handleModalClose}
      />

      <PageTemplate
        title={formatMessage({ defaultMessage: 'Top up a validator' })}
      >
        {/* render a "back button" if there's a selected validator */}
        <BackButton />

        <SubTextContainer className="my20">
          <Text className="mb20">
            <FormattedMessage
              defaultMessage='You have the option to add funds to your validator account, as long as your balance is not already at its max effective balance ("max EB", the amount capable of contributing to your stake). 
              You can also use this to top up if your validator account is close to the ejection balance of {EJECTION_PRICE} {TICKER_NAME}.'
              values={{
                MIN_ACTIVATION_BALANCE,
                TICKER_NAME,
                EJECTION_PRICE,
              }}
            />
          </Text>
          <Text className="mb20">
            <FormattedMessage
              defaultMessage="By adding funds to an account not yet at its max EB, you can increase your validator's effective staking balance which is used to calculate both rewards and penalties.
                Your effective balance is determined from your true balance, and increments/decrements in whole integer units."
              values={{
                MIN_ACTIVATION_BALANCE,
                TICKER_NAME,
                EJECTION_PRICE,
              }}
            />
          </Text>
          <Text className="mb20">
            <FormattedMessage
              defaultMessage="The max EB for any account with Type 0 (BLS) or Type 1 (regular withdrawals) withdrawal credentials is {MIN_ACTIVATION_BALANCE} {TICKER_NAME}. These accounts do not benefit from balances over {MIN_ACTIVATION_BALANCE}, but can be upgraded to a Type 2 compounding account to support an increased max EB of {MAX_EFFECTIVE_BALANCE}."
              values={{
                MAX_EFFECTIVE_BALANCE,
                MIN_ACTIVATION_BALANCE,
                TICKER_NAME,
              }}
            />{' '}
          </Text>
          <Text className="mb20">
            <Link
              inline
              primary
              to="https://www.attestant.io/posts/understanding-validator-effective-balance/"
            >
              <FormattedMessage defaultMessage="More on effective balance" />
            </Link>
          </Text>
        </SubTextContainer>

        {/* the main content for the topup page */}
        {topUpPageContent}
      </PageTemplate>
    </>
  );
};

export const TopUpPage = _TopUpPage;
