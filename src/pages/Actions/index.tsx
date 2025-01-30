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

import { Button } from '../../components/Button';
import { PageTemplate } from '../../components/PageTemplate';
import { Alert } from '../../components/Alert';
import Select from '../../components/Select';
import Spinner from '../../components/Spinner';
import { Text } from '../../components/Text';

import { web3ReactInterface } from '../ConnectWallet';
import { AllowedELNetworks, NetworkChainId } from '../ConnectWallet/web3Utils';
import WalletConnectModal from '../TopUp/components/WalletConnectModal';

import {
  BEACONCHAIN_URL,
  ETHER_TO_GWEI,
  TICKER_NAME,
} from '../../utils/envVars';

const Container = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;
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

  const handleConnect = useCallback((): void => {
    setLoading(true);
    deactivate();
  }, [setLoading, deactivate]);

  // an effect that fetches validators from beaconchain when the user connects or changes their wallet
  useEffect(() => {
    const fetchValidatorsForUserAddress = async () => {
      setLoading(true);

      // beaconchain API requires two fetches - one that gets the public keys for an Ethereum address, and one that
      // queries by the validators public keys
      fetch(
        `${BEACONCHAIN_URL}/api/v1/validator/withdrawalCredentials/${account}?limit=100`
      )
        .then(r => r.json())
        .then(
          ({
            data,
          }: {
            data: BeaconChainValidatorResponse[] | BeaconChainValidatorResponse;
          }) => {
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
                    data: BeaconChainValidator | BeaconChainValidator[];
                  }) => {
                    const validatorsData = Array.isArray(data) ? data : [data];
                    setValidators(
                      validatorsData.map(v => {
                        const coinBalance = new BigNumber(v.balance)
                          .div(ETHER_TO_GWEI)
                          .toNumber();

                        return {
                          ...v,
                          balanceDisplay: `${coinBalance}${TICKER_NAME}`,
                          coinBalance,
                        };
                      })
                    );
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

  const actionsPageContent = useMemo(() => {
    if (loading) {
      return <Spinner className="mt40" />;
    }

    if (!active) {
      return (
        <Container>
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
        </Container>
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
          <FakeLink onClick={handleConnect}>
            <FormattedMessage defaultMessage="Please connect to a new wallet" />
          </FakeLink>
        </Alert>
      );
    }

    return (
      <>
        <Container>
          <Text>
            <FormattedMessage defaultMessage="Select a validator" />
          </Text>
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
        </Container>

        {selectedValidator && (
          <ValidatorActions
            validator={selectedValidator}
            validators={validators}
          />
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
