import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';
import { Button as GrommetButton } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import {
  BeaconChainValidator,
  BeaconChainValidatorResponse,
} from '../TopUp/types';
import { Props, Validator, ValidatorType } from './types';

import ValidatorActions from './components/ValidatorActions';

import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { PageTemplate } from '../../components/PageTemplate';
import { Section } from './components/Shared';
import { Text } from '../../components/Text';
import Spinner from '../../components/Spinner';
import ValidatorDetails from './components/ValidatorDetails';
import ValidatorSelector from './components/ValidatorSelector';

import { web3ReactInterface } from '../ConnectWallet';
import { AllowedELNetworks, NetworkChainId } from '../ConnectWallet/web3Utils';
import WalletConnectModal from '../TopUp/components/WalletConnectModal';

import {
  BEACONCHAIN_URL,
  ETHER_TO_GWEI,
  TICKER_NAME,
} from '../../utils/envVars';
import { hasValidatorExited } from '../../utils/validators';
import HelpCallout from '../../components/HelpCallout';

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
): Promise<Validator[] | null> => {
  try {
    const response = await fetch(
      `${BEACONCHAIN_URL}/api/v1/validator/${pubkeys.join(',')}`
    );
    if (!response.ok) throw new Error();
    const json = await response.json();
    const data: BeaconChainValidator[] = Array.isArray(json.data)
      ? json.data
      : [json.data];

    return data.map(v => ({
      ...v,
      coinBalance: new BigNumber(v.balance).div(ETHER_TO_GWEI).toNumber(),
      type: +v.withdrawalcredentials.slice(0, 4) as ValidatorType,
    }));
  } catch (error) {
    console.warn(
      `Error fetching validators (pubkeys ${pubkeys.join(',')}):`,
      error
    );
    return null;
  }
};

const _ActionsPage: React.FC<Props> = () => {
  const {
    account,
    active,
    chainId,
    deactivate,
  }: web3ReactInterface = useWeb3React<Web3Provider>();
  const { formatMessage } = useIntl();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(
    null
  );
  const [validatorLoadError, setValidatorLoadError] = React.useState<boolean>(
    false
  );
  const [validators, setValidators] = useState<Validator[]>([]);

  const [fetchOffset, setFetchOffset] = useState(0);

  const handleConnect = useCallback((): void => {
    setLoading(true);
    deactivate();
  }, [setLoading, deactivate]);

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

          <div style={{ display: 'flex', gap: '1rem' }}>
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
              <ValidatorActions
                validator={selectedValidator}
                validators={validators}
              />
            )}
          </>
        )}
      </>
    );
  }, [
    loading,
    active,
    selectedValidator,
    validators,
    formatMessage,
    handleConnect,
    validatorLoadError,
    fetchMoreValidators,
    moreToFetch,
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
