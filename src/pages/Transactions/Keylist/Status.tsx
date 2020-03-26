import React from 'react';
import styled from 'styled-components';
import { Spinning } from 'grommet-controls';
import { Text } from '../../../components/Text';
import { Dot } from '../../../components/Dot';
import { TransactionStatuses } from '../../../store/actions';

const Container = styled.div`
  //width: 100%;
  //width: 200px;
  display: flex;
`;

export const Status = ({ status }: { status: TransactionStatuses }) => {
  if (status === TransactionStatuses.READY) {
    return (
      <Container>
        <Dot success className="mr5" />
        <Text>Ready</Text>
      </Container>
    );
  }
  if (status === TransactionStatuses.PENDING) {
    return (
      <Container>
        <Dot className="mr5" />
        <Text>Waiting for wallet confirmation</Text>
      </Container>
    );
  }
  if (status === TransactionStatuses.STARTED) {
    return (
      <Container>
        <Spinning kind="pulse" />
        <Text color="green">Transaction Started</Text>
      </Container>
    );
  }
  if (status === TransactionStatuses.SUCCEEDED) {
    return (
      <Container>
        <Dot success className="mr5" />
        <Text>Transaction Successful</Text>
      </Container>
    );
  }
  if (status === TransactionStatuses.FAILED) {
    return (
      <Container>
        <Dot error className="mr5" />
        <Text>Transaction Failed</Text>
      </Container>
    );
  }
  if (status === TransactionStatuses.REJECTED) {
    return (
      <Container>
        <Dot error className="mr5" />
        <Text>Transaction Rejected</Text>
      </Container>
    );
  }

  return <Text>An Error Occurred</Text>;
};
