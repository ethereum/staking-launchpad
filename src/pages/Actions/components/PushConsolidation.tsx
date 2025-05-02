/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Form, Layer, TextInput } from 'grommet';
import { Alert as AlertIcon, LinkDown as DownIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';

import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';
import ModalHeader from './ModalHeader';
import QueueWarning from './QueueWarning';
import {
  AlertContent,
  Hash,
  ModalBody,
  ModalContent,
  ModalFooter,
  modalLayerStyle,
} from './Shared';
import ValidatorSelector from './ValidatorSelector';

import { generateCompoundParams } from '../utils';
import { COMPOUNDING_CREDENTIALS, TICKER_NAME } from '../../../utils/envVars';
import { getCredentialType, getEtherBalance } from '../../../utils/validators';
import { getSignTxStatus } from '../../../utils/txStatus';

import { useCompoundingQueue } from '../../../hooks/useCompoundingQueue';
import { useTxModal } from '../../../hooks/useTxModal';
import { ValidatorType } from '../types';
import { Link } from '../../../components/Link';

type PushConsolidationProps = {
  sourceValidator: BeaconChainValidator; // The selected validator to migrate funds from (source)
  targetValidatorSet: BeaconChainValidator[]; // List of available target validators (Any 0x02 or higher, excluding the source)
};

const PushConsolidation = ({
  sourceValidator,
  targetValidatorSet,
}: PushConsolidationProps) => {
  const { locale } = useIntl();
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

  const [userConfirmationValue, setUserConfirmationValue] = useState<string>(
    ''
  );

  const [
    targetValidator,
    setTargetValidator,
  ] = useState<BeaconChainValidator | null>(null);

  useEffect(() => {
    setUserConfirmationValue('');
  }, [targetValidator]);

  const resetState = () => {
    resetTxModal();
    setTargetValidator(null);
    setUserConfirmationValue('');
  };

  const handleOpen = () => {
    setShowModal(true);
    setTargetValidator(null);
  };

  const createConsolidationTransaction = async () => {
    if (!account || !targetValidator) return;

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
        sourceValidator.pubkey,
        targetValidator.pubkey
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
    if (!targetValidator)
      return <FormattedMessage defaultMessage="Migrate funds" />;
    if (!showTx)
      return (
        <FormattedMessage defaultMessage="I understand the consequences, consolidate funds" />
      );
    return <FormattedMessage defaultMessage="Finish" />;
  };

  const matchingCredentials = useMemo(() => {
    if (!sourceValidator || !targetValidator) {
      return false;
    }

    return (
      sourceValidator.withdrawalcredentials.substring(4) ===
      targetValidator.withdrawalcredentials.substring(4)
    );
  }, [sourceValidator, targetValidator]);

  const validCredentials = useMemo(() => {
    if (targetValidator) {
      return (
        +targetValidator.withdrawalcredentials.slice(0, 4) >=
        +COMPOUNDING_CREDENTIALS
      );
    }
  }, [targetValidator]);

  const validValidatorState = useMemo(() => {
    // Handle both dora and beaconcha.in status'
    return (
      targetValidator &&
      ['active_online', 'active_offline', 'active_ongoing'].includes(
        targetValidator.status
      )
    );
  }, [targetValidator]);

  const validConfirmationMessage = useMemo(() => {
    if (targetValidator && !matchingCredentials) {
      return (
        userConfirmationValue.trim().toLowerCase() ===
        `i transfer my full validator balance to the owner of ${targetValidator.validatorindex}`
      );
    }

    return true;
  }, [matchingCredentials, userConfirmationValue, targetValidator]);

  return (
    <>
      <Button
        label={<FormattedMessage defaultMessage="Migrate funds" />}
        destructive
        onClick={handleOpen}
      />

      {showModal && (
        <Layer
          position="center"
          onEsc={resetState}
          onClickOutside={resetState}
          style={modalLayerStyle}
        >
          <ModalHeader onClose={resetState}>
            <FormattedMessage defaultMessage="Migrate and exit validator" />
          </ModalHeader>
          <ModalBody>
            {!showTx && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <FormattedMessage
                    defaultMessage="Which validator would you like to {migrateFundsTo}?"
                    description="{migrateFundsTo} indicates the direction funds will be transferred, and is emphasized visually"
                    values={{
                      migrateFundsTo: (
                        <strong>
                          <FormattedMessage defaultMessage="migrate funds to" />
                        </strong>
                      ),
                    }}
                  />
                </div>
                <ValidatorSelector
                  allowSearch
                  autoSelect={false}
                  validators={targetValidatorSet}
                  selectedValidator={targetValidator}
                  setSelectedValidator={setTargetValidator}
                />
              </div>
            )}

            {!targetValidator && (
              <ModalContent>
                <Text>
                  <FormattedMessage
                    defaultMessage="This will initiate the process of permanently {exiting} from the Ethereum proof-of-stake network."
                    values={{
                      exiting: (
                        <strong>
                          <FormattedMessage
                            defaultMessage="exiting index {sourceIndex}"
                            values={{
                              sourceIndex: sourceValidator.validatorindex,
                            }}
                          />
                        </strong>
                      ),
                    }}
                  />
                </Text>
                <Text>
                  <FormattedMessage defaultMessage="You'll be asked to sign a message with your wallet. Processing of exits is not immediate, so account for up to several days before completion." />
                </Text>
                <Text>
                  <FormattedMessage defaultMessage="Consolidation requests enter a separate queue with a small fee, shown as the transaction's send amount. The fee is minimal when the queue is short, with a small buffer added to prevent rejections from sudden activity spikes." />
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
                        defaultMessage="All remaining funds will be {transferredToDestination} within a few days after exit epoch reached"
                        values={{
                          transferredToDestination: (
                            <strong>
                              <FormattedMessage defaultMessage="transferred to the validator you select above" />
                            </strong>
                          ),
                        }}
                      />
                    </Text>
                  </li>
                </ul>
              </ModalContent>
            )}

            {/* eslint-disable-next-line no-nested-ternary */}
            {targetValidator && !validValidatorState ? (
              <div style={{ marginBottom: '1.5rem' }}>
                <Alert variant={'error'}>
                  <AlertContent>
                    <AlertIcon />
                    <div>
                      <Text style={{ marginBottom: '1rem' }}>
                        <strong>
                          <FormattedMessage defaultMessage="Target validator is not active" />
                        </strong>
                      </Text>
                      <Text>
                        <FormattedMessage defaultMessage="A validator can only be consolidated to if it is in the proper state of active/online." />
                      </Text>
                    </div>
                  </AlertContent>
                </Alert>
              </div>
            ) : targetValidator && validCredentials === false ? (
              <div style={{ marginBottom: '1.5rem' }}>
                <Alert variant={'error'}>
                  <AlertContent>
                    <AlertIcon />
                    <div>
                      <Text style={{ marginBottom: '1rem' }}>
                        <strong>
                          <FormattedMessage defaultMessage="Target validator is does not have Type 2 credentials and must be upgraded before funds can be pushed to it." />
                        </strong>
                      </Text>
                      {getCredentialType(targetValidator) ===
                        ValidatorType.BLS && (
                        <Text>
                          <Link inline primary to="/withdrawals">
                            <FormattedMessage defaultMessage="More on upgrading a validator with Type 0 credentials." />
                          </Link>
                        </Text>
                      )}
                      {getCredentialType(targetValidator) ===
                        ValidatorType.Execution && (
                        <Text>
                          <FormattedMessage defaultMessage="To upgrade to a Type 2 validator, please go back, select the target validator, and go through the 'Upgrade Validator' flow." />
                        </Text>
                      )}
                    </div>
                  </AlertContent>
                </Alert>
              </div>
            ) : null}

            {targetValidator &&
              !showTx &&
              validCredentials &&
              validValidatorState && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <Alert variant={matchingCredentials ? 'warning' : 'error'}>
                    <AlertContent>
                      <AlertIcon />
                      <div>
                        {!matchingCredentials && (
                          <Text style={{ marginBottom: '1rem' }}>
                            <strong>
                              <FormattedMessage defaultMessage="Target validator is not associated with your current wallet!" />
                            </strong>
                          </Text>
                        )}
                        <Text>
                          <strong>
                            <FormattedMessage
                              defaultMessage="Account {sourceIndex} will be exited from the network, and its full balance will be migrated to validator index {targetIndex}."
                              values={{
                                sourceIndex: sourceValidator.validatorindex,
                                targetIndex: targetValidator.validatorindex,
                              }}
                            />
                          </strong>
                        </Text>
                        <Text style={{ fontSize: '1rem' }}>
                          <FormattedMessage defaultMessage="The exiting validator should remain online until exit epoch is reached." />
                        </Text>
                      </div>
                    </AlertContent>
                  </Alert>
                </div>
              )}

            {targetValidator && (
              <ModalContent>
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
                      style={{ textTransform: 'uppercase', color: 'darkred' }}
                    >
                      <FormattedMessage defaultMessage="Exit" />
                    </Heading>
                    <Text>
                      <strong>
                        <FormattedMessage defaultMessage="Index" />:{' '}
                        {sourceValidator.validatorindex}
                      </strong>
                    </Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: '#555',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Hash>{sourceValidator.pubkey}</Hash>
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
                          style={{
                            textAlign: 'end',
                            fontFamily: 'monospace',
                          }}
                        >
                          {getEtherBalance(sourceValidator).toFixed(9)}{' '}
                          {TICKER_NAME}
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
                          style={{
                            textAlign: 'end',
                            fontFamily: 'monospace',
                          }}
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
                      {getEtherBalance(sourceValidator).toFixed(9)}{' '}
                      {TICKER_NAME}
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
                      <FormattedMessage defaultMessage="Migrate to" />
                    </Heading>
                    <Text>
                      <strong>
                        <FormattedMessage defaultMessage="Index" />:{' '}
                        {targetValidator.validatorindex}
                      </strong>
                    </Text>
                    <Text
                      style={{
                        fontSize: '14px',
                        color: '#555',
                        marginBottom: '0.5rem',
                      }}
                    >
                      <Hash>{targetValidator.pubkey}</Hash>
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
                          <FormattedMessage defaultMessage="Current" />:
                        </div>
                        <div
                          style={{
                            textAlign: 'end',
                            fontFamily: 'monospace',
                          }}
                        >
                          {getEtherBalance(targetValidator).toFixed(9)}{' '}
                          {TICKER_NAME}
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
                          style={{
                            textAlign: 'end',
                            fontFamily: 'monospace',
                            color: 'darkgreen',
                          }}
                        >
                          {(
                            getEtherBalance(targetValidator) +
                            getEtherBalance(sourceValidator)
                          ).toFixed(9)}{' '}
                          {TICKER_NAME}
                        </div>
                      </Text>
                    </div>
                  </div>
                </div>

                {showTx && (
                  <TransactionStatusInsert
                    headerMessage={
                      <>
                        <span>{sourceValidator.validatorindex}</span>{' '}
                        <span
                          style={{
                            transform: locale === 'ar' ? 'scale(-1)' : '',
                          }}
                        >
                          {String.fromCodePoint(0x27a0)}
                        </span>
                        <span>{targetValidator.validatorindex}</span>
                      </>
                    }
                    txHash={txHash}
                    transactionStatus={txStatus}
                  />
                )}
              </ModalContent>
            )}
          </ModalBody>
          {targetValidator && validCredentials && validValidatorState && (
            <ModalFooter>
              <QueueWarning queue={queue} />

              {!showTx && !matchingCredentials && targetValidator && (
                <Form
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
                  <label
                    htmlFor="confirm-push-input"
                    style={{ marginBottom: '0.25rem' }}
                  >
                    <Text>
                      <FormattedMessage
                        defaultMessage="Please type 'I TRANSFER MY FULL VALIDATOR BALANCE TO THE OWNER OF {targetIndex}' to acknowledge you understand where your validator balance is being transferred to."
                        values={{
                          targetIndex: targetValidator.validatorindex,
                        }}
                      />
                    </Text>
                  </label>
                  <TextInput
                    id="confirm-push-input"
                    name="confirm-push-input"
                    value={userConfirmationValue}
                    onChange={event =>
                      setUserConfirmationValue(event.target.value)
                    }
                    style={{ background: 'white', border: '1px solid #ccc' }}
                  />
                </Form>
              )}

              {!['error', 'complete'].includes(signTxStatus) && (
                <Button
                  fullWidth
                  destructive
                  disabled={
                    !targetValidator ||
                    (!matchingCredentials && !validConfirmationMessage)
                  }
                  label={getModalButtonLabel()}
                  onClick={createConsolidationTransaction}
                />
              )}
              {signTxStatus === 'error' && (
                <Button
                  label={<FormattedMessage defaultMessage="Try again" />}
                  onClick={createConsolidationTransaction}
                  destructive
                  secondary
                />
              )}
              {signTxStatus === 'complete' && (
                <Button
                  label={<FormattedMessage defaultMessage="Finish" />}
                  onClick={resetState}
                />
              )}
            </ModalFooter>
          )}
        </Layer>
      )}
    </>
  );
};

export default PushConsolidation;
