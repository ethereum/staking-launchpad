import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Validator } from '../types';
import Consolidate from './Consolidate';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import UpgradeCompounding from './UpgradeCompounding';

import { Section as SharedSection } from './Shared';
import { hasValidatorExited } from '../../../utils/validators';
import {
  EXECUTION_CREDENTIALS,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
  MAX_EFFECTIVE_BALANCE,
} from '../../../utils/envVars';
import { Text } from '../../../components/Text';

const Section = styled(SharedSection)`
  display: flex;
  flex-direction: column;
  padding: 0;
`;

const Row = styled.div`
  display: flex;
  padding: 1rem;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  &:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }
`;

interface Props {
  validator: Validator;
  validators: Validator[];
}

const ValidatorActions: React.FC<Props> = ({ validator, validators }) => {
  const [targetValidators, setTargetValidators] = useState<Validator[]>([]);

  useEffect(() => {
    if (!validator || !validators) {
      setTargetValidators([]);
      return;
    }

    const potentialTargetValidators = validators.filter(v => {
      const isSamePrefix =
        v.withdrawalcredentials.substring(4) ===
        validator.withdrawalcredentials.substring(4);
      const isCompoundingOrLater =
        +v.withdrawalcredentials.substring(2, 4) >=
        +EXECUTION_CREDENTIALS.substring(2, 4);
      const isSameValidator = v.pubkey === validator.pubkey;
      return isSamePrefix && isCompoundingOrLater && !isSameValidator;
    });
    setTargetValidators(potentialTargetValidators);
  }, [validator, validators]);

  const accountType = +validator.withdrawalcredentials.substring(2, 4);
  return (
    <Section>
      {accountType === 1 && (
        <Row>
          <div style={{ flex: 1 }}>
            <Text style={{ margin: 0, fontWeight: 'bold' }}>
              <FormattedMessage defaultMessage="Upgrade account to compounding" />
            </Text>
            <FormattedMessage
              defaultMessage="Increases the maximum effective balance from {MIN_ACTIVATION_BALANCE} to {MAX_EFFECTIVE_BALANCE} {TICKER_NAME}."
              values={{
                MIN_ACTIVATION_BALANCE,
                MAX_EFFECTIVE_BALANCE,
                TICKER_NAME,
              }}
            />
          </div>
          <UpgradeCompounding validator={validator} />
        </Row>
      )}

      {accountType >= 2 && (
        <Row>
          <div style={{ flex: 1 }}>
            <Text style={{ margin: 0, fontWeight: 'bold' }}>
              <FormattedMessage defaultMessage="Request partial withdrawal" />
            </Text>
            <FormattedMessage
              defaultMessage="You can withdrawal any portion of your staked {TICKER_NAME} over {MIN_ACTIVATION_BALANCE}. You can currently withdrawal up to {surplus} {TICKER_NAME}."
              values={{
                TICKER_NAME,
                MIN_ACTIVATION_BALANCE,
                surplus: validator.coinBalance - MIN_ACTIVATION_BALANCE,
              }}
            />
          </div>
          <PartialWithdraw validator={validator} />
        </Row>
      )}

      {targetValidators.length > 0 && (
        <Row>
          <div style={{ flex: 1 }}>
            <Text style={{ margin: 0, fontWeight: 'bold' }}>
              <FormattedMessage defaultMessage="Migrate funds" />
            </Text>
            <FormattedMessage defaultMessage="Transfer entire balance to another one of your validator accounts, consolidating two accounts into one. Target account must be upgraded to compounding type." />
          </div>
          <Consolidate validator={validator} validators={targetValidators} />
        </Row>
      )}

      {!hasValidatorExited(validator) && (
        <Row>
          <div style={{ flex: 1 }}>
            <Text style={{ margin: 0, fontWeight: 'bold' }}>
              <FormattedMessage defaultMessage="Exit validator" />
            </Text>
            <FormattedMessage defaultMessage="Initiates the process of permanently exiting your validator account from the Ethereum proof-of-stake network, and withdrawing entire balance." />
          </div>
          <ForceExit validator={validator} />
        </Row>
      )}
    </Section>
  );
};

export default ValidatorActions;
