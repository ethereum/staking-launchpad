import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { Validator, ValidatorType } from '../types';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import PushConsolidation from './PushConsolidation';
import UpgradeCompounding from './UpgradeCompounding';

import { Section as SharedSection } from './Shared';
import { hasValidatorExited } from '../../../utils/validators';
import {
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
  MAX_EFFECTIVE_BALANCE,
} from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import PullConsolidation from './PullConsolidation';

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

  @media (max-width: 32rem) {
    flex-direction: column;
    padding-block: 1.5rem;
    gap: 1.5rem;
    align-items: start;
  }
`;

const ActionTitle = styled(Text)`
  font-weight: bold;
  margin: 0;
  margin-bottom: 0.25rem;
  @media (max-width: 32rem) {
    margin-bottom: 0.5rem;
  }
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
      const isSameValidator = v.pubkey === validator.pubkey;
      const hasBalance = v.balance > 0;
      const isExecutionOrLater = v.type >= ValidatorType.Execution;
      // Should be filtered out from API call for validators by withdrawal address; backup check
      const isSameCredentials =
        v.withdrawalcredentials.slice(4) ===
        validator.withdrawalcredentials.slice(4);
      return (
        !isSameValidator &&
        isExecutionOrLater &&
        hasBalance &&
        isSameCredentials
      );
    });

    setSourceValidatorSet(potentialSourceValidators);

    const potentialTargetValidators = potentialSourceValidators.filter(
      v => v.type >= ValidatorType.Compounding
    );

    setTargetValidatorSet(potentialTargetValidators);
  }, [validator, validators]);

  const surplusEther = validator.coinBalance - MIN_ACTIVATION_BALANCE;
  return (
    <Section>
      {validator.type === ValidatorType.Execution && (
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

      {validator.type >= ValidatorType.Compounding && (
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

      {validator.type >= ValidatorType.Compounding && (
        <Row>
          <div style={{ flex: 1 }}>
            <ActionTitle>
              <FormattedMessage defaultMessage="Absorb another validator" />
            </ActionTitle>
            <FormattedMessage defaultMessage="Transfer entire balance from another validator account into this one, consolidating two accounts into one." />
          </div>
          <PullConsolidation
            targetValidator={validator}
            sourceValidatorSet={sourceValidatorSet}
          />
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
          <PushConsolidation
            sourceValidator={validator}
            targetValidatorSet={targetValidatorSet}
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
