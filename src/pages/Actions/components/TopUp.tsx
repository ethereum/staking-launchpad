import { ByteVectorType, ContainerType, NumberUintType } from '@chainsafe/ssz';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Layer, Form } from 'grommet';
import { Alert as AlertIcon } from 'grommet-icons';
import Web3 from 'web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SendOptions } from 'web3-eth-contract';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { ValidatorType } from '../types';
import { BeaconChainValidator } from '../../TopUp/types';

import { Button } from '../../../components/Button';
import { NumberInput } from '../../../components/NumberInput';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';
import { Text } from '../../../components/Text';
import { bufferHex } from '../../../utils/SSZ';

import {
  CONTRACT_ADDRESS,
  MAX_EFFECTIVE_BALANCE,
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
} from '../../../utils/envVars';
import ModalHeader from './ModalHeader';
import {
  ModalBody,
  ModalContent,
  Hash,
  AlertContainer,
  AlertContent,
} from './Shared';
import { Heading } from '../../../components/Heading';
import { Alert } from '../../../components/Alert';
import { contractAbi } from '../../../contractAbi';
import { buf2hex } from '../../../utils/buf2hex';
import { getEtherBalance, getCredentialType } from '../../../utils/validators';

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

const PartialWithdraw: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();

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
      getCredentialType(validator) >= ValidatorType.Compounding
        ? MAX_EFFECTIVE_BALANCE
        : MIN_ACTIVATION_BALANCE
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

  const createTopUpTransaction = async () => {
    if (!amount || !account) return;

    setShowInputModal(false);
    setTransactionStatus('waiting_user_confirmation');
    setShowTxModal(true);

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    const bnInput = new BigNumber(amount);
    const transactionAmount = bnInput.multipliedBy(1e18).toNumber();
    const reconstructedRootAmount = bnInput.multipliedBy(1e9).toNumber();

    const transactionParameters: SendOptions = {
      gasPrice: web3.utils.toHex(await web3.eth.getGasPrice()),
      from: account as string,
      value: transactionAmount,
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

  return (
    <>
      <Button
        onClick={openInputModal}
        label={<FormattedMessage defaultMessage="Top up" />}
      />

      {showInputModal && (
        <Layer
          position="center"
          onEsc={closeInputModal}
          onClickOutside={closeInputModal}
          style={{ background: '#EEEEEE', maxWidth: '40rem' }}
        >
          <ModalHeader onClose={closeInputModal}>
            <FormattedMessage defaultMessage="Top up validator" />
          </ModalHeader>

          <ModalBody>
            <AlertContainer>
              <Alert variant="info">
                <AlertContent>
                  <AlertIcon />
                  <div>
                    <Text>
                      <FormattedMessage defaultMessage="Depositing beyond the validators maximum effective balance will result in those excess funds being immediately withdrawn and will not impact the effectiveness of the validator" />
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
                      color: 'darkgreen',
                    }}
                  >
                    <FormattedMessage defaultMessage="FROM" />
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
                  <Text>
                    <FormattedMessage defaultMessage="Balance change" />:
                    <strong>
                      -{amount} {TICKER_NAME}
                    </strong>
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
                    <FormattedMessage defaultMessage="TO" />
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
                    <FormattedMessage defaultMessage="Max effective balance" />:{' '}
                    {maxAmount} {TICKER_NAME}
                  </Text>
                  <Text>
                    <FormattedMessage defaultMessage="Ending balance" />:{' '}
                    <strong>
                      {getEtherBalance(validator) + amount} {TICKER_NAME}
                    </strong>
                  </Text>
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
                label="Top up"
                onClick={createTopUpTransaction}
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
          headerMessage={<FormattedMessage defaultMessage="Top up validator" />}
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={handleTxClose}
          handleRetry={createTopUpTransaction}
        />
      )}
    </>
  );
};

export default PartialWithdraw;
