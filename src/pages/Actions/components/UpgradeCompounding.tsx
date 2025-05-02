import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';

import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import ModalHeader from './ModalHeader';
import QueueWarning from './QueueWarning';
import {
  ModalBody,
  ModalContent,
  AlertContainer,
  AlertContent,
  modalLayerStyle,
  ModalFooter,
} from './Shared';
import { Text } from '../../../components/Text';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';

import { generateCompoundParams } from '../utils';
import { getSignTxStatus } from '../../../utils/txStatus';

import { useCompoundingQueue } from '../../../hooks/useCompoundingQueue';
import { useTxModal } from '../../../hooks/useTxModal';

import {
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
} from '../../../utils/envVars';

interface Props {
  validator: BeaconChainValidator;
}

const UpgradeCompounding: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();
  const {
    resetTxModal,
    setShowModal,
    setShowTx,
    setTxHash,
    setTxStatus,
    showModal,
    showTx,
    txHash,
    txStatus,
  } = useTxModal();
  const { queue, setQueue } = useCompoundingQueue(!showTx);

  const resetState = () => {
    resetTxModal();
  };

  const handleOpen = () => {
    setShowTx(false);
    setShowModal(true);
  };

  const createUpgradeMessage = async () => {
    if (!account) return;

    setTxStatus('waiting_user_confirmation');
    setShowTx(true);

    try {
      const walletProvider = await (connector as AbstractConnector).getProvider();
      const web3 = new Web3(walletProvider);

      const {
        transactionParams,
        queue: compoundingQueue,
      } = await generateCompoundParams(
        web3,
        account,
        validator.pubkey,
        validator.pubkey
      );

      setQueue(compoundingQueue);

      return web3.eth
        .sendTransaction(transactionParams)
        .on('transactionHash', (hash: string): void => {
          setTxStatus('confirm_on_chain');
          setTxHash(hash);
        })
        .on('confirmation', (): any => {
          setTxStatus('success');
        })
        .on('error', () => {
          setTxStatus('error');
        });
    } catch (e) {
      console.log(e);
    }
  };

  const signTxStatus = getSignTxStatus(txStatus);

  const getModalButtonLabel = () => {
    if (!showTx) return <FormattedMessage defaultMessage="Upgrade account" />;
    return <FormattedMessage defaultMessage="Finish" />;
  };

  return (
    <>
      <Button
        onClick={handleOpen}
        label={<FormattedMessage defaultMessage="Upgrade account" />}
      />

      {showModal && (
        <Layer
          position="center"
          onEsc={resetState}
          onClickOutside={resetState}
          style={modalLayerStyle}
        >
          <ModalHeader onClose={resetState}>
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
              {!showTx && (
                <>
                  <Text>
                    <FormattedMessage defaultMessage="This will initiate the process of upgrading this validator from a Type 1 'regular withdrawals' or 'execution' account type, to a Type 2 'compounding' account type." />
                  </Text>
                  <Text>
                    <FormattedMessage defaultMessage="You'll be asked to sign a message with your wallet. Processing of upgrades is not immediate, so account for up to several days before completion." />
                  </Text>
                  <Text>
                    <FormattedMessage defaultMessage="Upgrade and consolidation requests enter a separate queue with a small fee, shown as the transaction's send amount. The fee is minimal when the queue is short, with a small buffer added to prevent rejections from sudden activity spikes." />
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
                </>
              )}

              {showTx && (
                <TransactionStatusInsert
                  headerMessage={
                    <FormattedMessage defaultMessage="Upgrade account" />
                  }
                  txHash={txHash}
                  transactionStatus={txStatus}
                />
              )}
            </ModalContent>
          </ModalBody>

          <ModalFooter>
            <QueueWarning queue={queue} />

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
                onClick={resetState}
              />
            )}
          </ModalFooter>
        </Layer>
      )}
    </>
  );
};

export default UpgradeCompounding;
