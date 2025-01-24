import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { AccountType } from './index';
import {
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
} from '../../utils/envVars';

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
  margin: 2rem 0;
`;

const ChoiceButton = styled.button<{ isActive: boolean }>`
  box-shadow: ${({ isActive }) => (isActive ? '0 0 10px rgba(0,0,0,0.5)' : '')};
  cursor: pointer;
  max-width: 400px;
  min-width: min(100%, 300px)
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 2rem;
  gap: 2rem;
  align-items: center;
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

const Tag = styled.span`
  font-size: 1.25rem;
  font-weight: normal;
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
          <Tag>
            "<FormattedMessage defaultMessage="Type" /> 2"
          </Tag>
        </ButtonSection>
        <ButtonSection>
          <Text>
            <FormattedMessage
              defaultMessage="Maximum effective balance of {MAX_EFFECTIVE_BALANCE} ETH"
              values={{ MAX_EFFECTIVE_BALANCE }}
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
        </ButtonSection>
      </ChoiceButton>
      <ChoiceButton
        onClick={() => setChosenType('0x01')}
        isActive={chosenType === '0x01'}
      >
        <ButtonSection>
          <Label>
            <FormattedMessage defaultMessage="Regular withdrawals" />
          </Label>
          <Tag>
            "<FormattedMessage defaultMessage="Type" /> 1"
          </Tag>
        </ButtonSection>
        <ButtonSection>
          <Text>
            <FormattedMessage
              defaultMessage="Maximum effective balance of {MIN_ACTIVATION_BALANCE} ETH"
              values={{ MIN_ACTIVATION_BALANCE }}
            />
          </Text>

          <Text>
            <FormattedMessage
              defaultMessage="Rewards over {MIN_ACTIVATION_BALANCE} automatically withdrawn for free to withdrawal address on a regular basis"
              values={{ MIN_ACTIVATION_BALANCE }}
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
