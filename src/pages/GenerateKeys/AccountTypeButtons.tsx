import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { AccountType } from './index';
import {
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
} from '../../utils/envVars';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const ChoiceButton = styled.button<{ isActive: boolean }>`
  box-shadow: ${p => (p.isActive ? '0 0 10px rgba(0,0,0,0.5)' : '')};
  background: ${p => (p.isActive ? 'rgba(0,0,0,0.05)' : 'transparent')};
  cursor: pointer;
  max-width: 400px;
  min-width: min(100%, 300px)
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  align-items: center;
  transition: all 200ms ease-in-out;
  opacity: ${p => (p.isActive ? 1 : 0.5)};
`;

const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items; center;
  gap: 0.75rem;
`;

const Label = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  text-align: center;
`;

const Text = styled.p`
  font-size: 1rem;
  margin: 0;
`;

interface AccountTypeButtonsProps {
  chosenType: AccountType;
  setChosenType: (type: AccountType) => void;
}

export const AccountTypeButtons = ({
  chosenType,
  setChosenType,
}: AccountTypeButtonsProps) => {
  return (
    <Container>
      <ChoiceButton
        onClick={() => setChosenType('0x02')}
        isActive={chosenType === '0x02'}
      >
        <ButtonSection>
          <Label>
            <FormattedMessage defaultMessage="Compounding" />
          </Label>
        </ButtonSection>
        <ButtonSection>
          <Text>
            <FormattedMessage
              defaultMessage="Maximum effective balance of {MAX_EFFECTIVE_BALANCE} {TICKER_NAME}"
              values={{ MAX_EFFECTIVE_BALANCE, TICKER_NAME }}
            />
          </Text>
          <Text>
            <FormattedMessage
              defaultMessage="Allows for automatic compounding of rewards"
              values={{ MIN_ACTIVATION_BALANCE }}
            />
          </Text>
          <Text>
            <FormattedMessage
              defaultMessage="Partial withdrawals available via smart contract request"
              values={{ MIN_ACTIVATION_BALANCE }}
            />
          </Text>
          <Text>
            <span style={{ textTransform: 'uppercase', fontSize: '0.875em' }}>
              <FormattedMessage defaultMessage="Recommended for most users" />
            </span>
          </Text>
        </ButtonSection>
      </ChoiceButton>
      <ChoiceButton
        onClick={() => setChosenType('0x01')}
        isActive={chosenType === '0x01'}
      >
        <Label>
          <FormattedMessage defaultMessage="Regular withdrawals" />
        </Label>
        <ButtonSection>
          <Text>
            <FormattedMessage
              defaultMessage="Maximum effective balance of {MIN_ACTIVATION_BALANCE} {TICKER_NAME}"
              values={{ MIN_ACTIVATION_BALANCE, TICKER_NAME }}
            />
          </Text>

          <Text>
            <FormattedMessage
              defaultMessage="Regular gasless withdrawals of any balance over {MIN_ACTIVATION_BALANCE} {TICKER_NAME}"
              values={{ MIN_ACTIVATION_BALANCE, TICKER_NAME }}
            />
          </Text>
          <Text>
            <FormattedMessage
              defaultMessage="Can be migrated to a compounding account at a later time"
              values={{ MIN_ACTIVATION_BALANCE }}
            />
          </Text>
        </ButtonSection>
      </ChoiceButton>
    </Container>
  );
};
