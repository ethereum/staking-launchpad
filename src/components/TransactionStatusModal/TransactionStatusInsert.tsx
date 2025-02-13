import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Box } from 'grommet';

import { TransactionStatus } from './types';
import { Text } from '../Text';
import { TransactionProgress } from './TransactionProgress';
import { Link } from '../Link';
import ModalHeader from '../../pages/Actions/components/ModalHeader';

import { EL_TRANSACTION_URL } from '../../utils/envVars';
import { getSignTxStatus, getTxOnchainStatus } from '../../utils/txStatus';

const Header = styled(ModalHeader)`
  padding-inline: 0;
`;

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
      <Header>{headerMessage}</Header>

      <TransactionProgress
        signTxStatus={signTxStatus}
        confirmOnChainStatus={txOnchainStatus}
      />

      {txHash?.length > 0 && (
        <Text center style={{ paddingBlock: '0.5rem' }}>
          <Link primary inline to={`${EL_TRANSACTION_URL}/${txHash}`}>
            <FormattedMessage defaultMessage="View transaction in block explorer" />
          </Link>
        </Text>
      )}
    </Box>
  );
};
