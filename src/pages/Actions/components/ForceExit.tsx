import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Layer, Form, TextInput } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';

import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Text } from '../../../components/Text';
import { TransactionStatus } from '../../../components/TransactionStatusModal';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';
import ModalHeader from './ModalHeader';
import {
  ModalBody,
  AlertContainer,
  AlertContent,
  ModalContent,
  modalLayerStyle,
  ModalFooter,
} from './Shared';

import { generateWithdrawalParams } from '../ActionUtils';
import { getSignTxStatus } from '../../../utils/txStatus';
import { useModal } from '../../../hooks/useModal';

interface Props {
  validator: BeaconChainValidator;
}

const ForceExit: React.FC<Props> = ({ validator }) => {
  const { locale, formatMessage } = useIntl();
  const { connector, account } = useWeb3React();
  const { showModal, setShowModal, showTx, setShowTx } = useModal();

  const [userConfirmationValue, setUserConfirmationValue] = useState('');
  const [stepTwo, setStepTwo] = useState(false);

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState('');

  const openExitModal = () => {
    setShowTx(false);
    setStepTwo(false);
    setUserConfirmationValue('');
    setShowModal(true);
  };

  const handleClose = () => {
    setShowTx(false);
    setShowModal(false);
    setStepTwo(false);
    setUserConfirmationValue('');
  };

  const createExitTransaction = async () => {
    if (!account) return;

    setTransactionStatus('waiting_user_confirmation');
    setShowTx(true);

    const walletProvider = await (connector as AbstractConnector).getProvider();
    const web3 = new Web3(walletProvider);

    // Force exits have withdrawal amount of 0
    const transactionParams = await generateWithdrawalParams(
      web3,
      account,
      validator.pubkey,
      0
    );

    web3.eth
      .sendTransaction(transactionParams)
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
  };

  const CONFIRM_EXIT_STRING = formatMessage({
    defaultMessage: 'UNSTAKE FUNDS',
  });

  const { validatorindex } = validator;

  const signTxStatus = getSignTxStatus(transactionStatus);

  return (
    <>
      <Button
        label={<FormattedMessage defaultMessage="Force exit" />}
        onClick={openExitModal}
        destructive
      />

      {showModal && (
        <Layer
          position="center"
          onEsc={handleClose}
          onClickOutside={handleClose}
          style={modalLayerStyle}
        >
          <ModalHeader onClose={handleClose}>
            <FormattedMessage
              defaultMessage="Exit validator {validatorindex}"
              values={{ validatorindex }}
            />
          </ModalHeader>
          <ModalBody>
            <AlertContainer>
              <Alert variant="error">
                <AlertContent>
                  <AlertIcon />
                  <div>
                    <Text>
                      <strong>
                        <FormattedMessage defaultMessage="This account will be permanently exited from the network." />
                      </strong>
                    </Text>
                    <Text style={{ fontSize: '1rem' }}>
                      <FormattedMessage defaultMessage="This validator should remain online until exit epoch is reached." />
                    </Text>
                  </div>
                </AlertContent>
              </Alert>
            </AlertContainer>
            <ModalContent>
              {!showTx && (
                <>
                  <Text>
                    <FormattedMessage defaultMessage="This will initiate the process of permanently exiting this validator from the Ethereum proof-of-stake network." />
                  </Text>
                  <Text>
                    <FormattedMessage defaultMessage="You'll be asked to sign a message with your wallet. Processing of exits is not immediate, so account for several days before completion." />
                  </Text>
                  <ul style={{ paddingInlineStart: '1.5rem', marginTop: 0 }}>
                    <li>
                      <Text as="span">
                        <FormattedMessage defaultMessage="Action is permanent and irreversible" />
                      </Text>
                    </li>
                    <li>
                      <Text as="span">
                        <FormattedMessage defaultMessage="Account still responsible for consensus duties until exit epoch reached (keep validator online)" />
                      </Text>
                    </li>
                    <li>
                      <Text as="span">
                        <FormattedMessage
                          defaultMessage="All remaining funds will be transferred to the {destination} within a few days after exit epoch reached"
                          values={{
                            destination: (
                              <strong>
                                <FormattedMessage defaultMessage="connected execution withdrawal address" />
                              </strong>
                            ),
                          }}
                        />
                      </Text>
                    </li>
                  </ul>
                </>
              )}

              {showTx && (
                <TransactionStatusInsert
                  headerMessage={
                    <FormattedMessage
                      defaultMessage="Initiating exit"
                      values={{ validatorindex }}
                    />
                  }
                  txHash={txHash}
                  transactionStatus={transactionStatus}
                />
              )}
            </ModalContent>
          </ModalBody>
          <ModalFooter>
            {!['error', 'complete'].includes(signTxStatus) &&
              (stepTwo ? (
                <Form
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <label
                    htmlFor="confirm-exit-input"
                    style={{ marginBottom: '0.25rem' }}
                  >
                    <Text>
                      Please type <strong>{CONFIRM_EXIT_STRING}</strong> to
                      confirm.
                    </Text>
                  </label>
                  <TextInput
                    id="confirm-exit-input"
                    name="confirm-exit-input"
                    value={userConfirmationValue}
                    onChange={event =>
                      setUserConfirmationValue(event.target.value)
                    }
                    style={{ background: 'white', border: '1px solid #ccc' }}
                  />
                  <Button
                    style={{ fontSize: '1rem' }}
                    label="I understand the consequences, exit this validator"
                    onClick={createExitTransaction}
                    color="dark-3"
                    fullWidth
                    destructive
                    type="submit"
                    disabled={
                      showTx ||
                      userConfirmationValue.localeCompare(
                        CONFIRM_EXIT_STRING,
                        locale,
                        {
                          sensitivity: 'base',
                        }
                      ) !== 0
                    }
                  />
                </Form>
              ) : (
                <Button
                  label={
                    <FormattedMessage defaultMessage="Fully exit validator" />
                  }
                  onClick={() => setStepTwo(true)}
                  color="dark-3"
                  destructive
                  secondary
                  fullWidth
                />
              ))}
            {signTxStatus === 'error' && (
              <Button
                label={<FormattedMessage defaultMessage="Try again" />}
                onClick={createExitTransaction}
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
            )}
          </ModalFooter>
        </Layer>
      )}
    </>
  );
};

export default ForceExit;
