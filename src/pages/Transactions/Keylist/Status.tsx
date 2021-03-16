import React from 'react';
import { Spinning } from 'grommet-controls';
import styled from 'styled-components';
import { Alert as GrommetAlert } from 'grommet-icons/icons';
import { Text } from '../../../components/Text';
import { Dot } from '../../../components/Dot';
import { FormattedMessage } from 'react-intl';
import {
  DepositStatus,
  TransactionStatus,
} from '../../../store/actions/depositFileActions';

interface Props {
  transactionStatus: TransactionStatus;
  depositStatus: DepositStatus;
}

const AlertIcon = styled(p => <GrommetAlert {...p} />)`
  display: block;
  margin-right: 10px;
  height: 23px;
  stroke: red;
`;

export const Status = ({ transactionStatus, depositStatus }: Props) => {
  if (depositStatus === DepositStatus.ALREADY_DEPOSITED) {
    return (
      <div className="flex">
        <AlertIcon />
        <Text color="redDark">
          <FormattedMessage defaultMessage="Deposit already exists" />
        </Text>
      </div>
    );
  }
  if (transactionStatus === TransactionStatus.READY) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <Text>
          <FormattedMessage defaultMessage="Ready" />
        </Text>
      </div>
    );
  }
  if (transactionStatus === TransactionStatus.PENDING) {
    return (
      <div className="flex">
        <Dot className="mr5" />
        <Text>
          <FormattedMessage defaultMessage="Waiting for wallet confirmation" />
        </Text>
      </div>
    );
  }
  if (transactionStatus === TransactionStatus.STARTED) {
    return (
      <div className="flex">
        <Spinning kind="pulse" />
        <Text color="green">
          <FormattedMessage defaultMessage="Transaction started" />
        </Text>
      </div>
    );
  }
  if (transactionStatus === TransactionStatus.SUCCEEDED) {
    return (
      <div className="flex">
        <Dot success className="mr5" />
        <Text>
          <FormattedMessage defaultMessage="Transaction successful" />
        </Text>
      </div>
    );
  }
  if (transactionStatus === TransactionStatus.FAILED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <Text>
          <FormattedMessage defaultMessage="Transaction failed" />
        </Text>
      </div>
    );
  }
  if (transactionStatus === TransactionStatus.REJECTED) {
    return (
      <div className="flex">
        <Dot error className="mr5" />
        <Text>
          <FormattedMessage defaultMessage="Transaction rejected" />
        </Text>
      </div>
    );
  }

  return (
    <Text>
      <FormattedMessage defaultMessage="An error occurred" />
    </Text>
  );
};
