import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Layer } from 'grommet';
import { Text } from '../Text';
import { TransactionProgress } from './TransactionProgress';
import { TransactionStatus } from './types';
import { EL_TRANSACTION_URL } from '../../utils/envVars';
import { Link } from '../Link';
import ModalHeader from '../../pages/Actions/components/ModalHeader';
import { Button } from '../Button';
import { getSignTxStatus, getTxOnchainStatus } from '../../utils/txStatus';

interface TopUpTransactionModalProps {
  headerMessage: string | ReactNode;
  onClose: () => void;
  transactionStatus: TransactionStatus;
  txHash: string;
  handleRetry: () => void;
}

export const TransactionStatusModal: React.FC<TopUpTransactionModalProps> = ({
  headerMessage,
  onClose,
  transactionStatus,
  txHash,
  handleRetry,
}) => {
  const signTxStatus = getSignTxStatus(transactionStatus);

  const txOnchainStatus = getTxOnchainStatus(transactionStatus);

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <Box width="medium">
        <ModalHeader onClose={onClose}>{headerMessage}</ModalHeader>

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

      {['error', 'complete'].includes(signTxStatus) && (
        <Box
          as="footer"
          gap="small"
          direction="row"
          align="center"
          justify="center"
          border="top"
          pad="1rem"
        >
          {signTxStatus === 'error' && (
            <Button
              label={<FormattedMessage defaultMessage="Try again" />}
              onClick={handleRetry}
              destructive
              secondary
            />
          )}
          {signTxStatus === 'complete' && (
            <Button
              label={<FormattedMessage defaultMessage="Finish" />}
              onClick={onClose}
            />
          )}
        </Box>
      )}
    </Layer>
  );
};
