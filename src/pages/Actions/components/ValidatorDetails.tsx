import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import CopyToClipboard from 'react-copy-to-clipboard';

import { Text } from '../../../components/Text';

import { Validator } from '../types';

import { hasValidatorExited } from '../../../utils/validators';
import { Section, CopyContainer } from './Shared';

const ValidatorDetails = ({ validator }: { validator: Validator }) => {
  const [copied, setCopied] = useState<{ [key: string]: boolean }>({});

  const onCopy = (key: string) => {
    setCopied(prev => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopied(prev => ({ ...prev, [key]: false }));
    }, 2000);
  };

  return (
    <Section>
      <Text>
        <FormattedMessage defaultMessage="Validator Index" />:{' '}
        {validator.validatorindex}
      </Text>
      <Text>
        <FormattedMessage defaultMessage="Public Key" />:{' '}
        {validator.pubkey.slice(0, 10)}...{validator.pubkey.slice(-10)}{' '}
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
      </Text>
      <Text>
        <FormattedMessage
          defaultMessage="Balance: {balance}"
          values={{ balance: validator.balanceDisplay }}
        />
      </Text>
      <Text>
        <FormattedMessage
          defaultMessage="Activation Epoch: {epoch}"
          values={{ epoch: validator.activationepoch }}
        />
      </Text>
      {hasValidatorExited(validator) && (
        <Text>
          <FormattedMessage defaultMessage="Exit Epoch" />:{' '}
          {validator.exitepoch}
        </Text>
      )}
      <Text>
        <FormattedMessage
          defaultMessage="Withdrawal Credentails: {credentials}"
          values={{
            credentials: `${validator.withdrawalcredentials.slice(
              0,
              10
            )}...${validator.withdrawalcredentials.slice(-10)}`,
          }}
        />
      </Text>
    </Section>
  );
};

export default ValidatorDetails;
