/* eslint-disable jsx-a11y/label-has-associated-control */
import { ByteVectorType, ContainerType, NumberUintType } from '@chainsafe/ssz';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Form } from 'grommet';
import { LinkDown as DownIcon } from 'grommet-icons';
import Web3 from 'web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SendOptions } from 'web3-eth-contract';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { ValidatorType } from '../types';
import { BeaconChainValidator } from '../../TopUp/types';

import { Button } from '../../../components/Button';
import { NumberInput } from '../../../components/NumberInput';
import { TransactionStatus } from '../../../components/TransactionStatusModal';
import { Text } from '../../../components/Text';
import { bufferHex } from '../../../utils/SSZ';

import {
  CONTRACT_ADDRESS,
  MAX_EFFECTIVE_BALANCE,
  TICKER_NAME,
  ETHER_TO_GWEI,
  MIN_ACTIVATION_BALANCE,
} from '../../../utils/envVars';
import ModalHeader from './ModalHeader';
import {
  ModalBody,
  ModalContent,
  Hash,
  modalLayerStyle,
  ModalFooter,
} from './Shared';
import { Heading } from '../../../components/Heading';
import { contractAbi } from '../../../contractAbi';
import { buf2hex } from '../../../utils/buf2hex';
import {
  getEtherBalance,
  getCredentialType,
  getMaxEB,
} from '../../../utils/validators';
import { useExecutionBalance } from '../../../hooks/useExecutionBalance';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';
import { getSignTxStatus } from '../../../utils/txStatus';
import { useModal } from '../../../hooks/useModal';

const depositDataContainer = new ContainerType({
  fields: {
    pubkey: new ByteVectorType({
      length: 48,
    }),
    withdrawalCredentials: new ByteVectorType({
      length: 32,
    }),
    amount: new NumberUintType({
      byteLength: 8,
    }),
    signature: new ByteVectorType({
      length: 96,
    }),
  },
});

interface Props {
  validator: BeaconChainValidator;
}

const AddFunds: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();
  const { showModal, setShowModal, showTx, setShowTx } = useModal();

  const executionEtherBalance = useExecutionBalance();

  const [etherAmount, setEtherAmount] = useState(0);
  const [maxEtherAmount, setMaxEtherAmount] = useState(0);

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState('');

  const maxEBGwei =
    (getCredentialType(validator) < ValidatorType.Compounding
      ? MIN_ACTIVATION_BALANCE
      : MAX_EFFECTIVE_BALANCE) * ETHER_TO_GWEI;

  useEffect(() => {
    // Max is maxEB plus 0.26, accounting for hysteresis zones with 0.01 buffer
    const maxEther = new BigNumber(MAX_EFFECTIVE_BALANCE + 0.26).minus(
      new BigNumber(validator.balance).div(ETHER_TO_GWEI)
    );
    setMaxEtherAmount(maxEther.toNumber());
  }, [validator]);

  const resetState = () => {
    setShowTx(false);
    setShowModal(false);
    setEtherAmount(0);
    setTxHash('');
    setTransactionStatus('not_started');
  };

  const openInputModal = () => {
    resetState();
    setShowModal(true);
  };

  const handleValueChange = (value: number) => {
    const newValue = Math.max(Math.min(value, maxEtherAmount), 0);
    setEtherAmount(newValue);
  };

  const createAddFundsTransaction = async () => {
    if (!etherAmount || !account) return;

    setTransactionStatus('waiting_user_confirmation');
    setShowTx(true);

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    const bnInput = new BigNumber(etherAmount);
    const transactionAmount = bnInput
      .multipliedBy(1e18)
      .integerValue(BigNumber.ROUND_DOWN); // Convert to Wei and ensure it's an integer
    const reconstructedRootAmount = bnInput
      .multipliedBy(1e9)
      .integerValue(BigNumber.ROUND_DOWN); // Convert to Gwei and ensure it's an integer

    const transactionParameters: SendOptions = {
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      from: account as string,
      value: transactionAmount.toFixed(),
    };

    const reconstructedKeyFile = {
      pubkey: bufferHex(validator.pubkey.substring(2)),
      withdrawalCredentials: Buffer.alloc(32),
      amount: reconstructedRootAmount,
      signature: Buffer.alloc(96),
    };

    const byteRoot = depositDataContainer.hashTreeRoot(reconstructedKeyFile);
    const reconstructedDepositDataRoot = `0x${buf2hex(byteRoot)}`;

    contract.methods
      .deposit(
        reconstructedKeyFile.pubkey,
        reconstructedKeyFile.withdrawalCredentials,
        reconstructedKeyFile.signature,
        reconstructedDepositDataRoot
      )
      .send(transactionParameters)
      .on('transactionHash', (hash: string): void => {
        setTransactionStatus('confirm_on_chain');
        setTxHash(hash);
      })
      .on('confirmation', () => {
        setTransactionStatus('success');
      })
      .on('error', () => {
        setTransactionStatus('error');
      });
  };

  const signTxStatus = getSignTxStatus(transactionStatus);

  const primaryLabel = <FormattedMessage defaultMessage="Stake more funds" />;

  return (
    <>
      <Button
        onClick={openInputModal}
        label={primaryLabel}
        disabled={validator.effectivebalance >= maxEBGwei}
      />

      {showModal && (
        <Layer
          position="center"
          onEsc={resetState}
          onClickOutside={resetState}
          style={modalLayerStyle}
        >
          <ModalHeader onClose={resetState}>
            <FormattedMessage defaultMessage="Stake additional funds" />
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
                        defaultMessage="How much {TICKER_NAME} would you like to add to your stake?"
                        values={{ TICKER_NAME }}
                      />
                    </Text>
                  </label>
                  <NumberInput
                    id="withdrawal-amount"
                    value={etherAmount}
                    setValue={handleValueChange}
                    allowDecimals
                    maxValue={maxEtherAmount}
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
                    <FormattedMessage defaultMessage="Deposit from" />
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
                          <FormattedMessage defaultMessage="Available" />:
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
                          style={{ textAlign: 'end', fontFamily: 'monospace' }}
                        >
                          {(executionEtherBalance - etherAmount).toFixed(9)}{' '}
                          {TICKER_NAME}
                        </div>
                      </Text>
                    )}
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
                    border: '2px solid darkgreen',
                    borderRadius: '8px',
                  }}
                >
                  <Heading
                    level={3}
                    style={{
                      textTransform: 'uppercase',
                      color: 'darkgreen',
                    }}
                  >
                    <FormattedMessage defaultMessage="Stake to" />
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
                    <FormattedMessage defaultMessage="Max effective balance" />:{' '}
                    {getMaxEB(validator)} {TICKER_NAME}
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
                        style={{
                          textAlign: 'end',
                          fontFamily: 'monospace',
                          color: 'darkgreen',
                        }}
                      >
                        {(getEtherBalance(validator) + etherAmount).toFixed(9)}{' '}
                        {TICKER_NAME}
                      </div>
                    </Text>
                  </div>
                </div>
              </div>

              {showTx && (
                <TransactionStatusInsert
                  headerMessage={
                    <FormattedMessage defaultMessage="Depositing to validator" />
                  }
                  txHash={txHash}
                  transactionStatus={transactionStatus}
                />
              )}
            </ModalContent>
          </ModalBody>

          <ModalFooter>
            {!['error', 'complete'].includes(signTxStatus) && (
              <Button
                style={{ fontSize: '1rem' }}
                label={primaryLabel}
                onClick={createAddFundsTransaction}
                color="dark-3"
                fullWidth
                type="submit"
                disabled={!etherAmount}
              />
            )}
            {signTxStatus === 'error' && (
              <Button
                label={<FormattedMessage defaultMessage="Try again" />}
                onClick={createAddFundsTransaction}
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

export default AddFunds;
