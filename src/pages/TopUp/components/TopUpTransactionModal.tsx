import React, { useEffect, useState } from 'react';
import { Box, Layer } from 'grommet';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import TransactionProgress from './TransactionProgress';
import { stepStatus, TransactionStatus } from '../types';
import { Button } from '../../../components/Button';

interface TopUpTransactionModalProps {
  onClose: () => void;
  transactionStatus: TransactionStatus;
}

const TopUpTransactionModal: React.FC<TopUpTransactionModalProps> = ({
  onClose,
  transactionStatus,
}) => {
  const signTxStatus: stepStatus = React.useMemo(() => {
    if (
      transactionStatus === 'waiting_user_confirmation' ||
      transactionStatus === 'not_started'
    ) {
      return 'loading';
    }
    if (transactionStatus === 'user_rejected') {
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

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <Box pad="medium" gap="small" width="medium">
        <Heading level={3} margin="none">
          Top up Transaction
        </Heading>
        <TransactionProgress
          signTxStatus={signTxStatus}
          confirmOnChainStatus={confirmOnChainStatus}
        />
      </Box>
      <Box
        as="footer"
        gap="small"
        direction="row"
        align="center"
        justify="center"
        pad={{ top: 'medium', bottom: 'small' }}
      >
        <Button label="Close" onClick={onClose} color="dark-3" />
      </Box>
    </Layer>
  );
};

export default TopUpTransactionModal;
