import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { Section, CopyContainer } from './Shared';

import { Validator } from '../types';

import { hasValidatorExited } from '../../../utils/validators';
import { TICKER_NAME } from '../../../utils/envVars';
import { epochToDate } from '../../../utils/beaconchain';

const Hash = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  font-family: monospace;
`;

const ValidatorDetails = ({ validator }: { validator: Validator }) => {
  const { locale } = useIntl();
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const onCopy = (key: string) => {
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const prefix = validator.withdrawalcredentials.slice(0, 4);
  const hasExitCompleted =
    hasValidatorExited(validator) &&
    epochToDate(validator.exitepoch).getTime() < Date.now();
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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

        <Text>
          <FormattedMessage defaultMessage="Balance" />:{' '}
          {validator.coinBalance.toString()} {TICKER_NAME}
        </Text>

        <Text>
          <FormattedMessage defaultMessage="Activation Epoch" />:{' '}
          {validator.activationepoch}
        </Text>

        <Text>
          <FormattedMessage defaultMessage="Withdrawal credential type" />:{' '}
          <span style={{ fontFamily: 'monospace' }}>{prefix}</span>
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
                <FormattedMessage defaultMessage="The exit epoch for this validator has been reached. The remaining balance will automatically be transferred to your connected withdrawal account within the next few days." />
              ) : (
                <FormattedMessage defaultMessage="The remaining balance will be unlocked after the above exit epoch has been reached. Once unlocked, the remaining balance will automatically be transferred to your connected withdrawal account within a few days." />
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
