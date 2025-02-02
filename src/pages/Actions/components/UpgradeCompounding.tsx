import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Layer } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { Validator } from '../types';

import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import ModalHeader from './ModalHeader';
import {
  ModalBody,
  ModalContent,
  AlertContainer,
  AlertContent,
} from './Shared';
import { Text } from '../../../components/Text';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';

import { generateCompoundParams } from '../ActionUtils';

import {
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
} from '../../../utils/envVars';

interface Props {
  validator: Validator;
}

const UpgradeCompounding: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);

  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  const openConfirmationModal = () => {
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
  };

  const handleTxModalClose = () => {
    setShowTxModal(false);
    closeConfirmationModal();
  };

  const createUpgradeMessage = async () => {
    if (!account) {
      return;
    }

    setTransactionStatus('waiting_user_confirmation');
    setShowTxModal(true);

    try {
      const walletProvider = await (connector as AbstractConnector).getProvider();
      const web3 = new Web3(walletProvider);

      const params = await generateCompoundParams(
        web3,
        account,
        validator.pubkey,
        validator.pubkey
      );
      return web3.eth
        .sendTransaction(params)
        .on('transactionHash', (hash: string): void => {
          setTransactionStatus('confirm_on_chain');
          setTxHash(hash);
        })
        .on('confirmation', (): any => {
          setTransactionStatus('success');
        })
        .on('error', () => {
          setTransactionStatus('error');
        });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      {showConfirmationModal && (
        <Layer
          position="center"
          onEsc={closeConfirmationModal}
          onClickOutside={closeConfirmationModal}
          style={{ background: '#EEEEEE', maxWidth: '40rem' }}
        >
          <ModalHeader onClose={closeConfirmationModal}>
            <FormattedMessage
              defaultMessage="Upgrade validator {index}"
              values={{ index: validator.validatorindex }}
            />
          </ModalHeader>

          <ModalBody>
            <AlertContainer>
              <Alert variant="info">
                <AlertContent>
                  <AlertIcon />
                  <div>
                    <Text>
                      <strong>
                        <FormattedMessage defaultMessage="This validator account will be permanently upgraded to a compounding (Type 2) account." />
                      </strong>
                    </Text>
                  </div>
                </AlertContent>
              </Alert>
            </AlertContainer>
            <ModalContent>
              <Text>
                <FormattedMessage defaultMessage="This will initiate the process of upgrading this validator from a Type 1 'regular withdrawals' or 'execution' account type, to a Type 2 'compounding' account type." />
              </Text>
              <Text>
                <FormattedMessage defaultMessage="You'll be asked to sign a message with your wallet. Processing of upgrades is not immediate, so account for several days before completion." />
              </Text>
              <ul style={{ paddingInlineStart: '1.5rem', marginTop: 0 }}>
                <li>
                  <Text as="span">
                    <FormattedMessage defaultMessage="Action is permanent and irreversible" />
                  </Text>
                </li>
                <li>
                  <Text as="span">
                    <FormattedMessage
                      defaultMessage="Maximum effective account balance will increase to {MAX_EFFECTIVE_BALANCE} {TICKER_NAME}"
                      values={{ MAX_EFFECTIVE_BALANCE, TICKER_NAME }}
                    />
                  </Text>
                </li>
                <li>
                  <Text as="span">
                    <FormattedMessage
                      defaultMessage="Compounding accounts eligible to request partial withdrawals of any balance over {MIN_ACTIVATION_BALANCE} {TICKER_NAME}"
                      values={{ MIN_ACTIVATION_BALANCE, TICKER_NAME }}
                    />
                  </Text>
                </li>
              </ul>
            </ModalContent>
          </ModalBody>

          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="center"
            border="top"
            pad="1rem"
          >
            <Button
              label={<FormattedMessage defaultMessage="Upgrade validator" />}
              onClick={createUpgradeMessage}
              color="dark-3"
              destructive
              secondary
              fullWidth
            />
          </Box>
        </Layer>
      )}

      {showTxModal && (
        <TransactionStatusModal
          headerMessage={
            <FormattedMessage
              defaultMessage="Upgrade {index} to compounding"
              values={{ index: validator.validatorindex }}
            />
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={handleTxModalClose}
          handleRetry={createUpgradeMessage}
        />
      )}

      <Button
        onClick={openConfirmationModal}
        label={<FormattedMessage defaultMessage="Upgrade account" />}
      />
    </>
  );
};

export default UpgradeCompounding;
