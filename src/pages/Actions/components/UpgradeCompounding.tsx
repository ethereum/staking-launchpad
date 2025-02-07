import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Layer } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';

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
import { TransactionStatus } from '../../../components/TransactionStatusModal';

import { generateCompoundParams } from '../ActionUtils';

import {
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
} from '../../../utils/envVars';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';
import { getSignTxStatus } from '../../../utils/txStatus';

interface Props {
  validator: BeaconChainValidator;
}

const UpgradeCompounding: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();

  const [showModal, setShowModal] = useState(false);

  const [showTx, setShowTx] = useState(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState('');

  const openConfirmationModal = () => {
    setShowTx(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowTx(false);
    setShowModal(false);
  };

  const createUpgradeMessage = async () => {
    if (!account) return;

    setTransactionStatus('waiting_user_confirmation');
    setShowTx(true);

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

  const signTxStatus = getSignTxStatus(transactionStatus);

  const getModalButtonLabel = () => {
    if (!showTx) return <FormattedMessage defaultMessage="Upgrade account" />;
    return <FormattedMessage defaultMessage="Finish" />;
  };

  return (
    <>
      <Button
        onClick={openConfirmationModal}
        label={<FormattedMessage defaultMessage="Upgrade account" />}
      />

      {showModal && (
        <Layer
          position="center"
          onEsc={handleClose}
          onClickOutside={handleClose}
          style={{ background: '#EEEEEE', maxWidth: '40rem' }}
        >
          <ModalHeader onClose={handleClose}>
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

              {showTx && (
                <TransactionStatusInsert
                  headerMessage={
                    <FormattedMessage defaultMessage="Upgrade account" />
                  }
                  txHash={txHash}
                  transactionStatus={transactionStatus}
                />
              )}
            </ModalContent>
          </ModalBody>

          <Box as="footer" pad="1rem">
            {!['error', 'complete'].includes(signTxStatus) && (
              <Button
                fullWidth
                disabled={
                  !validator ||
                  (showTx && !['error', 'complete'].includes(signTxStatus))
                }
                label={getModalButtonLabel()}
                onClick={createUpgradeMessage}
              />
            )}

            {signTxStatus === 'error' && (
              <Button
                label={<FormattedMessage defaultMessage="Try again" />}
                onClick={createUpgradeMessage}
                destructive
                secondary
                fullWidth
              />
            )}

            {signTxStatus === 'complete' && (
              <Button
                label={<FormattedMessage defaultMessage="Finish" />}
                onClick={handleClose}
              />
            )}
          </Box>
        </Layer>
      )}
    </>
  );
};

export default UpgradeCompounding;
