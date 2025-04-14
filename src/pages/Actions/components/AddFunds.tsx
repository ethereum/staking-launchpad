/* eslint-disable jsx-a11y/label-has-associated-control */
import { ByteVectorType, ContainerType, NumberUintType } from '@chainsafe/ssz';
import BigNumber from 'bignumber.js';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Layer, Form } from 'grommet';
import { Alert as AlertIcon, LinkDown as DownIcon } from 'grommet-icons';
import Web3 from 'web3';
// eslint-disable-next-line import/no-extraneous-dependencies
import { provider } from 'web3-core';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SendOptions } from 'web3-eth-contract';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { BeaconChainValidator } from '../../TopUp/types';
import { Web3Instance } from '../types';

import { Button } from '../../../components/Button';
import { NumberInput } from '../../../components/NumberInput';
import { Text } from '../../../components/Text';

import {
  DEPOSIT_CONTRACT_ADDRESS,
  ETHER_TO_GWEI,
  TICKER_NAME,
  MIN_DEPOSIT_ETHER,
} from '../../../utils/envVars';
import { Heading } from '../../../components/Heading';
import ModalHeader from './ModalHeader';
import {
  Hash,
  ModalBody,
  ModalContent,
  ModalFooter,
  modalLayerStyle,
  AlertContent,
} from './Shared';
import { TransactionStatusInsert } from '../../../components/TransactionStatusModal/TransactionStatusInsert';

import { buf2hex } from '../../../utils/buf2hex';
import { getEtherBalance, getMaxEB } from '../../../utils/validators';
import { bufferHex } from '../../../utils/SSZ';
import { getSignTxStatus } from '../../../utils/txStatus';

import { useExecutionBalance } from '../../../hooks/useExecutionBalance';
import { useTxModal } from '../../../hooks/useTxModal';

import { contractAbi } from '../../../contractAbi';
import { Alert } from '../../../components/Alert';

const GAS_LIMIT_ADD_FUNDS = 49122;

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

type AddFundsProps = {
  validator: BeaconChainValidator;
};

const AddFunds = ({ validator }: AddFundsProps) => {
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

  const executionEtherBalance = useExecutionBalance();

  const [etherAmount, setEtherAmount] = useState(MIN_DEPOSIT_ETHER);
  const [etherMaxUseful, setEtherMaxUseful] = useState(0);

  const [etherFeeEstimate, setEtherFeeEstimate] = useState(new BigNumber(0));

  const maxEBGwei = getMaxEB(validator) * ETHER_TO_GWEI;
  const etherMaxAvailableToSend: BigNumber = executionEtherBalance
    ? new BigNumber(executionEtherBalance).minus(etherFeeEstimate)
    : new BigNumber(0);

  const isMaxedEB = validator.effectivebalance >= maxEBGwei;
  const insufficientFunds =
    etherMaxAvailableToSend.comparedTo(etherAmount) === -1;

  useEffect(() => {
    (async () => {
      const walletProvider: provider = await (connector as AbstractConnector).getProvider();
      const web3: Web3Instance = new Web3(walletProvider);
      const currentWeiGasPriceHex = web3.utils.toHex(
        await web3.eth.getGasPrice()
      );
      setEtherFeeEstimate(
        new BigNumber(currentWeiGasPriceHex, 16)
          .multipliedBy(new BigNumber(GAS_LIMIT_ADD_FUNDS))
          .div(1e18)
      );
    })();
  }, [connector]);

  useEffect(() => {
    const maxEB = getMaxEB(validator);
    // Max is maxEB plus 0.26, accounting for hysteresis zones with 0.01 buffer
    const maxUsefulEther = new BigNumber(maxEB + 0.26).minus(
      new BigNumber(validator.balance).div(ETHER_TO_GWEI)
    );
    // All deposits must at least be MIN_DEPOSIT_ETHER or tx will fail
    const maxUsefulEtherToDeposit = BigNumber.max(
      maxUsefulEther,
      new BigNumber(MIN_DEPOSIT_ETHER)
    );
    setEtherMaxUseful(maxUsefulEtherToDeposit.toNumber());
  }, [validator]);

  const resetState = () => {
    resetTxModal();
    setEtherAmount(MIN_DEPOSIT_ETHER);
  };

  const handleOpen = () => {
    resetState();
    setShowModal(true);
  };

  const handleValueChange = (value: number) => {
    const newValue = Math.max(
      Math.min(value, etherMaxUseful),
      MIN_DEPOSIT_ETHER
    );
    setEtherAmount(newValue);
  };

  const createAddFundsTransaction = async () => {
    if (!etherAmount || !account) return;

    setTxStatus('waiting_user_confirmation');
    setShowTx(true);

    const walletProvider: provider = await (connector as AbstractConnector).getProvider();
    const web3: Web3Instance = new Web3(walletProvider);
    const contract = new web3.eth.Contract(
      contractAbi,
      DEPOSIT_CONTRACT_ADDRESS
    );
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
        setTxStatus('confirm_on_chain');
        setTxHash(hash);
      })
      .on('confirmation', () => {
        setTxStatus('success');
      })
      .on('error', () => {
        setTxStatus('error');
      });
  };

  const signTxStatus = getSignTxStatus(txStatus);

  const primaryLabel = <FormattedMessage defaultMessage="Stake more funds" />;

  const maxValue = BigNumber.min(
    etherMaxAvailableToSend,
    etherMaxUseful
  ).toNumber();

  const newBalance = executionEtherBalance
    ? Math.max(
        0,
        executionEtherBalance - etherAmount - etherFeeEstimate.toNumber()
      )
    : 0;

  return (
    <>
      <Button
        onClick={handleOpen}
        label={primaryLabel}
        disabled={isMaxedEB || insufficientFunds}
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
                  <div>
                    <NumberInput
                      id="withdrawal-amount"
                      value={etherAmount}
                      setValue={handleValueChange}
                      allowDecimals
                      maxValue={maxValue}
                      minValue={MIN_DEPOSIT_ETHER}
                    />
                    <Text
                      style={{
                        fontSize: '0.75rem',
                        color: '#555',
                        marginInlineStart: '0.25rem',
                      }}
                    >
                      <FormattedMessage
                        defaultMessage="Minimum deposit amount is {MIN_DEPOSIT_ETHER} {TICKER_NAME}"
                        values={{ MIN_DEPOSIT_ETHER, TICKER_NAME }}
                      />
                    </Text>
                  </div>
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
                          style={{
                            textAlign: 'end',
                            fontFamily: 'monospace',
                          }}
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
                          }}
                        >
                          {newBalance.toFixed(9)} {TICKER_NAME}
                        </div>
                      </Text>
                    )}
                    {executionEtherBalance && etherFeeEstimate && (
                      <Text
                        style={{
                          display: 'grid',
                          gridColumn: 'span 2',
                          gridTemplateColumns: 'subgrid',
                          columnGap: '0.5rem',
                          fontSize: '0.875rem',
                          color: 'gray',
                        }}
                      >
                        <div>
                          <FormattedMessage defaultMessage="Max fee" />:
                        </div>
                        <div
                          style={{
                            textAlign: 'end',
                            fontFamily: 'monospace',
                            letterSpacing: '0.145rem',
                          }}
                        >
                          -{etherFeeEstimate.toFixed(9)} {TICKER_NAME}
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
                      color: 'darkgreen',
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

              {!showTx && MIN_DEPOSIT_ETHER === etherMaxUseful && (
                <Alert variant="warning">
                  <AlertContent>
                    <AlertIcon />
                    <div>
                      <Text>
                        <strong>
                          <FormattedMessage
                            defaultMessage="The minimum valid deposit amount is {MIN_DEPOSIT_ETHER} {TICKER_NAME}"
                            values={{ MIN_DEPOSIT_ETHER, TICKER_NAME }}
                          />
                        </strong>
                      </Text>
                      <Text style={{ fontSize: '1rem' }}>
                        <FormattedMessage defaultMessage="This will result in an excess balance for your validator, which will be automatically refunded to your execution account by the network." />
                      </Text>
                    </div>
                  </AlertContent>
                </Alert>
              )}

              {showTx && (
                <TransactionStatusInsert
                  headerMessage={
                    <FormattedMessage defaultMessage="Depositing to validator" />
                  }
                  txHash={txHash}
                  transactionStatus={txStatus}
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
                disabled={!etherAmount || insufficientFunds}
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
