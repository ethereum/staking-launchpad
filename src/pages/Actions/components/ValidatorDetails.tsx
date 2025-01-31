import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';
import styled from 'styled-components';

import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { Section, CopyContainer } from './Shared';

import { Validator } from '../types';

import { hasValidatorExited } from '../../../utils/validators';
import { TICKER_NAME } from '../../../utils/envVars';

const Hash = styled.span`
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  flex: 1;
  font-family: monospace;
`;

const ValidatorDetails = ({ validator }: { validator: Validator }) => {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const onCopy = (key: string) => {
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const prefix = validator.withdrawalcredentials.slice(0, 4);
  return (
    <Section>
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

        {hasValidatorExited(validator) && (
          <Text>
            <FormattedMessage defaultMessage="Exit Epoch" />:{' '}
            {validator.exitepoch}
          </Text>
        )}

        <Text>
          <FormattedMessage defaultMessage="Withdrawal credential type" />:{' '}
          <span style={{ fontFamily: 'monospace' }}>{prefix}</span>
        </Text>
      </div>
    </Section>
  );
};

export default ValidatorDetails;
