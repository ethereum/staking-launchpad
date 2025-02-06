import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Layer } from 'grommet';
import { Text } from '../Text';
import { TransactionProgress } from './TransactionProgress';
import { stepStatus, TransactionStatus } from './types';
import { EL_TRANSACTION_URL } from '../../utils/envVars';
import { Link } from '../Link';
import ModalHeader from '../../pages/Actions/components/ModalHeader';
import { Button } from '../Button';

interface TopUpTransactionModalProps {
  headerMessage: string | ReactNode;
  onClose: (success: boolean) => void;
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
  const signTxStatus: stepStatus = React.useMemo(() => {
    if (
      transactionStatus === 'waiting_user_confirmation' ||
      transactionStatus === 'not_started'
    ) {
      return 'loading';
    }
    if (
      transactionStatus === 'user_rejected' ||
      transactionStatus === 'error'
    ) {
      return 'error';
    }
    return 'complete';
  }, [transactionStatus]);

  const confirmOnChainStatus: stepStatus = React.useMemo(() => {
    if (
      transactionStatus === 'waiting_user_confirmation' ||
      transactionStatus === 'not_started' ||
      transactionStatus === 'user_rejected'
    ) {
      return 'staged';
    }
    if (transactionStatus === 'confirm_on_chain') {
      return 'loading';
    }
    if (transactionStatus === 'error') {
      return 'error';
    }
    return 'complete';
  }, [transactionStatus]);

  const onCloseModal = () => {
    onClose(signTxStatus === 'complete');
  };

  return (
    <Layer position="center" onClickOutside={onCloseModal} onEsc={onCloseModal}>
      <Box width="medium">
        <ModalHeader onClose={onCloseModal}>{headerMessage}</ModalHeader>

        <TransactionProgress
          signTxStatus={signTxStatus}
          confirmOnChainStatus={confirmOnChainStatus}
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
              onClick={onCloseModal}
            />
          )}
        </Box>
      )}
    </Layer>
  );
};
