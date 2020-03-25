import React from 'react';
import { CustomText, TransactionStatuses } from './index';
import { Dot } from '../../../components/Dot';

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
        <Dot success className="mr5" />
        <CustomText>Waiting for wallet confirmation</CustomText>
      </div>
    );
  }
  if (status === TransactionStatuses.STARTED) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
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
        <Dot success className="mr5" />
        <CustomText>Transaction Failed</CustomText>
      </div>
    );
  }

  return <CustomText>An Error Occurred</CustomText>;
};
