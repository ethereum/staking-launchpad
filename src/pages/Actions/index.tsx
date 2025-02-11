import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import { Button as GrommetButton } from 'grommet';
import { Alert as AlertIcon, FormRefresh as RefreshIcon } from 'grommet-icons';
import {
  BeaconChainValidator,
  BeaconChainValidatorResponse,
} from '../TopUp/types';

import ValidatorActions from './components/ValidatorActions';

import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { PageTemplate } from '../../components/PageTemplate';
import { Section } from './components/Shared';
import { Text } from '../../components/Text';
import HelpCallout from '../../components/HelpCallout';
import Spinner from '../../components/Spinner';
import ValidatorDetails from './components/ValidatorDetails';
import ValidatorSelector from './components/ValidatorSelector';

import { web3ReactInterface } from '../ConnectWallet';
import { AllowedELNetworks, NetworkChainId } from '../ConnectWallet/web3Utils';
import WalletConnectModal from '../TopUp/components/WalletConnectModal';

import { BEACONCHAIN_URL, TICKER_NAME } from '../../utils/envVars';
import { hasValidatorExited } from '../../utils/validators';

// https://beaconcha.in/api/v1/docs/index.html#/Validator/get_api_v1_validator__indexOrPubkey_
const MAX_QUERY_LIMIT = 100;

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

const FetchButton = styled(GrommetButton)`
  font-size: 1rem;
  border: 1px solid #ccc;
  background: transparent;
  border-radius: 4px;
  padding: 0.5rem 1rem;

  &:hover {
    background: rgba(0, 0, 0, 0.05);
    box-shadow: none;
  }
`;

const RefreshButton = styled(FetchButton)`
  display: flex;
  align-items: center;
  gap: 0.25rem;
  text-wrap: nowrap;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  &:disabled svg {
    animation: spin 1s linear infinite;
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

const AlertBody = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 32rem) {
    flex-direction: column;
  }
`;

const AlertText = styled(Text)`
  @media (max-width: 32rem) {
    text-align: center;
  }
`;

const fetchPubkeysByWithdrawalAddress = async (
  address: string,
  offset = 0,
  limit = MAX_QUERY_LIMIT
): Promise<string[] | null> => {
  try {
    const response = await fetch(
      `${BEACONCHAIN_URL}/api/v1/validator/withdrawalCredentials/${address}?limit=${limit}&offset=${offset}`
    );
    if (!response.ok) throw new Error();
    const json = await response.json();
    const data: BeaconChainValidatorResponse[] = Array.isArray(json.data)
      ? json.data
      : [json.data];

    return data.map(v => v.publickey);
  } catch (error) {
    console.warn(
      `Error fetching pubkeys (address ${address}, limit ${limit}, offset ${offset}):`,
      error
    );
    return null;
  }
};

const fetchValidatorsByPubkeys = async (
  pubkeys: string[]
): Promise<BeaconChainValidator[] | null> => {
  try {
    const response = await fetch(
      `${BEACONCHAIN_URL}/api/v1/validator/${pubkeys.join(',')}`
    );
    if (!response.ok) throw new Error();
    const json = await response.json();
    const data: BeaconChainValidator[] = Array.isArray(json.data)
      ? json.data
      : [json.data];

    return data;
  } catch (error) {
    console.warn(
      `Error fetching validators (pubkeys ${pubkeys.join(',')}):`,
      error
    );
    return null;
  }
};

const _ActionsPage = () => {
  const {
    account,
    active,
    chainId,
    deactivate,
  }: web3ReactInterface = useWeb3React<Web3Provider>();
  const { locale, formatMessage } = useIntl();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [
    selectedValidator,
    setSelectedValidator,
  ] = useState<BeaconChainValidator | null>(null);
  const [validatorLoadError, setValidatorLoadError] = useState(false);
  const [validators, setValidators] = useState<BeaconChainValidator[]>([]);
  const [lastUpdate, setLastUpdate] = useState<Record<string, number>>({});

  const [fetchOffset, setFetchOffset] = useState(0);

  const handleConnect = useCallback((): void => {
    setLoading(true);
    deactivate();
  }, [setLoading, deactivate]);

  const refreshValidator = useCallback(async () => {
    if (!selectedValidator || !active || !account) return;

    // Separate loading indicator?
    setRefreshing(true);

    const newValidator = await fetchValidatorsByPubkeys([
      selectedValidator.pubkey,
    ]);

    if (!newValidator) {
      setRefreshing(false);
      return;
    }

    // Update validators state
    const newValidators = validators.map(v =>
      v.pubkey === selectedValidator.pubkey ? newValidator[0] : v
    );
    setValidators(newValidators);
    setLastUpdate(prev => ({
      ...prev,
      [selectedValidator.pubkey]: Date.now(),
    }));
    setSelectedValidator(newValidator[0]);
    setRefreshing(false);
  }, [account, active, selectedValidator, validators]);

  const fetchMoreValidators = useCallback(async () => {
    if (!active || !account) return;

    setLoading(true);

    const pubkeys = await fetchPubkeysByWithdrawalAddress(account, fetchOffset);

    setFetchOffset(prev => prev + MAX_QUERY_LIMIT);

    if (!pubkeys) {
      setValidatorLoadError(fetchOffset === 0 && pubkeys === null);
      setLoading(false);
      return;
    }

    const newValidators = await fetchValidatorsByPubkeys(pubkeys);

    if (!newValidators) {
      setValidatorLoadError(fetchOffset === 0 && newValidators === null);
      setLoading(false);
      return;
    }

    setLastUpdate(prev => {
      const now = Date.now();
      const newTimestamps: Record<string, number> = {};
      pubkeys.forEach(pubkey => {
        newTimestamps[pubkey] = now;
      });
      return { ...prev, ...newTimestamps };
    });
    setValidators(prev => [...prev, ...newValidators]);
    setLoading(false);
  }, [active, account, fetchOffset]);

  // an effect that fetches validators from beaconchain when the user connects or changes their wallet
  useEffect(() => {
    const network = NetworkChainId[chainId as number];

    const isValidNetwork = AllowedELNetworks.includes(network);

    if (!active || !account || !isValidNetwork) return;

    fetchMoreValidators();
    // eslint-disable-next-line
  }, [account, active, chainId]);

  // Refresh active validator every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshValidator();
    }, 30_000);
    return () => clearInterval(interval);
  }, [refreshValidator]);

  const moreToFetch = validators.length === fetchOffset;

  const actionsPageContent = useMemo(() => {
    if (loading) {
      return <Spinner className="mt40" />;
    }

    if (!active) {
      return (
        <Section>
          <div className="mt20">
            <Text className="mt10">
              <FormattedMessage defaultMessage="Connect your wallet to retrieve validators with corresponding withdrawal credentials to upgrade to compounding, consolidate, partially withdraw, or force an exit" />
            </Text>
          </div>
          <ButtonContainer className="mt20">
            <ButtonLink onClick={handleConnect}>
              <Button
                rainbow
                label={formatMessage({ defaultMessage: 'Connect wallet' })}
              />
            </ButtonLink>
          </ButtonContainer>
        </Section>
      );
    }

    if (validatorLoadError) {
      return (
        <Alert variant="warning" className="mb10">
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <AlertIcon color="redLight" />
            <div>
              <Text className="mb10">
                <strong>
                  <FormattedMessage defaultMessage="No validators were found." />
                </strong>
              </Text>
              <Text className="mb10">
                <FormattedMessage
                  defaultMessage="You may have a deposit that was accepted but is being validated on chain.
                    It will be available here when beaconcha.in has confirmed 2048 blocks."
                  values={{ TICKER_NAME }}
                />
              </Text>
              <Text>
                <FormattedMessage defaultMessage="Please wait and try again or seek assistance if this error continues." />
              </Text>
            </div>
          </div>
        </Alert>
      );
    }

    if (active && !loading && validators.length === 0) {
      return (
        <Alert variant="warning" className="my10">
          <FormattedMessage defaultMessage="No validators were discovered for the provided account." />{' '}
          {/* TODO: Switch this to a button element */}
          <FakeLink onClick={handleConnect}>
            <FormattedMessage defaultMessage="Please connect to a new wallet" />
          </FakeLink>
        </Alert>
      );
    }

    return (
      <>
        <Section>
          <Text className="mb10">
            <FormattedMessage defaultMessage="Select a validator" />
          </Text>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <ValidatorSelector
              validators={validators}
              selectedValidator={selectedValidator}
              setSelectedValidator={setSelectedValidator}
            />
            {moreToFetch && (
              <FetchButton
                label={<FormattedMessage defaultMessage="Fetch more" />}
                onClick={fetchMoreValidators}
              />
            )}
          </div>
        </Section>

        {selectedValidator && (
          <>
            <ValidatorDetails validator={selectedValidator} />

            {!hasValidatorExited(selectedValidator) && (
              <>
                <div style={{ marginBottom: '1rem' }}>
                  <Alert variant="info">
                    <AlertBody>
                      <AlertIcon />
                      <AlertText>
                        <FormattedMessage defaultMessage="Recent transactions can take time to process and may not yet bet reflected in validator details. Use caution to avoid submitting duplicate requests." />
                      </AlertText>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                        }}
                      >
                        <RefreshButton
                          label={
                            <>
                              <RefreshIcon />
                              <FormattedMessage defaultMessage="Fetch latest" />
                            </>
                          }
                          disabled={refreshing}
                          onClick={refreshValidator}
                          size="small"
                        />
                        <Text
                          style={{
                            fontSize: '0.875rem',
                            color: 'darkslategray',
                            textAlign: 'center',
                            width: '100%',
                            marginTop: '0.25rem',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <FormattedMessage defaultMessage="Updated" />:{' '}
                          {new Date(
                            lastUpdate[selectedValidator.pubkey]
                          ).toLocaleTimeString(locale)}
                        </Text>
                      </div>
                    </AlertBody>
                  </Alert>
                </div>

                <ValidatorActions
                  validator={selectedValidator}
                  validators={validators}
                />
              </>
            )}
          </>
        )}
      </>
    );
  }, [
    active,
    fetchMoreValidators,
    formatMessage,
    handleConnect,
    lastUpdate,
    loading,
    locale,
    moreToFetch,
    refreshing,
    refreshValidator,
    selectedValidator,
    validatorLoadError,
    validators,
  ]);

  return (
    <>
      <WalletConnectModal
        loading={loading}
        handleModalClose={() => setLoading(false)}
      />
      <PageTemplate
        title={formatMessage({ defaultMessage: 'Validator Actions' })}
      >
        {actionsPageContent}

        <div className="mt30">
          <HelpCallout />
        </div>
      </PageTemplate>
    </>
  );
};

export const ActionsPage = _ActionsPage;
