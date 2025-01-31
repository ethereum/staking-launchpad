import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { Web3Provider } from '@ethersproject/providers';
import { useWeb3React } from '@web3-react/core';
import BigNumber from 'bignumber.js';

import {
  BeaconChainValidator,
  BeaconChainValidatorResponse,
} from '../TopUp/types';
import { Props, Validator } from './types';

import ValidatorActions from './components/ValidatorActions';

import { Alert } from '../../components/Alert';
import { Button } from '../../components/Button';
import { PageTemplate } from '../../components/PageTemplate';
import { Section } from './components/Shared';
import { Text } from '../../components/Text';
import Select from '../../components/Select';
import Spinner from '../../components/Spinner';
import ValidatorDetails from './components/ValidatorDetails';

import { web3ReactInterface } from '../ConnectWallet';
import { AllowedELNetworks, NetworkChainId } from '../ConnectWallet/web3Utils';
import WalletConnectModal from '../TopUp/components/WalletConnectModal';

import {
  BEACONCHAIN_URL,
  ETHER_TO_GWEI,
  TICKER_NAME,
} from '../../utils/envVars';

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
      // balanceDisplay: `${coinBalance}${TICKER_NAME}`,
      coinBalance: new BigNumber(v.balance).div(ETHER_TO_GWEI).toNumber(),
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
        <Alert variant="warning" className="my10">
          <FormattedMessage defaultMessage="There was an error trying to get the validators for the provided wallet. Please try again or seek assistance if this error continues." />
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
          <Text>
            <FormattedMessage defaultMessage="Select a validator" />
          </Text>

          <div style={{ display: 'flex', gap: '1rem' }}>
            <Select
              placeholder={`Total validators: ${validators.length}`}
              searchPlaceholder={formatMessage({
                defaultMessage: 'Filter by index or pubkey',
              })}
              options={validators.map(v => ({
                value: v.pubkey,
                searchContext: `${v.validatorindex.toString()}:${v.pubkey}`,
                label: (
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '1fr auto',
                      flex: 1,
                      gap: '1rem',
                      width: '100%',
                    }}
                  >
                    <p style={{ margin: 0, textAlign: 'start' }}>
                      {v.validatorindex.toString()}
                    </p>
                    <p
                      style={{
                        margin: 0,
                        textAlign: 'end',
                        marginInlineStart: 'auto',
                        fontSize: '0.75em',
                        color: '#444',
                      }}
                    >
                      {(v.balance / ETHER_TO_GWEI).toFixed(9)} {TICKER_NAME}
                    </p>
                  </div>
                ),
              }))}
              value={selectedValidator?.pubkey || ''}
              onChange={(value: string) => {
                const validator = validators.find(v => v.pubkey === value);
                setSelectedValidator(validator || null);
              }}
            />
            {moreToFetch && (
              <Button
                label={
                  <FormattedMessage
                    defaultMessage="Fetch next {MAX_QUERY_LIMIT}"
                    values={{ MAX_QUERY_LIMIT }}
                  />
                }
                onClick={fetchMoreValidators}
              />
            )}
          </div>
        </Section>

        {selectedValidator && (
          <>
            <ValidatorDetails validator={selectedValidator} />

            <ValidatorActions
              validator={selectedValidator}
              validators={validators}
            />
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
      </PageTemplate>
    </>
  );
};

export const ActionsPage = _ActionsPage;
