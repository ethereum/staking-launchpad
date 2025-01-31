import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Validator } from '../types';
import Consolidate from './Consolidate';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import UpgradeCompounding from './UpgradeCompounding';

import { Section as SharedSection } from './Shared';
import { hasValidatorExited } from '../../../utils/validators';
import { EXECUTION_CREDENTIALS } from '../../../utils/envVars';

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
  const [sharedValidators, setSharedValidators] = useState<Validator[]>([]);

  useEffect(() => {
    if (!validator || !validators) {
      setSharedValidators([]);
      return;
    }

    const otherValidatorsSameCredentials = validators.filter(
      v =>
        v.withdrawalcredentials.substring(4) ===
          validator.withdrawalcredentials.substring(4) &&
        v.withdrawalcredentials.substring(0, 4) === EXECUTION_CREDENTIALS &&
        v.pubkey !== validator.pubkey
    );
    setSharedValidators(otherValidatorsSameCredentials);
  }, [validator, validators]);

  const accountType = +validator.withdrawalcredentials.substring(2, 4);
  return (
    <Section>
      {accountType === 1 && (
        <Row>
          <div style={{ flex: 1 }}>
            Title + Content explaining lorem ipseum lots of text here
          </div>
          <UpgradeCompounding validator={validator} />
        </Row>
      )}

      {accountType >= 2 && (
        <div
          style={{
            display: 'flex',
            padding: '1rem',
            alignItems: 'center',
            gap: '1rem',
            borderBottom: '1px solid lightgray',
          }}
        >
          <div style={{ flex: 1 }}>
            Title + Content explaining lorem ipseum lots of text here
          </div>
          <PartialWithdraw validator={validator} />
        </div>
      )}

      {sharedValidators.length > 0 && (
        <Row>
          <div style={{ flex: 1 }}>
            Title + Content explaining lorem ipseum lots of text here
          </div>
          <Consolidate validator={validator} validators={sharedValidators} />
        </Row>
      )}

      {!hasValidatorExited(validator) && (
        <Row>
          <div style={{ flex: 1 }}>
            Title + Content explaining lorem ipseum lots of text here
          </div>
          <ForceExit validator={validator} />
        </Row>
      )}
    </Section>
  );
};

export default ValidatorActions;
