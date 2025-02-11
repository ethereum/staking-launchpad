/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Form } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';

import { Alert } from '../../../components/Alert';
import { Button } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import ModalHeader from './ModalHeader';
import { NumberInput } from '../../../components/NumberInput';
import {
  ModalBody,
  ModalContent,
  Hash,
  AlertContainer,
  AlertContent,
  modalLayerStyle,
  ModalFooter,
} from './Shared';
import { Text } from '../../../components/Text';
import { TransactionStatus } from '../../../components/TransactionStatusModal';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';

import { generateWithdrawalParams } from '../ActionUtils';
import { MIN_ACTIVATION_BALANCE, TICKER_NAME } from '../../../utils/envVars';
import { getEtherBalance } from '../../../utils/validators';

import { useExecutionBalance } from '../../../hooks/useExecutionBalance';
import { useModal } from '../../../hooks/useModal';
import { getSignTxStatus } from '../../../utils/txStatus';

interface Props {
  validator: BeaconChainValidator;
}

const PartialWithdraw: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();
  const { showModal, setShowModal, showTx, setShowTx } = useModal();

  const executionEtherBalance = useExecutionBalance();
  const [etherAmount, setEtherAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  useEffect(() => {
    setMaxAmount(
      Math.max(0, getEtherBalance(validator) - MIN_ACTIVATION_BALANCE)
    );
  }, [validator]);

  const openInputModal = () => {
    setEtherAmount(0);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowTx(false);
    setShowModal(false);
    setEtherAmount(0);
  };

  const createWithdrawTransaction = async () => {
    if (!etherAmount || !account) return;

    setTransactionStatus('waiting_user_confirmation');
    setShowTx(true);

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);

    // Partial withdrawal transaction
    const transactionParams = await generateWithdrawalParams(
      web3,
      account,
      validator.pubkey,
      Math.floor(etherAmount * 1000000000)
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

  const signTxStatus = getSignTxStatus(transactionStatus);

  return (
    <>
      <Button
        disabled={maxAmount <= 0}
        onClick={openInputModal}
        label={<FormattedMessage defaultMessage="Start withdrawal" />}
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
              defaultMessage="Withdrawal some {TICKER_NAME}"
              values={{ TICKER_NAME }}
            />
          </ModalHeader>
          <ModalBody>
            {!showTx && (
              <AlertContainer>
                <Alert variant="info">
                  <AlertContent>
                    <AlertIcon />
                    <div>
                      <Text>
                        <strong>
                          <FormattedMessage defaultMessage="Withdrawal requests are added to a queue for processing." />
                        </strong>
                      </Text>
                      <Text style={{ fontSize: '1rem' }}>
                        <FormattedMessage defaultMessage="Network congestion may result in delays" />
                      </Text>
                    </div>
                  </AlertContent>
                </Alert>
              </AlertContainer>
            )}

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
                  }}
                >
                  <Heading
                    level={3}
                    style={{
                      textTransform: 'uppercase',
                      color: 'darkred',
                    }}
                  >
                    <FormattedMessage defaultMessage="From" />
                  </Heading>
                  <Text>
                    <strong>
                      <FormattedMessage defaultMessage="Index" />:{' '}
                      {validator.validatorindex}
                    </strong>
                  </Text>
                  <Text
                    style={{
                      fontSize: '14px',
                      color: '#555',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Hash>{validator.pubkey}</Hash>
                  </Text>

                  <Text className="mb10">
                    <FormattedMessage defaultMessage="Max withdrawable" />:{' '}
                    {maxAmount} {TICKER_NAME}
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
                        <FormattedMessage defaultMessage="Current balance" />:
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
                        <FormattedMessage defaultMessage="Balance change" />:
                      </div>
                      <div
                        style={{
                          textAlign: 'end',
                          fontFamily: 'monospace',
                          color: 'darkred',
                        }}
                      >
                        {etherAmount > 0 ? '-' : ''}
                        {etherAmount.toFixed(9)} {TICKER_NAME}
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
                        <FormattedMessage defaultMessage="Ending balance" />:
                      </div>
                      <div
                        style={{ textAlign: 'end', fontFamily: 'monospace' }}
                      >
                        {(getEtherBalance(validator) - etherAmount).toFixed(9)}{' '}
                        {TICKER_NAME}
                      </div>
                    </Text>
                  </div>
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
                      <FormattedMessage defaultMessage="Execution account" />:
                    </strong>
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
                          <FormattedMessage defaultMessage="Current balance" />:
                        </div>
                        <div
                          style={{ textAlign: 'end', fontFamily: 'monospace' }}
                        >
                          {executionEtherBalance.toFixed(9)} {TICKER_NAME}
                        </div>
                      </Text>
                    )}
                    <Text
                      style={{
                        display: 'grid',
                        gridColumn: 'span 2',
                        gridTemplateColumns: 'subgrid',
                        columnGap: '0.5rem',
                      }}
                    >
                      <div>
                        <FormattedMessage defaultMessage="Balance change" />:
                      </div>
                      <div
                        style={{
                          textAlign: 'end',
                          fontFamily: 'monospace',
                          color: 'darkgreen',
                        }}
                      >
                        {etherAmount > 0 ? '+' : ''}
                        {etherAmount.toFixed(9)} {TICKER_NAME}
                      </div>
                    </Text>
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
                          <FormattedMessage defaultMessage="Ending balance" />:
                        </div>
                        <div
                          style={{ textAlign: 'end', fontFamily: 'monospace' }}
                        >
                          {(executionEtherBalance + etherAmount).toFixed(9)}{' '}
                          {TICKER_NAME}
                        </div>
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              {showTx && (
                <TransactionStatusInsert
                  headerMessage={
                    <FormattedMessage
                      defaultMessage="Initiate withdrawal"
                      values={{ amount: etherAmount, TICKER_NAME }}
                    />
                  }
                  txHash={txHash}
                  transactionStatus={transactionStatus}
                />
              )}
            </ModalContent>
          </ModalBody>
          <ModalFooter>
            {!['error', 'complete'].includes(signTxStatus) && (
              <Form
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.5rem',
                }}
              >
                {!showTx && (
                  <label
                    htmlFor="withdrawal-amount"
                    style={{ marginBottom: '0.25rem' }}
                  >
                    <Text>
                      <FormattedMessage
                        defaultMessage="How much {TICKER_NAME} would you like to withdraw?"
                        values={{ TICKER_NAME }}
                      />
                    </Text>
                  </label>
                )}
                {!showTx && (
                  <NumberInput
                    id="withdrawal-amount"
                    value={etherAmount}
                    setValue={value => {
                      setEtherAmount(Math.min(value, maxAmount));
                    }}
                    allowDecimals
                    maxValue={maxAmount}
                  />
                )}
                <Button
                  style={{ fontSize: '1rem' }}
                  label="Withdrawal"
                  onClick={createWithdrawTransaction}
                  color="dark-3"
                  fullWidth
                  type="submit"
                  disabled={!etherAmount || showTx}
                />
              </Form>
            )}

            {signTxStatus === 'error' && (
              <Button
                label={<FormattedMessage defaultMessage="Try again" />}
                onClick={createWithdrawTransaction}
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
          </ModalFooter>
          )}
        </Layer>
      )}
    </>
  );
};

export default PartialWithdraw;
