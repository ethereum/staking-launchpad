import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Layer, Form } from 'grommet';
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
} from './Shared';
import { Text } from '../../../components/Text';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';

import { generateWithdrawalParams } from '../ActionUtils';
import { MIN_ACTIVATION_BALANCE, TICKER_NAME } from '../../../utils/envVars';
import { getEtherBalance } from '../../../utils/validators';

import { useExecutionBalance } from '../../../hooks/useExecutionBalance';

interface Props {
  validator: BeaconChainValidator;
}

const PartialWithdraw: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();
  const executionEtherBalance = useExecutionBalance();

  const [amount, setAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);
  const [showInputModal, setShowInputModal] = useState(false);
  const [showTxModal, setShowTxModal] = useState(false);
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
    setAmount(0);
    setShowInputModal(true);
  };

  const closeInputModal = () => {
    setShowInputModal(false);
    setAmount(0);
  };

  const handleTxClose = () => {
    setShowTxModal(false);
    closeInputModal();
  };

  const createWithdrawTransaction = async () => {
    if (!amount || !account) return;

    setTransactionStatus('waiting_user_confirmation');
    setShowTxModal(true);

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);

    // Partial withdrawal transaction
    const transactionParams = await generateWithdrawalParams(
      web3,
      account,
      validator.pubkey,
      Math.floor(amount * 1000000000)
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

  return (
    <>
      <Button
        disabled={maxAmount <= 0}
        onClick={openInputModal}
        label={<FormattedMessage defaultMessage="Start withdrawal" />}
      />

      {showInputModal && (
        <Layer
          position="center"
          onEsc={closeInputModal}
          onClickOutside={closeInputModal}
          style={{ background: '#EEEEEE', maxWidth: '40rem' }}
        >
          <ModalHeader onClose={closeInputModal}>
            <FormattedMessage
              defaultMessage="Withdrawal some {TICKER_NAME}"
              values={{ TICKER_NAME }}
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
                        <FormattedMessage defaultMessage="Withdrawals request are added to a queue for processing." />
                      </strong>
                    </Text>
                    <Text style={{ fontSize: '1rem' }}>
                      <FormattedMessage defaultMessage="Network congestion may result in delays" />
                    </Text>
                  </div>
                </AlertContent>
              </Alert>
            </AlertContainer>

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
                    <FormattedMessage defaultMessage="Current balance" />:{' '}
                    {getEtherBalance(validator)} {TICKER_NAME}
                  </Text>
                  <Text className="mb10">
                    <FormattedMessage defaultMessage="Max withdrawable" />:{' '}
                    {maxAmount} {TICKER_NAME}
                  </Text>
                  <Text>
                    <FormattedMessage defaultMessage="Ending balance" />:{' '}
                    <strong>
                      {getEtherBalance(validator) - amount} {TICKER_NAME}
                    </strong>
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
                  {executionEtherBalance ? (
                    <>
                      <Text className="mb10">
                        <FormattedMessage defaultMessage="Current balance" />:{' '}
                        {executionEtherBalance} {TICKER_NAME}
                      </Text>
                      <Text>
                        <FormattedMessage defaultMessage="Ending balance" />:{' '}
                        <strong>
                          {executionEtherBalance - amount} {TICKER_NAME}
                        </strong>
                      </Text>
                    </>
                  ) : (
                    <Text>
                      <FormattedMessage defaultMessage="Balance change" />:
                      <strong>
                        +{amount} {TICKER_NAME}
                      </strong>
                    </Text>
                  )}
                </div>
              </div>
            </ModalContent>
          </ModalBody>

          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="center"
            border="top"
            pad="1rem"
          >
            <Form
              style={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.5rem',
              }}
            >
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
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
              <NumberInput
                id="withdrawal-amount"
                value={amount}
                setValue={value => {
                  setAmount(Math.min(value, maxAmount));
                }}
                allowDecimals
                maxValue={maxAmount}
              />
              <Button
                style={{ fontSize: '1rem' }}
                label="Withdrawal"
                onClick={createWithdrawTransaction}
                color="dark-3"
                fullWidth
                type="submit"
                disabled={!amount}
              />
            </Form>
          </Box>
        </Layer>
      )}

      {showTxModal && (
        <TransactionStatusModal
          headerMessage={
            <FormattedMessage
              defaultMessage="Initiate withdrawal"
              values={{ amount, TICKER_NAME }}
            />
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={handleTxClose}
          handleRetry={createWithdrawTransaction}
        />
      )}
    </>
  );
};

export default PartialWithdraw;
