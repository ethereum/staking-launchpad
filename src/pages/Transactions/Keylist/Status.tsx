import React from 'react';
import { CustomText } from './index';
import { Dot } from '../../../components/Dot';
import { TransactionStatuses } from '../transactionUtils';
import { Spinning } from 'grommet-controls';

export const Status = ({ status }: { status: TransactionStatuses }) => {
  if (status === TransactionStatuses.READY) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <CustomText>Ready</CustomText>
      </div>
    );
  }
  if (status === TransactionStatuses.PENDING) {
    return (
      <div className="flex">
        <Dot className="mr5" />
        <CustomText>Waiting for wallet confirmation</CustomText>
      </div>
    );
  }
  if (status === TransactionStatuses.STARTED) {
    return (
      <div className="flex">
        <Spinning kind="pulse" />
        <CustomText color="green">Transaction Started</CustomText>
      </div>
    );
  }
  if (status === TransactionStatuses.SUCCEEDED) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <CustomText>Transaction Successful</CustomText>
      </div>
    );
  }
  if (status === TransactionStatuses.FAILED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <CustomText>Transaction Failed</CustomText>
      </div>
    );
  }
  if (status === TransactionStatuses.REJECTED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <CustomText>Transaction Rejected</CustomText>
      </div>
    );
  }

  return <CustomText>An Error Occurred</CustomText>;
};
