import React, { Dispatch, SetStateAction, useEffect } from 'react';
import { useIntl } from 'react-intl';
import styled from 'styled-components';

import { BeaconChainValidator } from '../../TopUp/types';

import Select from '../../../components/Select';

import { ETHER_TO_GWEI, TICKER_NAME } from '../../../utils/envVars';

const AccountType = styled.p`
  font-size: 0.875rem;
  border: 1px solid gray;
  border-radius: 4px;
  padding: 3px 4px;
  line-height: 1;
  align-self: center;
  margin: 0;
  text-align: center;
  font-family: monospace;
  color: gray;

  @media (max-width: 32rem) {
    display: none;
  }
`;

type ValidatorSelectorProps = {
  validators: BeaconChainValidator[];
  setSelectedValidator: Dispatch<SetStateAction<BeaconChainValidator | null>>;
  selectedValidator: BeaconChainValidator | null;
};

const ValidatorSelector = ({
  validators,
  setSelectedValidator,
  selectedValidator,
}: ValidatorSelectorProps) => {
  const { formatMessage } = useIntl();

  // If only one validator, select it by default
  useEffect(() => {
    if (validators.length !== 1) return;
    setSelectedValidator(validators[0]);
  }, [validators, setSelectedValidator]);

  return (
    <Select
      placeholder={`Available validators: ${validators.length}`}
      searchPlaceholder={formatMessage({
        defaultMessage: 'Filter by index or pubkey',
      })}
      options={validators.map(v => {
        return {
          value: v.pubkey,
          searchContext: `${v.validatorindex.toString()}:${v.pubkey}`,
          label: (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'subgrid',
                gridColumn: 'span 3',
                color:
                  v.status.includes('exit') || v.status.includes('slash')
                    ? '#808080'
                    : '#202020',
              }}
            >
              <p style={{ margin: 0, textAlign: 'start' }}>
                {v.validatorindex.toString()}
              </p>
              <AccountType>{v.withdrawalcredentials.slice(0, 4)}</AccountType>
              <p
                style={{
                  margin: 0,
                  textAlign: 'end',
                  marginInlineStart: 'auto',
                  fontSize: '0.75em',
                  color:
                    v.status.includes('exit') || v.status.includes('slash')
                      ? '#808080'
                      : '#404040',
                }}
              >
                {(v.balance / ETHER_TO_GWEI).toFixed(9)} {TICKER_NAME}
              </p>
            </div>
          ),
        };
      })}
      value={selectedValidator?.pubkey || ''}
      onChange={(value: string) => {
        const validator = validators.find(v => v.pubkey === value);
        setSelectedValidator(validator || null);
      }}
    />
  );
};

export default ValidatorSelector;
