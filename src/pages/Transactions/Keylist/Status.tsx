import React from 'react';
import { Spinning } from 'grommet-controls';
import { Text } from '../../../components/Text';
import { Dot } from '../../../components/Dot';
import { TransactionStatus } from '../../../store/actions/depositFileActions';

interface Props {
  status: TransactionStatus;
}

export const Status = ({ status }: Props) => {
  if (status === TransactionStatus.READY) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <Text>Ready</Text>
      </div>
    );
  }
  if (status === TransactionStatus.PENDING) {
    return (
      <div className="flex">
        <Dot className="mr5" />
        <Text>Waiting for wallet confirmation</Text>
      </div>
    );
  }
  if (status === TransactionStatus.STARTED) {
    return (
      <div className="flex">
        <Spinning kind="pulse" />
        <Text color="green">Transaction Started</Text>
      </div>
    );
  }
  if (status === TransactionStatus.SUCCEEDED) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <Text>Transaction Successful</Text>
      </div>
    );
  }
  if (status === TransactionStatus.FAILED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <Text>Transaction Failed</Text>
      </div>
    );
  }
  if (status === TransactionStatus.REJECTED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <Text>Transaction Rejected</Text>
      </div>
    );
  }

  return <Text>An Error Occurred</Text>;
};
