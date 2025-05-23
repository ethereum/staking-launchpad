import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Layer } from 'grommet';
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
  ModalBody,
  AlertContent,
  ModalContent,
  Hash,
  modalLayerStyle,
  ModalFooter,
} from './Shared';
import ValidatorSelector from './ValidatorSelector';

import { generateCompoundParams } from '../utils';
import { TICKER_NAME } from '../../../utils/envVars';
import { getEtherBalance, getCredentialType } from '../../../utils/validators';
import { getSignTxStatus } from '../../../utils/txStatus';
import { useTxModal } from '../../../hooks/useTxModal';
import { useCompoundingQueue } from '../../../hooks/useCompoundingQueue';
import { ValidatorType } from '../types';

type PullConsolidationProps = {
  targetValidator: BeaconChainValidator; // The selected validator to consolidate into (target)
  sourceValidatorSet: BeaconChainValidator[]; // List of available source validators (Any 0x01 or higher, excluding the target)
};

const PullConsolidation = ({
  targetValidator,
  sourceValidatorSet,
}: PullConsolidationProps) => {
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

  const [
    sourceValidator,
    setSourceValidator,
  ] = useState<BeaconChainValidator | null>(null);

  const resetState = () => {
    resetTxModal();
    setSourceValidator(null);
  };

  const handleOpen = () => {
    resetState();
    setShowModal(true);
  };

  const createConsolidationTransaction = async () => {
    if (!account || !sourceValidator) return;

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
    if (!sourceValidator)
      return <FormattedMessage defaultMessage="Pull funds" />;
    if (!showTx)
      return (
        <FormattedMessage defaultMessage="I understand the consequences, consolidate funds" />
      );
    return <FormattedMessage defaultMessage="Finish" />;
  };

  return (
    <>
      <Button
        label={<FormattedMessage defaultMessage="Pull funds" />}
        disabled={
          getCredentialType(targetValidator) < ValidatorType.Compounding ||
          sourceValidatorSet.length < 1
        }
        destructive
        secondary
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
            <FormattedMessage defaultMessage="Absorb validator" />
          </ModalHeader>
          <ModalBody>
            {!showTx && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <FormattedMessage
                    defaultMessage="Which validator would you like to {pullFrom}?"
                    values={{
                      pullFrom: (
                        <strong className="text-bold">
                          <FormattedMessage defaultMessage="pull full balance from" />
                        </strong>
                      ),
                    }}
                  />
                </div>
                <ValidatorSelector
                  validators={sourceValidatorSet}
                  selectedValidator={sourceValidator}
                  setSelectedValidator={setSourceValidator}
                />
              </div>
            )}

            {sourceValidator && !showTx && (
              <div style={{ marginBlock: '1.5rem' }}>
                <Alert variant="warning">
                  <AlertContent>
                    <AlertIcon />
                    <div>
                      <Text className="text-bold">
                        <FormattedMessage
                          defaultMessage="Account {sourceIndex} will be exited from the network, and its full balance will be migrated to validator index {targetIndex}."
                          values={{
                            targetIndex: targetValidator.validatorindex,
                            sourceIndex: sourceValidator.validatorindex,
                          }}
                        />
                      </Text>
                      <Text style={{ fontSize: '1rem' }}>
                        <FormattedMessage defaultMessage="The exiting validator should remain online until exit epoch is reached." />
                      </Text>
                    </div>
                  </AlertContent>
                </Alert>
              </div>
            )}

            {sourceValidator ? (
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
                    <Text className="text-bold">
                      <FormattedMessage defaultMessage="Index" />:{' '}
                      {sourceValidator.validatorindex}
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
                    <Text className="text-bold">
                      <FormattedMessage defaultMessage="Index" />:{' '}
                      {targetValidator.validatorindex}
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
            ) : (
              <ModalContent>
                <Text>
                  <FormattedMessage
                    defaultMessage="This will initiate the process of permanently {exiting} from the Ethereum proof-of-stake network."
                    values={{
                      exiting: (
                        <strong className="text-bold">
                          <FormattedMessage defaultMessage="exiting the validator you choose above" />
                        </strong>
                      ),
                    }}
                  />
                </Text>

                <Text>
                  <FormattedMessage defaultMessage="This will initiate the process of permanently exiting the chosen validator from the Ethereum proof-of-stake network." />
                </Text>
                <Text>
                  <FormattedMessage defaultMessage="You'll be asked to sign a message with your wallet. Processing of exits is not immediate, so account for up to several days before completion." />
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
                            <strong className="text-bold">
                              <FormattedMessage
                                defaultMessage="transferred to validator index {index}"
                                values={{
                                  index: targetValidator.validatorindex,
                                }}
                              />
                            </strong>
                          ),
                        }}
                      />
                    </Text>
                  </li>
                </ul>
                <Text style={{ fontSize: '0.875rem', lineHeight: '1.25rem' }}>
                  <FormattedMessage defaultMessage="Consolidation requests enter a separate queue with a small fee, shown as the transaction's send amount. The fee is minimal when the queue is short, with a small buffer added to prevent rejections from sudden activity spikes." />
                </Text>
              </ModalContent>
            )}
          </ModalBody>
          <ModalFooter>
            <QueueWarning queue={queue} />

            {!['error', 'complete'].includes(signTxStatus) && (
              <Button
                fullWidth
                destructive
                disabled={
                  !sourceValidator ||
                  (showTx && !['error', 'complete'].includes(signTxStatus))
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

export default PullConsolidation;
