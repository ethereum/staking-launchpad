import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Validator } from '../types';
import MigrateFunds from './MigrateFunds';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import UpgradeCompounding from './UpgradeCompounding';

import { Section as SharedSection } from './Shared';
import { hasValidatorExited } from '../../../utils/validators';
import {
  EXECUTION_CREDENTIALS,
  COMPOUNDING_CREDENTIALS,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
  MAX_EFFECTIVE_BALANCE,
} from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import ConsolidateInto from './ConsolidateInto';

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

const ActionTitle = styled(Text)`
  margin: 0;
  font-weight: bold;
`;

interface Props {
  validator: Validator;
  validators: Validator[];
}

const ValidatorActions: React.FC<Props> = ({ validator, validators }) => {
  // eslint-disable-next-line
  const [sourceValidatorSet, setSourceValidatorSet] = useState<Validator[]>([]);
  const [targetValidatorSet, setTargetValidatorSet] = useState<Validator[]>([]);

  useEffect(() => {
    if (!validator || !validators) {
      setTargetValidatorSet([]);
      return;
    }

    const potentialSourceValidators = validators.filter(v => {
      // Should be filtered out from API call for validators by withdrawal address; backup check
      const isSameCredentials =
        v.withdrawalcredentials.slice(4) ===
        validator.withdrawalcredentials.slice(4);
      const isExecutionOrLater =
        +v.withdrawalcredentials.slice(0, 4) >= +EXECUTION_CREDENTIALS;
      const isSameValidator = v.pubkey === validator.pubkey;
      return isSameCredentials && isExecutionOrLater && !isSameValidator;
    });

    setSourceValidatorSet(potentialSourceValidators);

    const potentialTargetValidators = potentialSourceValidators.filter(v => {
      const isCompoundingOrLater =
        +v.withdrawalcredentials.slice(0, 4) >= +COMPOUNDING_CREDENTIALS;
      return isCompoundingOrLater;
    });

    setTargetValidatorSet(potentialTargetValidators);
  }, [validator, validators]);

  const accountType = +validator.withdrawalcredentials.slice(0, 4);
  const surplusEther = validator.coinBalance - MIN_ACTIVATION_BALANCE;
  return (
    <Section>
      {accountType === +EXECUTION_CREDENTIALS && (
        <Row>
          <div style={{ flex: 1 }}>
            <ActionTitle>
              <FormattedMessage defaultMessage="Upgrade account to compounding" />
            </ActionTitle>
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

      {accountType >= +COMPOUNDING_CREDENTIALS && (
        <Row>
          <div style={{ flex: 1 }}>
            <ActionTitle>
              <FormattedMessage defaultMessage="Request partial withdrawal" />
            </ActionTitle>
            <FormattedMessage
              defaultMessage="You can withdrawal any portion of your staked {TICKER_NAME} over {MIN_ACTIVATION_BALANCE}."
              values={{
                TICKER_NAME,
                MIN_ACTIVATION_BALANCE,
              }}
            />{' '}
            {surplusEther > 0 && (
              <FormattedMessage
                defaultMessage="You can currently withdrawal up to {surplusEther} {TICKER_NAME}."
                values={{
                  TICKER_NAME,
                  surplusEther: (
                    <span style={{ color: 'darkgreen' }}>{surplusEther}</span>
                  ),
                }}
              />
            )}
          </div>
          <PartialWithdraw validator={validator} />
        </Row>
      )}

      {targetValidatorSet.length > 0 && (
        <Row>
          <div style={{ flex: 1 }}>
            <ActionTitle>
              <FormattedMessage defaultMessage="Migrate funds" />
            </ActionTitle>
            <FormattedMessage defaultMessage="Transfer entire balance to another one of your validator accounts, consolidating two accounts into one. Target account must be upgraded to compounding type." />
          </div>
          <MigrateFunds
            sourceValidator={validator}
            targetValidatorSet={targetValidatorSet}
          />
        </Row>
      )}

      {accountType >= +COMPOUNDING_CREDENTIALS && (
        <Row>
          <div style={{ flex: 1 }}>
            <ActionTitle>
              <FormattedMessage defaultMessage="Absorb another validator" />
            </ActionTitle>
            <FormattedMessage defaultMessage="Transfer entire balance from another validator account into this one, consolidating two accounts into one." />
          </div>
          <ConsolidateInto
            targetValidator={validator}
            sourceValidatorSet={sourceValidatorSet}
          />
        </Row>
      )}

      {!hasValidatorExited(validator) && (
        <Row>
          <div style={{ flex: 1 }}>
            <ActionTitle>
              <FormattedMessage defaultMessage="Exit validator" />
            </ActionTitle>
            <FormattedMessage defaultMessage="Initiates the process of permanently exiting your validator account from the Ethereum proof-of-stake network, and withdrawing entire balance." />
          </div>
          <ForceExit validator={validator} />
        </Row>
      )}
    </Section>
  );
};

export default ValidatorActions;
