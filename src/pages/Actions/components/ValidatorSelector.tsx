import React, { Dispatch, SetStateAction } from 'react';
import { useIntl } from 'react-intl';

import { Validator } from '../types';

import Select from '../../../components/Select';

import { ETHER_TO_GWEI, TICKER_NAME } from '../../../utils/envVars';

type ValidatorSelectorProps = {
  validators: Validator[];
  setSelectedValidator: Dispatch<SetStateAction<Validator | null>>;
  selectedValidator: Validator | null;
};

const ValidatorSelector = ({
  validators,
  setSelectedValidator,
  selectedValidator,
}: ValidatorSelectorProps) => {
  const { formatMessage } = useIntl();
  return (
    <Select
      placeholder={`Total validators: ${validators.length}`}
      searchPlaceholder={formatMessage({
        defaultMessage: 'Filter by index or pubkey',
      })}
      options={validators.map(v => ({
        value: v.pubkey,
        searchContext: `${v.validatorindex.toString()}:${v.pubkey}`,
        label: (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr auto',
              flex: 1,
              gap: '1rem',
              width: '100%',
            }}
          >
            <p style={{ margin: 0, textAlign: 'start' }}>
              {v.validatorindex.toString()}
            </p>
            <p
              style={{
                margin: 0,
                textAlign: 'end',
                marginInlineStart: 'auto',
                fontSize: '0.75em',
                color: '#444',
              }}
            >
              {(v.balance / ETHER_TO_GWEI).toFixed(9)} {TICKER_NAME}
            </p>
          </div>
        ),
      }))}
      value={selectedValidator?.pubkey || ''}
      onChange={(value: string) => {
        const validator = validators.find(v => v.pubkey === value);
        setSelectedValidator(validator || null);
      }}
    />
  );
};

export default ValidatorSelector;
