import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { Validator } from '../types';
import Consolidate from './Consolidate';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import UpgradeCompounding from './UpgradeCompounding';

import { Section as SharedSection } from './Shared';
import { hasValidatorExited } from '../../../utils/validators';

const Section = styled(SharedSection)`
  display: flex;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
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
        v.withdrawalcredentials === validator.withdrawalcredentials &&
        v.pubkey !== validator.pubkey
    );
    setSharedValidators(otherValidatorsSameCredentials);
  }, [validator, validators]);

  const accountType = +validator.withdrawalcredentials.substring(2, 4);
  return (
    <Section style={{ display: 'flex', gap: '1rem' }}>
      {accountType === 1 && <UpgradeCompounding validator={validator} />}

      {accountType >= 2 && <PartialWithdraw validator={validator} />}

      {sharedValidators.length > 0 && (
        <Consolidate validator={validator} validators={sharedValidators} />
      )}

      {!hasValidatorExited(validator) && (
        <div style={{ marginInlineStart: 'auto' }}>
          <ForceExit validator={validator} />
        </div>
      )}
    </Section>
  );
};

export default ValidatorActions;
