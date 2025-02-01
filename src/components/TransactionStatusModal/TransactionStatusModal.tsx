import React, { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Layer } from 'grommet';
import { Text } from '../Text';
import { TransactionProgress } from './TransactionProgress';
import { stepStatus, TransactionStatus } from './types';
import { EL_TRANSACTION_URL } from '../../utils/envVars';
import { Link } from '../Link';
import ModalHeader from '../../pages/Actions/components/ModalHeader';

interface TopUpTransactionModalProps {
  headerMessage: string | ReactNode;
  onClose: () => void;
  transactionStatus: TransactionStatus;
  txHash: string;
}

export const TransactionStatusModal: React.FC<TopUpTransactionModalProps> = ({
  headerMessage,
  onClose,
  transactionStatus,
  txHash,
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

  return (
    <Layer position="center" onClickOutside={onClose} onEsc={onClose}>
      <Box width="medium">
        <ModalHeader onClose={onClose}>{headerMessage}</ModalHeader>

        <TransactionProgress
          signTxStatus={signTxStatus}
          confirmOnChainStatus={confirmOnChainStatus}
        />

        {txHash?.length > 0 && (
          <Text center>
            <FormattedMessage
              defaultMessage="Check {etherscan} for more details"
              values={{
                etherscan: (
                  <Link primary inline to={`${EL_TRANSACTION_URL}/${txHash}`}>
                    EL Explorer
                  </Link>
                ),
              }}
              description="{etherscan} is a share link to this transaction on etherscan.io, labeled 'Etherscan'"
            />
          </Text>
        )}
      </Box>
      {/* <Box
        as="footer"
        gap="small"
        direction="row"
        align="center"
        justify="center"
        // pad={{ top: 'medium', bottom: 'small' }}
      >
        <Button label="Close" onClick={onClose} color="dark-3" />
      </Box> */}
    </Layer>
  );
};
