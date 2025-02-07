import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box } from 'grommet';
import { Text } from '../Text';
import { TransactionProgress } from './TransactionProgress';
import { TransactionStatus } from './types';
import { EL_TRANSACTION_URL } from '../../utils/envVars';
import { Link } from '../Link';
import ModalHeader from '../../pages/Actions/components/ModalHeader';
import { getSignTxStatus, getTxOnchainStatus } from '../../utils/txStatus';

type TransactionStatusInsertProps = {
  headerMessage: string | ReactNode;
  transactionStatus: TransactionStatus;
  txHash: string;
};

export const TransactionStatusInsert = ({
  headerMessage,
  transactionStatus,
  txHash,
}: TransactionStatusInsertProps) => {
  const signTxStatus = getSignTxStatus(transactionStatus);

  const txOnchainStatus = getTxOnchainStatus(transactionStatus);
  return (
    <Box width="full">
      <ModalHeader>{headerMessage}</ModalHeader>

      <TransactionProgress
        signTxStatus={signTxStatus}
        confirmOnChainStatus={txOnchainStatus}
      />

      {txHash?.length > 0 && (
        <Text center style={{ padding: '1rem' }}>
          <Link primary inline to={`${EL_TRANSACTION_URL}/${txHash}`}>
            <FormattedMessage defaultMessage="View transaction in block explorer" />
          </Link>
        </Text>
      )}
    </Box>
  );
};
