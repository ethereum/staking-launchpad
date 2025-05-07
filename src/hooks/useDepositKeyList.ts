import BigNumber from 'bignumber.js';
import _every from 'lodash/every';
import _some from 'lodash/some';

import { DepositKeyInterface } from '../store/reducers';
import {
  DepositStatus,
  TransactionStatus,
} from '../store/actions/depositFileActions';

import { ETHER_TO_GWEI } from '../utils/envVars';
import { attemptableStatuses } from '../utils/txStatus';

export const useDepositKeyList = (depositKeys: DepositKeyInterface[]) => {
  const keysNotPreviouslyDeposited = depositKeys.filter(
    key => key.depositStatus !== DepositStatus.ALREADY_DEPOSITED
  );
  const totalTxCount = keysNotPreviouslyDeposited.length;

  const remainingTxs = keysNotPreviouslyDeposited.filter(
    file =>
      file.depositStatus === DepositStatus.READY_FOR_DEPOSIT &&
      attemptableStatuses.includes(file.transactionStatus)
  );
  const remainingTxCount = remainingTxs.length;

  const allTxConfirmed = _every(
    keysNotPreviouslyDeposited.map(
      file => file.transactionStatus === TransactionStatus.SUCCEEDED
    )
  );

  const oneTxConfirmed = _some(
    depositKeys.map(
      file => file.transactionStatus === TransactionStatus.SUCCEEDED
    )
  );

  const succeededDeposits = depositKeys.filter(
    key => key.transactionStatus === TransactionStatus.SUCCEEDED
  );

  const actualTxConfirmed = succeededDeposits.length;

  const stakedGwei = succeededDeposits.reduce((acc, key) => {
    const bigAmount = new BigNumber(key.amount);
    return acc.plus(bigAmount);
  }, new BigNumber(0));

  const formattedStakedEther = stakedGwei.dividedBy(ETHER_TO_GWEI).toString();

  return {
    actualTxConfirmed,
    allTxConfirmed,
    formattedStakedEther,
    oneTxConfirmed,
    remainingTxCount,
    remainingTxs,
    succeededDeposits,
    totalTxCount,
  };
};
