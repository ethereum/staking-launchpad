import React, { useEffect, useState } from 'react';

import { Validator } from '../types';
import Consolidate from './Consolidate';
import ForceExit from './ForceExit';
import PartialWithdraw from './PartialWithdraw';
import UpgradeCompounding from './UpgradeCompounding';

import { Section } from './Shared';
import { hasValidatorExited } from '../../../utils/validators';
import { EXECUTION_CREDENTIALS } from '../../../utils/envVars';

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
    <Section style={{ display: 'flex', gap: '2rem' }}>
      {accountType === 1 && <UpgradeCompounding validator={validator} />}

      {accountType >= 2 && <PartialWithdraw validator={validator} />}

      {sharedValidators.length > 0 && (
        <Consolidate validator={validator} validators={sharedValidators} />
      )}

      <div className="spacer" style={{ flex: 1 }} />

      {!hasValidatorExited(validator) && <ForceExit validator={validator} />}
    </Section>
  );
};

export default ValidatorActions;
