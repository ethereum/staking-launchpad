import React from 'react';
import styled from 'styled-components';
import { FormNextLink } from 'grommet-icons';
import { Text } from '../../../components/Text';
import { TransactionStatuses } from '../../../store/actions';

const ButtonText = styled(Text)`
  line-height: inherit;
  font-size: 16px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

interface ActionButtonProps {
  status: TransactionStatuses;
  onClick: (e: any) => void;
}

export const ActionButton = ({ status, onClick }: ActionButtonProps) => {
  if (status === TransactionStatuses.READY) {
    return (
      <div className="flex">
        <ButtonText onClick={onClick}>Start</ButtonText>
        <FormNextLink />
      </div>
    );
  }
  if (status === TransactionStatuses.PENDING) {
    return (
      <div className="flex">
        <ButtonText onClick={onClick}>Retry</ButtonText>
        <FormNextLink />
      </div>
    );
  }
  if (
    status === TransactionStatuses.STARTED ||
    status === TransactionStatuses.SUCCEEDED
  ) {
    return (
      <div>
        <ButtonText onClick={onClick}>Alethio</ButtonText>
        <ButtonText onClick={onClick}>Etherscan</ButtonText>
      </div>
    );
  }
  if (
    status === TransactionStatuses.FAILED ||
    status === TransactionStatuses.REJECTED
  ) {
    return (
      <div className="flex">
        <ButtonText onClick={onClick}>Try again</ButtonText>
        <FormNextLink />
      </div>
    );
  }

  return <Text>An Error Occurred</Text>;
};
