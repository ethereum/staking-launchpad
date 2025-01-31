import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Text } from '../../../components/Text';

import { Validator } from '../types';

import { hasValidatorExited } from '../../../utils/validators';
import { Section, CopyContainer } from './Shared';
import { TICKER_NAME } from '../../../utils/envVars';

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
        <Text
          style={{
            fontWeight: 'bold',
            textTransform: 'uppercase',
            fontSize: '1.25rem',
            marginBottom: '0.5rem',
          }}
        >
          <FormattedMessage defaultMessage="Validator Index" />{' '}
          {validator.validatorindex}
        </Text>

        <Text>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              style={{
                display: 'block',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                flex: 1,
                fontFamily: 'monospace',
              }}
            >
              {validator.pubkey}
            </span>
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
