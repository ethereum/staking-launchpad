import React from 'react';
import styled from 'styled-components';
import { FormNextLink, Share } from 'grommet-icons';
import { Text } from '../../../components/Text';
import { TransactionStatuses } from '../../../store/actions';

const Container = styled.div`
  width: 100px;
  display: flex;
`;
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
      <Container>
        <ButtonText onClick={onClick}>Start</ButtonText>
        <FormNextLink />
      </Container>
    );
  }
  if (status === TransactionStatuses.PENDING) {
    return (
      <Container>
        <ButtonText onClick={onClick}>Retry</ButtonText>
        <FormNextLink />
      </Container>
    );
  }
  if (
    status === TransactionStatuses.STARTED ||
    status === TransactionStatuses.SUCCEEDED
  ) {
    return (
      <div className="flex">
        <ButtonText onClick={onClick} className="mr5">
          Alethio <Share size="small" />
        </ButtonText>
        <ButtonText onClick={onClick}>
          Etherscan <Share size="small" />
        </ButtonText>
      </div>
    );
  }
  if (
    status === TransactionStatuses.FAILED ||
    status === TransactionStatuses.REJECTED
  ) {
    return (
      <Container>
        <ButtonText onClick={onClick}>Try again</ButtonText>
        <FormNextLink />
      </Container>
    );
  }

  return <Text>An Error Occurred</Text>;
};
