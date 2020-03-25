import React from 'react';
import styled from 'styled-components';
import { FormNextLink } from 'grommet-icons';
import { TransactionStatuses } from './index';
import { Text } from '../../../components/Text';

const ButtonText = styled(Text)`
  line-height: inherit;
  font-size: 16px;
  cursor: pointer;
  :hover {
    text-decoration: underline;
  }
`;

export const ActionButton = ({ status }: { status: TransactionStatuses }) => {
  if (status === TransactionStatuses.READY) {
    return (
      <div className="flex">
        <ButtonText>Start</ButtonText>
        <FormNextLink />
      </div>
    );
  }
  if (status === TransactionStatuses.PENDING) {
    return (
      <div className="flex">
        <ButtonText>Retry</ButtonText>
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
        <ButtonText>Alethio</ButtonText>
        <ButtonText>Etherscan</ButtonText>
      </div>
    );
  }
  if (status === TransactionStatuses.FAILED) {
    return (
      <div className="flex">
        <ButtonText>Try again</ButtonText>
        <FormNextLink />
      </div>
    );
  }

  return <Text>An Error Occurred</Text>;
};
