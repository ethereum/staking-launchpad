import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import { ValidatorType } from '../types';
import { BeaconChainValidator } from '../../TopUp/types';

import AddFunds from './AddFunds';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import PullConsolidation from './PullConsolidation';
import PushConsolidation from './PushConsolidation';
import { Section as SharedSection } from './Shared';
import { Link } from '../../../components/Link';
import { Text } from '../../../components/Text';
import UpgradeCompounding from './UpgradeCompounding';

import {
  getCredentialType,
  getEtherBalance,
  hasValidatorExited,
} from '../../../utils/validators';

import {
  ETHER_TO_GWEI,
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  MIN_DEPOSIT_ETHER,
  TICKER_NAME,
} from '../../../utils/envVars';
import { isValidatorNascent } from '../utils';

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
      const isNascent = isValidatorNascent(v); // https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md#new-process_consolidation_request
      return (
        !isSameValidator &&
        isExecutionOrLater &&
        hasBalance &&
        isSameCredentials &&
        !isNascent
      );
    });

    setSourceValidatorSet(potentialSourceValidators);

    const potentialTargetValidators = validators.filter(v => {
      const isCompounding = getCredentialType(v) >= ValidatorType.Compounding;
      const isSameValidator = v.pubkey === validator.pubkey;
      const hasBalance = v.balance > 0;
      // Should be filtered out from API call for validators by withdrawal address; backup check
      const isSameCredentials =
        v.withdrawalcredentials.slice(4) ===
        validator.withdrawalcredentials.slice(4);
      return (
        isCompounding && !isSameValidator && hasBalance && isSameCredentials
      );
    });

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
            <br />
            <em>
              <FormattedMessage
                defaultMessage="Note: Balance over {MIN_ACTIVATION_BALANCE} {TICKER_NAME} will temporarily disappear from balance shown above while it processes through an activation queue. See {pectrified} for details."
                values={{
                  MIN_ACTIVATION_BALANCE,
                  TICKER_NAME,
                  pectrified: (
                    <Link inline primary to="https://pectrified.com/">
                      pectrified.com
                    </Link>
                  ),
                }}
              />
            </em>
          </div>
          <UpgradeCompounding validator={validator} />
        </Row>
      )}

      <Row>
        <div>
          <ActionTitle>
            <FormattedMessage defaultMessage="Add funds to your validator" />
          </ActionTitle>
          <FormattedMessage defaultMessage="Adding funds to a validator not yet at it's maximum effective balance can increase rewards and penalties." />{' '}
          <em>
            <FormattedMessage
              defaultMessage="Minimum deposit is {MIN_DEPOSIT_ETHER} {TICKER_NAME}."
              values={{
                MIN_DEPOSIT_ETHER,
                TICKER_NAME,
              }}
            />
          </em>
          {validator.effectivebalance >= maxEBGwei && (
            <em>
              {' '}
              <FormattedMessage defaultMessage="This validator is at its max effective balance." />
              {getCredentialType(validator) < ValidatorType.Compounding && (
                <>
                  {' '}
                  <FormattedMessage
                    defaultMessage="Upgrade account to compounding to increase the effective balance to {MAX_EFFECTIVE_BALANCE} {TICKER_NAME}"
                    values={{ MAX_EFFECTIVE_BALANCE, TICKER_NAME }}
                  />
                </>
              )}
            </em>
          )}
        </div>
        <AddFunds validator={validator} />
      </Row>

      <Row>
        <div>
          <ActionTitle>
            <FormattedMessage defaultMessage="Request partial withdrawal" />
          </ActionTitle>
          <FormattedMessage
            defaultMessage="{subject} can withdraw any portion of staked {TICKER_NAME} over {MIN_ACTIVATION_BALANCE}."
            values={{
              subject:
                getCredentialType(validator) < ValidatorType.Compounding
                  ? 'Compounding accounts'
                  : 'You',
              TICKER_NAME,
              MIN_ACTIVATION_BALANCE,
            }}
          />{' '}
          {getCredentialType(validator) >= ValidatorType.Compounding &&
            surplusEther > 0 && (
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
          {getCredentialType(validator) < ValidatorType.Compounding && (
            <em>
              {' '}
              <FormattedMessage defaultMessage="Account must first be upgraded to compounding type." />
            </em>
          )}
          {isValidatorNascent(validator) && (
            <em>
              {' '}
              <FormattedMessage defaultMessage="Account must be activated for at least 256 epochs (~27 hours) before eligible for partial withdrawals." />
            </em>
          )}
        </div>
        <PartialWithdraw validator={validator} />
      </Row>

      <Row>
        <div>
          <ActionTitle>
            <FormattedMessage defaultMessage="Absorb another validator" />
          </ActionTitle>
          <FormattedMessage defaultMessage="Transfer entire balance from another validator account into this one, consolidating two accounts into one." />
          {getCredentialType(validator) < ValidatorType.Compounding && (
            <em>
              {' '}
              <FormattedMessage defaultMessage="Selected account must be upgraded to compounding type to absorb another validator." />
            </em>
          )}
          {sourceValidatorSet.length < 1 && (
            <em>
              {' '}
              <FormattedMessage defaultMessage="No eligible source accounts found. Source validators must be activated for at least 256 epochs (~27 hours) before eligible for consolidation." />
            </em>
          )}
        </div>
        <PullConsolidation
          targetValidator={validator}
          sourceValidatorSet={sourceValidatorSet}
        />
      </Row>

      <Row>
        <div>
          <ActionTitle>
            <FormattedMessage defaultMessage="Migrate funds" />
          </ActionTitle>
          <FormattedMessage defaultMessage="Transfer entire balance to another one of your validator accounts, consolidating two accounts into one. Target account must be upgraded to compounding type." />{' '}
        </div>
        <PushConsolidation
          sourceValidator={validator}
          targetValidatorSet={targetValidatorSet}
        />
      </Row>

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
