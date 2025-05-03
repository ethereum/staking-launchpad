/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Form } from 'grommet';
import { LinkDown as DownIcon } from 'grommet-icons';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';

import { Button } from '../../../components/Button';
import { Heading } from '../../../components/Heading';
import ModalHeader from './ModalHeader';
import { NumberInput } from '../../../components/NumberInput';
import QueueWarning from './QueueWarning';
import {
  Hash,
  ModalBody,
  ModalContent,
  ModalFooter,
  modalLayerStyle,
} from './Shared';
import { Text } from '../../../components/Text';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';

import { generateWithdrawalParams, isValidatorNascent } from '../utils';
import { getEtherBalance } from '../../../utils/validators';
import { getSignTxStatus } from '../../../utils/txStatus';
import { MIN_ACTIVATION_BALANCE, TICKER_NAME } from '../../../utils/envVars';

import { useExecutionBalance } from '../../../hooks/useExecutionBalance';
import { useTxModal } from '../../../hooks/useTxModal';
import { useWithdrawalQueue } from '../../../hooks/useWithdrawalQueue';

interface Props {
  validator: BeaconChainValidator;
}

const PartialWithdraw: React.FC<Props> = ({ validator }) => {
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

  const [etherAmount, setEtherAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(0);

  useEffect(() => {
    setMaxAmount(
      Math.max(0, getEtherBalance(validator) - MIN_ACTIVATION_BALANCE)
    );
  }, [validator]);

  const resetState = () => {
    resetTxModal();
    setEtherAmount(0);
  };

  const handleOpen = () => {
    resetState();
    setShowModal(true);
  };

  const createWithdrawTransaction = async () => {
    if (!etherAmount || !account) return;

    setTxStatus('waiting_user_confirmation');
    setShowTx(true);

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);

    // Partial withdrawal transaction
    const {
      transactionParams,
      queue: withdrawalQueue,
    } = await generateWithdrawalParams(
      web3,
      account,
      validator.pubkey,
      Math.floor(etherAmount * 1000000000)
    );

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

  const signTxStatus = getSignTxStatus(txStatus);

  return (
    <>
      <Button
        disabled={maxAmount <= 0 || isValidatorNascent(validator)} // https://github.com/ethereum/consensus-specs/blob/dev/specs/electra/beacon-chain.md#new-process_withdrawal_request
        onClick={handleOpen}
        label={<FormattedMessage defaultMessage="Start withdrawal" />}
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
              defaultMessage="Withdrawal some {TICKER_NAME}"
              values={{ TICKER_NAME }}
            />
          </ModalHeader>
          <ModalBody>
            <ModalContent>
              {!showTx && (
                <Form
                  style={{
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                  }}
                >
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
                    value={etherAmount}
                    setValue={value => {
                      setEtherAmount(Math.min(value, maxAmount));
                    }}
                    allowDecimals
                    maxValue={maxAmount}
                    minValue={0}
                  />
                </Form>
              )}

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
                  }}
                >
                  <Heading
                    level={3}
                    style={{
                      textTransform: 'uppercase',
                      color: 'darkred',
                    }}
                  >
                    <FormattedMessage
                      defaultMessage="Unstake from"
                      description="'Unstake' refers to this ETH no longer being considered at 'stake' nor contributing to consensus."
                    />
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
                    }}
                  >
                    <Hash>{validator.pubkey}</Hash>
                  </Text>
                  <Text
                    style={{
                      fontSize: '14px',
                      color: '#555',
                      marginBottom: '0.5rem',
                    }}
                  >
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
                        <FormattedMessage defaultMessage="Current" />:
                      </div>
                      <div
                        style={{ textAlign: 'end', fontFamily: 'monospace' }}
                      >
                        {getEtherBalance(validator)} {TICKER_NAME}
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
                        {(getEtherBalance(validator) - etherAmount).toFixed(9)}{' '}
                        {TICKER_NAME}
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
                    {etherAmount.toFixed(9)} {TICKER_NAME}
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
                          style={{ textAlign: 'end', fontFamily: 'monospace' }}
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
                          {(executionEtherBalance + etherAmount).toFixed(9)}{' '}
                          {TICKER_NAME}
                        </div>
                      </Text>
                    )}
                  </div>
                </div>
              </div>

              {showTx ? (
                <TransactionStatusInsert
                  headerMessage={
                    <FormattedMessage
                      defaultMessage="Initiate withdrawal"
                      values={{ amount: etherAmount, TICKER_NAME }}
                    />
                  }
                  txHash={txHash}
                  transactionStatus={txStatus}
                />
              ) : (
                <Text>
                  <FormattedMessage defaultMessage="Withdraw requests enter a separate queue with a small fee, shown as the transaction's send amount. The fee is minimal when the queue is short, with a small buffer added to prevent rejections from sudden activity spikes." />
                </Text>
              )}
            </ModalContent>
          </ModalBody>
          <ModalFooter>
            <QueueWarning queue={queue} />

            {!['error', 'complete'].includes(signTxStatus) && (
              <Button
                style={{ fontSize: '1rem' }}
                label={<FormattedMessage defaultMessage="Withdraw" />}
                onClick={createWithdrawTransaction}
                color="dark-3"
                fullWidth
                type="submit"
                disabled={!etherAmount || showTx}
              />
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
                onClick={resetState}
              />
            )}
          </ModalFooter>
        </Layer>
      )}
    </>
  );
};

export default PartialWithdraw;
