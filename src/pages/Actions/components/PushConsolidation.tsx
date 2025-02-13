import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Layer } from 'grommet';
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
import { TICKER_NAME } from '../../../utils/envVars';
import { getEtherBalance } from '../../../utils/validators';
import { getSignTxStatus } from '../../../utils/txStatus';

import { useCompoundingQueue } from '../../../hooks/useCompoundingQueue';
import { useTxModal } from '../../../hooks/useTxModal';

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

  const [
    targetValidator,
    setTargetValidator,
  ] = useState<BeaconChainValidator | null>(null);

  const resetState = () => {
    resetTxModal();
    setTargetValidator(null);
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
        targetValidator.pubkey,
        sourceValidator.pubkey
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

  return (
    <>
      {showModal && (
        <Layer
          position="center"
          onEsc={resetState}
          onClickOutside={resetState}
          style={modalLayerStyle}
        >
          <Box>
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

              {targetValidator && !showTx && (
                <div style={{ marginBottom: '1.5rem' }}>
                  <Alert variant="warning">
                    <AlertContent>
                      <AlertIcon />
                      <div>
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
          </Box>
          <ModalFooter>
            <QueueWarning queue={queue} />

            {!['error', 'complete'].includes(signTxStatus) && (
              <Button
                fullWidth
                destructive
                disabled={!targetValidator}
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
        </Layer>
      )}

      <Button
        label={<FormattedMessage defaultMessage="Migrate funds" />}
        destructive
        onClick={handleOpen}
      />
    </>
  );
};

export default PushConsolidation;
