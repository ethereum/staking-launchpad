import React, { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Box, Layer } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { Validator } from '../types';

import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import { Text } from '../../../components/Text';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';
import ModalHeader from './ModalHeader';
import { ModalBody, AlertContent, ModalContent, Hash } from './Shared';
import ValidatorSelector from './ValidatorSelector';

import { generateCompoundParams } from '../ActionUtils';
import { TICKER_NAME } from '../../../utils/envVars';

type PullConsolidationProps = {
  targetValidator: Validator; // The selected validator to consolidate into (target)
  sourceValidatorSet: Validator[]; // List of available source validators (Any 0x01 or higher, excluding the target)
};

const PullConsolidation = ({
  targetValidator,
  sourceValidatorSet,
}: PullConsolidationProps) => {
  const { locale } = useIntl();
  const { connector, account } = useWeb3React();

  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(
    null
  );
  const [showSelectValidatorModal, setShowSelectValidatorModal] = useState<
    boolean
  >(false);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  const confirmConsolidate = () => {
    setShowSelectValidatorModal(true);
    setSelectedValidator(null);
  };

  const closeSelectValidatorModal = () => {
    setShowSelectValidatorModal(false);
    setSelectedValidator(null);
  };

  const createConsolidationTransaction = async () => {
    if (!account || !selectedValidator) return;

    setTransactionStatus('waiting_user_confirmation');
    // setShowSelectValidatorModal(false);
    setShowTxModal(true);

    try {
      const walletProvider = await (connector as AbstractConnector).getProvider();
      const web3 = new Web3(walletProvider);

      const params = await generateCompoundParams(
        web3,
        account,
        selectedValidator.pubkey,
        targetValidator.pubkey
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

  const handleClose = () => {
    setShowTxModal(false);
    closeSelectValidatorModal();
  };
  return (
    <>
      {showSelectValidatorModal && (
        <Layer
          position="center"
          onEsc={closeSelectValidatorModal}
          onClickOutside={closeSelectValidatorModal}
          style={{
            background: '#EEEEEE',
            width: 'clamp(min(432px,100%), 50vw, 40rem)',
          }}
        >
          <Box>
            <ModalHeader onClose={closeSelectValidatorModal}>
              <FormattedMessage defaultMessage="Absorb validator" />
            </ModalHeader>
            <ModalBody>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ marginBottom: '0.5rem' }}>
                  <FormattedMessage defaultMessage="Which validator would you like to pull from?" />
                </div>
                <ValidatorSelector
                  validators={sourceValidatorSet}
                  selectedValidator={selectedValidator}
                  setSelectedValidator={setSelectedValidator}
                />
              </div>
              {selectedValidator && (
                <div style={{ marginBlock: '1.5rem' }}>
                  <Alert variant="error">
                    <AlertContent>
                      <AlertIcon />
                      <div>
                        <Text>
                          <strong>
                            <FormattedMessage
                              defaultMessage="Account {sourceIndex} will be exited from the network, and its full balance will be migrated to validator index {targetIndex}."
                              values={{
                                targetIndex: targetValidator.validatorindex,
                                sourceIndex: selectedValidator.validatorindex,
                              }}
                            />
                          </strong>
                        </Text>
                        <Text style={{ fontSize: '1rem' }}>
                          <FormattedMessage defaultMessage="The chosen validator should remain online until exit epoch is reached." />
                        </Text>
                      </div>
                    </AlertContent>
                  </Alert>
                </div>
              )}
              {selectedValidator ? (
                <ModalContent>
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1rem',
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
                        <FormattedMessage defaultMessage="From" />
                      </Heading>
                      <Text>
                        <strong>
                          <FormattedMessage defaultMessage="Index" />:{' '}
                          {selectedValidator.validatorindex}
                        </strong>
                      </Text>
                      <Text
                        style={{
                          fontSize: '14px',
                          color: '#555',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <Hash>{selectedValidator.pubkey}</Hash>
                      </Text>
                      <Text>
                        <FormattedMessage defaultMessage="Current balance" />:{' '}
                        {selectedValidator.coinBalance} {TICKER_NAME}
                      </Text>
                      <Text>
                        <FormattedMessage defaultMessage="Ending balance" />:{' '}
                        <strong>0 {TICKER_NAME}</strong>
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
                        <FormattedMessage defaultMessage="To" />
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
                      <Text>
                        <FormattedMessage defaultMessage="Current balance" />:{' '}
                        {targetValidator.coinBalance} {TICKER_NAME}
                      </Text>
                      <Text>
                        <FormattedMessage defaultMessage="Ending balance" />:{' '}
                        <strong>
                          {targetValidator.coinBalance +
                            selectedValidator.coinBalance}{' '}
                          {TICKER_NAME}
                        </strong>
                      </Text>
                    </div>
                  </div>
                </ModalContent>
              ) : (
                <ModalContent>
                  <Text>
                    <FormattedMessage defaultMessage="This will initiate the process of permanently exiting the chosen validator from the Ethereum proof-of-stake network." />
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
                          defaultMessage="All remaining funds will be transferred to the {address} within a few days after exit epoch reached"
                          values={{
                            address: (
                              <strong>
                                <FormattedMessage
                                  defaultMessage="validator index {index}"
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
                </ModalContent>
              )}
            </ModalBody>
          </Box>

          <Box as="footer" pad="1rem">
            <Button
              fullWidth
              destructive
              secondary
              disabled={!selectedValidator}
              label={
                selectedValidator ? (
                  <FormattedMessage defaultMessage="I understand the consequences, consolidate funds" />
                ) : (
                  <FormattedMessage defaultMessage="Pull funds" />
                )
              }
              onClick={createConsolidationTransaction}
            />
          </Box>
        </Layer>
      )}

      {showTxModal && selectedValidator && (
        <TransactionStatusModal
          headerMessage={
            <>
              <span>{selectedValidator.validatorindex}</span>{' '}
              <span style={{ transform: locale === 'ar' ? 'scale(-1)' : '' }}>
                {String.fromCodePoint(0x27a0)}
              </span>
              <span>{targetValidator.validatorindex}</span>
            </>
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={handleClose}
          handleRetry={createConsolidationTransaction}
        />
      )}

      <Button
        label="Pull funds"
        destructive
        secondary
        onClick={() => confirmConsolidate()}
      />
    </>
  );
};

export default PullConsolidation;
