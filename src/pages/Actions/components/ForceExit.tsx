import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import styled from 'styled-components';
import { Box, Heading, Layer, Form, TextInput } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { Validator } from '../types';

import { Button } from '../../../components/Button';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';
import { Text } from '../../../components/Text';
import { generateWithdrawalParams } from '../ActionUtils';
import { Alert } from '../../../components/Alert';
import { CloseButton } from './Shared';

const ModalSection = styled.div`
  padding: 1rem;
`;

interface Props {
  validator: Validator;
}

const ForceExit: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();
  const { locale, formatMessage } = useIntl();
  const [userConfirmationValue, setUserConfirmationValue] = useState('');

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(
    false
  );
  const [stepTwo, setStepTwo] = useState<boolean>(false);

  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  const openExitModal = () => {
    setStepTwo(false);
    setUserConfirmationValue('');
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setStepTwo(false);
    setUserConfirmationValue('');
  };

  const createExitTransaction = async () => {
    if (!account) return;

    setTransactionStatus('waiting_user_confirmation');
    setShowTxModal(true);

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

  const handleTxModalClose = () => {
    setShowTxModal(false);
    closeConfirmationModal();
  };

  const CONFIRM_EXIT_STRING = formatMessage({ defaultMessage: 'EXIT FULLY' });

  const { validatorindex } = validator;

  console.log({ transactionStatus }); // "not_started" > "waiting_user_confirmation" > "error" "user_rejected" | "success"
  return (
    <>
      {showConfirmationModal && (
        <Layer
          position="center"
          onEsc={closeConfirmationModal}
          onClickOutside={closeConfirmationModal}
          style={{ background: '#EEEEEE', maxWidth: '40rem' }}
        >
          <Box>
            <ModalSection
              style={{
                display: 'flex',
                alignItems: 'center',
                borderBottom: '1px solid #dedede',
                gap: '0.5rem',
                justifyContent: 'space-between',
              }}
            >
              <Heading
                level={3}
                margin="none"
                style={{
                  flex: 1,
                  fontSize: '1.5rem',
                }}
              >
                <FormattedMessage
                  defaultMessage="Exit validator {validatorindex}"
                  values={{ validatorindex }}
                />
              </Heading>
              <CloseButton label="Close" onClick={closeConfirmationModal} />
            </ModalSection>
            <ModalSection style={{ borderBottom: '1px solid #dedede' }}>
              <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem' }}>
                <Alert variant="error">
                  <div
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      alignItems: 'center',
                    }}
                  >
                    <AlertIcon />
                    <div>
                      <Text>
                        <strong>
                          <FormattedMessage defaultMessage="This account will be permanently exited from the network." />
                        </strong>
                      </Text>
                      <Text>
                        <FormattedMessage defaultMessage="This validator should remain online until exit epoch is reached." />
                      </Text>
                    </div>
                  </div>
                </Alert>
              </div>
              <div
                className="modal-body"
                style={{
                  display: 'flex',
                  gap: '1rem',
                  flexDirection: 'column',
                }}
              >
                <Text>
                  <FormattedMessage defaultMessage="This will initiate the process of permanently exiting this validator from the Ethereum proof-of-stake network." />
                </Text>
                <Text>
                  <FormattedMessage defaultMessage="You'll be asked to sign a message with your wallet. Processing of exits is not immediately, so account for several days before completion." />
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
                      <FormattedMessage defaultMessage="All remaining funds will be transferred to the connected withdrawal address within a few days after exit epoch reached" />
                    </Text>
                  </li>
                </ul>
              </div>
            </ModalSection>
          </Box>
          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="center"
            border="top"
            pad="1rem"
          >
            {stepTwo ? (
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
              />
            )}
          </Box>
        </Layer>
      )}

      {showTxModal && (
        <TransactionStatusModal
          headerMessage={
            <FormattedMessage
              defaultMessage="Initiating exit"
              values={{ validatorindex }}
            />
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={handleTxModalClose}
          handleRetry={createExitTransaction}
        />
      )}

      <Button
        label={<FormattedMessage defaultMessage="Force exit" />}
        onClick={openExitModal}
        destructive
      />
    </>
  );
};

export default ForceExit;
