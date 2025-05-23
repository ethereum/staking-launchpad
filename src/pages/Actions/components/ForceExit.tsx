import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Layer, Form, TextInput } from 'grommet';
import { Alert as AlertIcon, LinkDown as DownIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';

import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import ModalHeader from './ModalHeader';
import QueueWarning from './QueueWarning';
import { Text } from '../../../components/Text';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';
import {
  AlertContainer,
  AlertContent,
  Hash,
  ModalBody,
  ModalContent,
  ModalFooter,
  modalLayerStyle,
} from './Shared';

import { generateWithdrawalParams, isValidatorNascent } from '../utils';
import { getEtherBalance } from '../../../utils/validators';
import { getSignTxStatus } from '../../../utils/txStatus';
import { TICKER_NAME } from '../../../utils/envVars';

import { useExecutionBalance } from '../../../hooks/useExecutionBalance';
import { useTxModal } from '../../../hooks/useTxModal';
import { useWithdrawalQueue } from '../../../hooks/useWithdrawalQueue';

interface Props {
  validator: BeaconChainValidator;
}

const ForceExit: React.FC<Props> = ({ validator }) => {
  const { locale, formatMessage } = useIntl();
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
  const { queue, setQueue } = useWithdrawalQueue(!showTx);
  const executionEtherBalance = useExecutionBalance();

  const [userConfirmationValue, setUserConfirmationValue] = useState('');
  const [stepTwo, setStepTwo] = useState(false);

  const resetState = () => {
    resetTxModal();
    setStepTwo(false);
    setUserConfirmationValue('');
  };

  const handleOpen = () => {
    resetState();
    setShowModal(true);
  };

  const createExitTransaction = async () => {
    if (!account) return;

    setTxStatus('waiting_user_confirmation');
    setShowTx(true);

    const walletProvider = await (connector as AbstractConnector).getProvider();
    const web3 = new Web3(walletProvider);

    // Full exits have withdrawal amount of 0
    const {
      transactionParams,
      queue: withdrawalQueue,
    } = await generateWithdrawalParams(web3, account, validator.pubkey, 0);

    setQueue(withdrawalQueue);

    web3.eth
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
  };

  const CONFIRM_EXIT_STRING = formatMessage({
    defaultMessage: 'UNSTAKE FUNDS',
  });

  const { validatorindex } = validator;

  const signTxStatus = getSignTxStatus(txStatus);

  return (
    <>
      <Button
        label={<FormattedMessage defaultMessage="Exit fully" />}
        onClick={handleOpen}
        destructive
        disabled={isValidatorNascent(validator)} // https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md#modified-process_voluntary_exit
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
                    <Text className="text-bold">
                      <FormattedMessage defaultMessage="This account will be permanently exited from the network." />
                    </Text>
                    <Text style={{ fontSize: '1rem' }}>
                      <FormattedMessage defaultMessage="This validator should remain online until exit epoch is reached." />
                    </Text>
                  </div>
                </AlertContent>
              </Alert>
            </AlertContainer>
            <ModalContent>
              {!showTx && !stepTwo && (
                <>
                  <Text>
                    <FormattedMessage defaultMessage="This will initiate the process of permanently exiting this validator from the Ethereum proof-of-stake network." />
                  </Text>
                  <Text>
                    <FormattedMessage defaultMessage="You'll be asked to sign a message with your wallet. Processing of exits is not immediate, so account for up to several days before completion." />
                  </Text>
                  <ul
                    style={{
                      paddingInlineStart: '1.5rem',
                      marginTop: 0,
                      fontSize: '1rem',
                    }}
                  >
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
                              <strong className="text-bold">
                                <FormattedMessage defaultMessage="connected execution withdrawal address" />
                              </strong>
                            ),
                          }}
                        />
                      </Text>
                    </li>
                  </ul>
                  <Text style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                    <FormattedMessage defaultMessage="Exit requests enter a separate queue with a small fee, shown as the transaction's send amount. The fee is minimal when the queue is short, with a small buffer added to prevent rejections from sudden activity spikes." />
                  </Text>
                </>
              )}

              {stepTwo && (
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      background: '#fff',
                      padding: '1rem',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      border: '2px solid darkred',
                    }}
                  >
                    <Heading
                      level={3}
                      style={{
                        textTransform: 'uppercase',
                        color: 'darkred',
                      }}
                    >
                      <FormattedMessage defaultMessage="Exit" />
                    </Heading>
                    <Text className="text-bold">
                      <FormattedMessage defaultMessage="Index" />:{' '}
                      {validator.validatorindex}
                    </Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: '#555',
                        lineHeight: '1.3',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Hash>{validator.pubkey}</Hash>
                    </Text>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                      }}
                    >
                      <Text
                        style={{
                          display: 'grid',
                          gridColumn: 'span 2',
                          gridTemplateColumns: 'subgrid',
                          columnGap: '0.5rem',
                        }}
                      >
                        <div>
                          <FormattedMessage defaultMessage="Balance" />:
                        </div>
                        <div
                          style={{ textAlign: 'end', fontFamily: 'monospace' }}
                        >
                          {getEtherBalance(validator).toFixed(9)} {TICKER_NAME}
                        </div>
                      </Text>

                      <Text
                        style={{
                          display: 'grid',
                          gridColumn: 'span 2',
                          gridTemplateColumns: 'subgrid',
                          columnGap: '0.5rem',
                        }}
                      >
                        <div>
                          <FormattedMessage defaultMessage="New balance" />:
                        </div>
                        <div
                          style={{ textAlign: 'end', fontFamily: 'monospace' }}
                        >
                          {(0).toFixed(9)} {TICKER_NAME}
                        </div>
                      </Text>
                    </div>
                  </div>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      margin: '0.25rem auto',
                    }}
                  >
                    <DownIcon />
                    <Text
                      style={{
                        fontFamily: 'monospace',
                        fontSize: '1rem',
                        color: 'darkred',
                      }}
                    >
                      {getEtherBalance(validator).toFixed(9)} {TICKER_NAME}
                    </Text>
                  </div>

                  <div
                    style={{
                      background: '#fff',
                      padding: '1rem',
                      maxWidth: '100%',
                      borderRadius: '8px',
                      border: '2px solid darkgreen',
                    }}
                  >
                    <Heading
                      level={3}
                      style={{
                        textTransform: 'uppercase',
                        color: 'darkgreen',
                      }}
                    >
                      <FormattedMessage defaultMessage="Withdraw to" />
                    </Heading>
                    <Text className="text-bold">
                      <FormattedMessage defaultMessage="Execution account" />:
                    </Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: '#555',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Hash style={{ fontSize: '1rem' }}>{account}</Hash>
                    </Text>

                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                      }}
                    >
                      {executionEtherBalance && (
                        <Text
                          style={{
                            display: 'grid',
                            gridColumn: 'span 2',
                            gridTemplateColumns: 'subgrid',
                            columnGap: '0.5rem',
                          }}
                        >
                          <div>
                            <FormattedMessage defaultMessage="Current" />:
                          </div>
                          <div
                            style={{
                              textAlign: 'end',
                              fontFamily: 'monospace',
                            }}
                          >
                            {executionEtherBalance.toFixed(9)} {TICKER_NAME}
                          </div>
                        </Text>
                      )}

                      {executionEtherBalance && (
                        <Text
                          style={{
                            display: 'grid',
                            gridColumn: 'span 2',
                            gridTemplateColumns: 'subgrid',
                            columnGap: '0.5rem',
                          }}
                        >
                          <div>
                            <FormattedMessage defaultMessage="New balance" />:
                          </div>
                          <div
                            style={{
                              textAlign: 'end',
                              fontFamily: 'monospace',
                              color: 'darkgreen',
                            }}
                          >
                            {(
                              executionEtherBalance + getEtherBalance(validator)
                            ).toFixed(9)}{' '}
                            {TICKER_NAME}
                          </div>
                        </Text>
                      )}
                    </div>
                  </div>
                </div>
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
                  transactionStatus={txStatus}
                />
              )}
            </ModalContent>
          </ModalBody>
          <ModalFooter>
            <QueueWarning queue={queue} />

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
                      Please type{' '}
                      <strong className="text-bold">
                        {CONFIRM_EXIT_STRING}
                      </strong>{' '}
                      to confirm.
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
                    label={
                      <FormattedMessage defaultMessage="I understand the consequences, exit this validator" />
                    }
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
                onClick={resetState}
              />
            )}
          </ModalFooter>
        </Layer>
      )}
    </>
  );
};

export default ForceExit;
