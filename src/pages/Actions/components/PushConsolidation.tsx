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
import { TransactionStatus } from '../../../components/TransactionStatusModal';
import ModalHeader from './ModalHeader';
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
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';
import { getSignTxStatus } from '../../../utils/txStatus';
import { useModal } from '../../../hooks/useModal';

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
  const { showModal, setShowModal, showTx, setShowTx } = useModal();

  const [
    targetValidator,
    setTargetValidator,
  ] = useState<BeaconChainValidator | null>(null);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState('');

  const confirmConsolidate = () => {
    setShowModal(true);
    setTargetValidator(null);
  };

  const createConsolidationTransaction = async () => {
    if (!account || !targetValidator) return;

    setTransactionStatus('waiting_user_confirmation');
    setShowTx(true);

    try {
      const walletProvider = await (connector as AbstractConnector).getProvider();
      const web3 = new Web3(walletProvider);

      const params = await generateCompoundParams(
        web3,
        account,
        targetValidator.pubkey,
        sourceValidator.pubkey
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
    if (!targetValidator)
      return <FormattedMessage defaultMessage="Migrate funds" />;
    if (!showTx)
      return (
        <FormattedMessage defaultMessage="I understand the consequences, consolidate funds" />
      );
    return <FormattedMessage defaultMessage="Finish" />;
  };

  const handleClose = () => {
    setShowTx(false);
    setShowModal(false);
    setTargetValidator(null);
  };
  return (
    <>
      {showModal && (
        <Layer
          position="center"
          onEsc={handleClose}
          onClickOutside={handleClose}
          style={modalLayerStyle}
        >
          <Box>
            <ModalHeader onClose={handleClose}>
              <FormattedMessage defaultMessage="Migrate and exit validator" />
            </ModalHeader>
            <ModalBody>
              {!targetValidator && (
                <ModalContent>
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
                          defaultMessage="All remaining funds will be transferred to the {destination} within a few days after exit epoch reached"
                          values={{
                            destination: (
                              <strong>
                                <FormattedMessage defaultMessage="validator index you choose below" />
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

              {!showTx && (
                <div
                  style={{
                    marginBottom: '1.5rem',
                    marginTop: targetValidator ? '0' : '1rem',
                  }}
                >
                  <div style={{ marginBottom: '0.5rem' }}>
                    <FormattedMessage defaultMessage="Which validator would you like to migrate funds to?" />
                  </div>
                  <ValidatorSelector
                    validators={targetValidatorSet}
                    selectedValidator={targetValidator}
                    setSelectedValidator={setTargetValidator}
                  />
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
                      transactionStatus={transactionStatus}
                    />
                  )}
                </ModalContent>
              )}
            </ModalBody>
          </Box>
          <ModalFooter>
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
                onClick={handleClose}
              />
            )}
          </ModalFooter>
        </Layer>
      )}

      <Button label="Migrate funds" destructive onClick={confirmConsolidate} />
    </>
  );
};

export default PushConsolidation;
