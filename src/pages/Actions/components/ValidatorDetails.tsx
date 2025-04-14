import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { Heading } from '../../../components/Heading';
import { Link } from '../../../components/Link';
import { Text } from '../../../components/Text';
import { Section, CopyContainer, Hash } from './Shared';

import { ValidatorType } from '../types';
import { BeaconChainValidator } from '../../TopUp/types';

import { epochToDate } from '../../../utils/beaconchain';
import { BEACONCHAIN_URL } from '../../../utils/envVars';
import {
  hasValidatorExited,
  getCredentialType,
  getEtherBalance,
  getMaxEB,
  getEffectiveBalance,
} from '../../../utils/validators';

const BalancesContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, auto);
  gap: 1rem;
  text-align: center;
  margin: 1rem 0;

  @media (max-width: 32rem) {
    grid-template-columns: 1fr !important;
    grid-template-rows: auto !important;
  }
  @media (max-width: 32rem) {
    width: fit-content;
    margin-inline: auto;
  }
`;

const BalanceItem = styled.div`
  grid-column: span 1;
  grid-row: span 2;
  padding: 1rem;
  border-radius: 0.5rem;
  background: #f8f8f8;
  & > *:not(:last-child) {
    margin-bottom: 0.25rem;
  }
`;

const BalanceLabel = styled(Text)`
  font-size: 0.875rem;
  color: #444;
  text-transform: uppercase;
`;

const BalanceValue = styled(Text)`
  font-size: 1.5rem;
  font-weight: bold;
  font-family: monospace;
`;

const ValidatorDetails = ({
  validator,
}: {
  validator: BeaconChainValidator;
}) => {
  const { locale } = useIntl();
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const onCopy = (key: string) => {
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const hasExitCompleted =
    hasValidatorExited(validator) &&
    epochToDate(validator.exitepoch).getTime() < Date.now();

  const getStatus = (status: string) => {
    if (status === 'active_online')
      return <FormattedMessage defaultMessage="Active Online" />;
    if (status === 'active_offline')
      return <FormattedMessage defaultMessage="Active Offline" />;
    if (status === 'exiting_online')
      return <FormattedMessage defaultMessage="Exiting Online" />;
    if (status === 'exiting_offline')
      return <FormattedMessage defaultMessage="Exiting Offline" />;
    if (status === 'exited')
      return <FormattedMessage defaultMessage="Exited" />;
    return status
      .split('_')
      .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const getStatusColor = (status: string) => {
    if (status.includes('offline')) return '#e74c3c';
    if (status.includes('slash')) return '#e74c3c';
    if (status.includes('online')) return 'green';
    if (status.includes('exit')) return 'darkred';
    return 'inherit';
  };

  return (
    <Section
      style={{
        border: hasValidatorExited(validator) ? '2px solid darkred' : '',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <Heading
          level={2}
          style={{
            textTransform: 'uppercase',
            fontSize: '1.5rem',
          }}
        >
          <FormattedMessage defaultMessage="Validator Index" />{' '}
          {validator.validatorindex}
        </Heading>

        <Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Hash>{validator.pubkey}</Hash>
            <CopyToClipboard
              text={validator.pubkey.toString()}
              onCopy={() => onCopy('pubkey')}
            >
              <CopyContainer>
                {copied.pubkey ? (
                  <FormattedMessage defaultMessage="Copied ✓" />
                ) : (
                  <FormattedMessage defaultMessage="Copy" />
                )}
              </CopyContainer>
            </CopyToClipboard>
          </div>
        </Text>

        <Link primary to={`${BEACONCHAIN_URL}/validator/${validator.pubkey}`}>
          <FormattedMessage defaultMessage="View on beacon explorer" />
        </Link>

        <BalancesContainer>
          <BalanceItem>
            <BalanceValue>{getEtherBalance(validator).toFixed(9)}</BalanceValue>
            <BalanceLabel>
              <FormattedMessage defaultMessage="Balance" />
            </BalanceLabel>
          </BalanceItem>
          <BalanceItem>
            <BalanceValue>{getEffectiveBalance(validator)}</BalanceValue>
            <BalanceLabel>
              <FormattedMessage defaultMessage="Effective Balance" />
            </BalanceLabel>
          </BalanceItem>
          <BalanceItem>
            <BalanceValue>{getMaxEB(validator)}</BalanceValue>
            <BalanceLabel>
              <FormattedMessage defaultMessage="Max EB" />
            </BalanceLabel>
          </BalanceItem>
        </BalancesContainer>
        <Text>
          <FormattedMessage defaultMessage="Activation Epoch" />:{' '}
          {validator.activationepoch}
        </Text>

        <Text>
          <FormattedMessage defaultMessage="Status" />:{' '}
          <span style={{ color: getStatusColor(validator.status) }}>
            {getStatus(validator.status)}
          </span>
        </Text>

        <Text>
          <FormattedMessage defaultMessage="Withdrawal credential type" />:{' '}
          <span style={{ fontFamily: 'monospace' }}>
            {validator.withdrawalcredentials.slice(0, 4)}
          </span>{' '}
          {getCredentialType(validator) === ValidatorType.Compounding && (
            <span>
              <FormattedMessage defaultMessage="(Compounding)" />
            </span>
          )}
          {getCredentialType(validator) === ValidatorType.Execution && (
            <span>
              <FormattedMessage defaultMessage="(Regular withdrawals)" />
            </span>
          )}
        </Text>
      </div>
      {hasValidatorExited(validator) && (
        <div
          style={{
            borderTop: '1px solid #dedede',
            marginTop: '1rem',
            paddingTop: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          <Text>
            <strong>
              <FormattedMessage
                defaultMessage="Validator exit {pending} - no further performable actions"
                values={{
                  pending: hasExitCompleted ? (
                    ''
                  ) : (
                    <FormattedMessage defaultMessage="pending" />
                  ),
                }}
              />
            </strong>
          </Text>
          <Text>
            <FormattedMessage defaultMessage="Exit Epoch" />:{' '}
            {validator.exitepoch} (
            {epochToDate(validator.exitepoch).toLocaleTimeString(locale, {
              hour: '2-digit',
              minute: '2-digit',
              timeZoneName: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
            )
          </Text>
          {validator.balance > 0 && (
            <Text>
              {hasExitCompleted ? (
                <FormattedMessage defaultMessage="The exit epoch for this validator has been reached. The remaining balance will automatically be transferred to either your connected withdrawal account, or your chosen target validator if you're migrating accounts, within the next few days." />
              ) : (
                <FormattedMessage defaultMessage="The remaining balance will be unlocked after the above exit epoch has been reached. Once unlocked, the remaining balance will automatically be transferred to either your connected withdrawal account, or your chosen target validator if you're migrating accounts, within a few days." />
              )}{' '}
              <FormattedMessage defaultMessage="No further action is required." />
            </Text>
          )}
        </div>
      )}
    </Section>
  );
};

export default ValidatorDetails;
