import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { FormattedMessage } from 'react-intl';
import { ValidatorType } from '../types';
import { BeaconChainValidator } from '../../TopUp/types';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import PushConsolidation from './PushConsolidation';
import AddFunds from './AddFunds';
import UpgradeCompounding from './UpgradeCompounding';

import { Section as SharedSection } from './Shared';
import {
  hasValidatorExited,
  getEtherBalance,
  getCredentialType,
} from '../../../utils/validators';
import {
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
  MAX_EFFECTIVE_BALANCE,
  ETHER_TO_GWEI,
} from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import PullConsolidation from './PullConsolidation';

const Section = styled(SharedSection)`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 0;

  @media (max-width: 32rem) {
    grid-template-columns: 1fr;
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: subgrid;
  grid-column: span 2;
  padding: 1rem;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.5rem 2rem;

  &:not(:last-child) {
    border-bottom: 1px solid lightgray;
  }

  @media (max-width: 32rem) {
    grid-column: span 1;
    flex-direction: column;
    padding-block: 1.5rem;
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
  validator: BeaconChainValidator;
  validators: BeaconChainValidator[];
}

const ValidatorActions: React.FC<Props> = ({ validator, validators }) => {
  // eslint-disable-next-line
  const [sourceValidatorSet, setSourceValidatorSet] = useState<
    BeaconChainValidator[]
  >([]);
  const [targetValidatorSet, setTargetValidatorSet] = useState<
    BeaconChainValidator[]
  >([]);

  useEffect(() => {
    if (!validator || !validators) {
      setTargetValidatorSet([]);
      return;
    }

    const potentialSourceValidators = validators.filter(v => {
      const isSameValidator = v.pubkey === validator.pubkey;
      const hasBalance = v.balance > 0;
      const isExecutionOrLater =
        getCredentialType(v) >= ValidatorType.Execution;
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
      v => getCredentialType(v) >= ValidatorType.Compounding
    );

    setTargetValidatorSet(potentialTargetValidators);
  }, [validator, validators]);

  const surplusEther = getEtherBalance(validator) - MIN_ACTIVATION_BALANCE;
  const maxEBGwei =
    (getCredentialType(validator) < ValidatorType.Compounding
      ? MIN_ACTIVATION_BALANCE
      : MAX_EFFECTIVE_BALANCE) * ETHER_TO_GWEI;

  return (
    <Section>
      {getCredentialType(validator) === ValidatorType.Execution && (
        <Row>
          <div>
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

      <Row>
        <div>
          <ActionTitle>
            <FormattedMessage defaultMessage="Add funds to your validator" />
          </ActionTitle>
          <FormattedMessage defaultMessage="Adding funds to a validator not yet at it's maximum effective balance can increase rewards and penalties." />
          {validator.effectivebalance >= maxEBGwei && (
            <>
              {' '}
              <FormattedMessage defaultMessage="This validator is already max effective balance." />
              {getCredentialType(validator) < ValidatorType.Compounding && (
                <>
                  {' '}
                  <FormattedMessage
                    defaultMessage="Upgrade account to compounding to increase the effective balance to {MAX_EFFECTIVE_BALANCE}"
                    values={{ MAX_EFFECTIVE_BALANCE }}
                  />
                </>
              )}
            </>
          )}
        </div>
        <AddFunds validator={validator} />
      </Row>

      {getCredentialType(validator) >= ValidatorType.Compounding && (
        <Row>
          <div>
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

      {getCredentialType(validator) >= ValidatorType.Compounding && (
        <Row>
          <div>
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
          <div>
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
          <div>
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
