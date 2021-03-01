import React, { useMemo, useState } from 'react';
import { useIntl, FormattedMessage } from 'react-intl';
import { CheckBox } from 'grommet';
// eslint-disable-next-line import/no-extraneous-dependencies
import { SendOptions } from 'web3-eth-contract';
import { ByteVectorType, ContainerType, NumberUintType } from '@chainsafe/ssz';
import { useWeb3React } from '@web3-react/core';
import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { Alert as AlertIcon } from 'grommet-icons';
import ReactTooltip from 'react-tooltip';
import styled from 'styled-components';
import { contractAbi } from '../../../contractAbi';
import { BeaconChainValidator, TransactionStatus } from '../types';
import { bufferHex } from '../../../utils/SSZ';
import { buf2hex } from '../../../utils/buf2hex';
import { Text } from '../../../components/Text';
import { Button } from '../../../components/Button';
import { Paper } from '../../../components/Paper';
import { Heading } from '../../../components/Heading';
import { TopupInput } from './TopUpInput';
import shortenAddress from '../../../utils/shortenAddress';
import { Alert } from '../../../components/Alert';
import TopUpTransactionModal from './TopUpTransactionModal';
import {
  fortmaticTxRejected,
  isLedgerTimeoutError,
  ledgerTxRejected,
  metamaskTxRejected,
} from '../../../utils/transactionErrorTypes';
import {
  PRICE_PER_VALIDATOR,
  TICKER_NAME,
  CONTRACT_ADDRESS,
  ETHER_TO_GWEI,
} from '../../../utils/envVars';

interface Props {
  validator: BeaconChainValidator;
}

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

const InputContainer = styled.div`
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const SubmitButton = styled(Button)`
  height: 50px;
`;

const TopUpDetailsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0;
  border: 1px solid lightblue;
  background: #eaf6f9;
  border-radius: 5px;
  padding: 10px 20px;
  flex-wrap: wrap;
  @media screen and (max-width: 724px) {
    flex-direction: column;
    .details-item {
      display: flex;
      justify-content: space-between;
    }
  }
`;

const TopupPage: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();

  const effectiveBalance = useMemo(
    () => Number(validator.effectivebalance) / ETHER_TO_GWEI,
    [validator]
  );

  const balance = useMemo(() => Number(validator.balance) / ETHER_TO_GWEI, [
    validator,
  ]);

  const maxTopupValue = useMemo(
    () => Math.max(1, Number(PRICE_PER_VALIDATOR) + 0.26 - Number(balance)),
    [balance]
  );

  const minTopupValue = 1;

  const [value, setValue] = React.useState(maxTopupValue);

  const [showTxModal, setShowTxModal] = React.useState(false);

  const [txHash, setTxHash] = React.useState('');

  const balanceAfterTopup = useMemo(() => +balance + Number(value), [
    balance,
    value,
  ]);

  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );

  const { formatMessage } = useIntl();

  const submitTopupTransaction = async () => {
    setTransactionStatus('waiting_user_confirmation');
    setShowTxModal(true);
    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);
    const contract = new web3.eth.Contract(contractAbi, CONTRACT_ADDRESS);
    const bnInput = new BigNumber(value);
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
      .on(
        'confirmation',
        (confirmation: number, receipt: { status: {} }): any => {
          if (confirmation === 0) {
            if (receipt.status) {
              setTransactionStatus('success');
            } else {
              setTransactionStatus('error');
            }
          }
        }
      )
      .on('error', (error: any) => {
        if (isLedgerTimeoutError(error)) {
          setShowTxModal(false);
        } else if (
          metamaskTxRejected(error) ||
          ledgerTxRejected(error) ||
          fortmaticTxRejected(error)
        ) {
          setTransactionStatus('user_rejected');
        } else {
          setTransactionStatus('error');
        }
      });
  };

  const [termA, setTermA] = useState(false);

  const showAlert = React.useMemo(() => {
    return (
      balanceAfterTopup > PRICE_PER_VALIDATOR || balance > PRICE_PER_VALIDATOR
    );
  }, [balance, balanceAfterTopup]);

  const alertText = React.useMemo(() => {
    // If EB already maxed out
    if (effectiveBalance >= PRICE_PER_VALIDATOR)
      return formatMessage(
        {
          defaultMessage:
            'Validator effective balance is currently maxed out. If desired, you may add {minTopupValue} {TICKER_NAME} (the minimum allowed by the deposit contract)',
          description:
            '{minTopupValue} is a number, and {TICKER_NAME} is either ETH or GöETH depending on network',
        },
        { TICKER_NAME, minTopupValue }
      );
    // If EB is low (31 or less)
    if (balance > PRICE_PER_VALIDATOR)
      return formatMessage(
        {
          defaultMessage:
            'Validator balance is over {PRICE_PER_VALIDATOR}, but effective balance is low ({effectiveBalance}). Adding {minTopupValue} {TICKER_NAME} (the minimum allowed by the deposit contract) will max out your effective balance.',
        },
        { PRICE_PER_VALIDATOR, effectiveBalance, minTopupValue, TICKER_NAME }
      );
    if (value > maxTopupValue)
      return formatMessage(
        {
          defaultMessage: `Validators have a maximum effective balance of {PRICE_PER_VALIDATOR} {TICKER_NAME}. You only need to top up {maxTopupValue} {TICKER_NAME} to max out your effective balance.`,
        },
        {
          PRICE_PER_VALIDATOR,
          TICKER_NAME,
          maxTopupValue: maxTopupValue.toFixed(4),
        }
      );
    if (value < minTopupValue)
      return formatMessage(
        {
          defaultMessage: `The Eth2 deposit contract requires a minimum of {minTopupValue} {TICKER_NAME} to be sent at one time to be accepted.`,
        },
        { minTopupValue, TICKER_NAME }
      );
    return '';
  }, [balance, maxTopupValue, formatMessage, effectiveBalance, value]);

  const submitBtnTooltipText = React.useMemo(() => {
    if (value <= 0 || value > maxTopupValue)
      return formatMessage({
        defaultMessage: 'Please enter a valid top-up value.',
      });

    if (value < minTopupValue)
      return formatMessage(
        {
          defaultMessage:
            'Minimum top-up value is {minTopupValue} {TICKER_NAME}.',
        },
        { minTopupValue, TICKER_NAME }
      );

    if (!termA)
      return formatMessage({
        defaultMessage: 'Please accept the conditions above.',
      });
    return '';
  }, [value, termA, maxTopupValue, formatMessage]);

  return (
    <div>
      <ReactTooltip />
      {showTxModal && (
        <TopUpTransactionModal
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
        />
      )}

      <Paper className="mt30">
        <Heading level={3} color="blueDark">
          <FormattedMessage defaultMessage="Top-up details" />
        </Heading>
        <TopUpDetailsContainer className="my30">
          <div className="details-item">
            <Text weight={600} color="blueDark">
              <FormattedMessage defaultMessage="Public key" />
            </Text>
            <Text>{shortenAddress(validator.pubkey, 6)}</Text>
          </div>
          <div className="details-item">
            <Text weight={600} color="blueDark">
              <FormattedMessage defaultMessage="Current balance" />
            </Text>
            <Text>{`${balance.toFixed(8)} ${TICKER_NAME}`}</Text>
          </div>
          <div className="details-item">
            <Text weight={600} color="blueDark">
              <FormattedMessage defaultMessage="Balance after topping up" />
            </Text>
            <Text>{`${balanceAfterTopup.toFixed(8)} ${TICKER_NAME}`}</Text>
          </div>
        </TopUpDetailsContainer>
        <Heading level={3} color="blueDark">
          <FormattedMessage defaultMessage="Risks and acknowledgements:" />
        </Heading>
        <div className="mt20">
          <CheckBox
            checked={termA}
            onChange={() => setTermA(!termA)}
            label={
              <Text className="checkbox-label ml10">
                <FormattedMessage defaultMessage="I am certain that the validator I am topping up is my validator." />
              </Text>
            }
          />
        </div>
        <div style={{ display: showAlert ? 'block' : 'none' }}>
          <Alert variant="warning" className="mt30">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AlertIcon color="redLight" />
              <Text className="ml10 center">{alertText}</Text>
            </div>
          </Alert>
        </div>
        <InputContainer className="mt30">
          <TopupInput
            value={value}
            setValue={setValue}
            maxValue={maxTopupValue}
          />
          <span data-tip={submitBtnTooltipText}>
            <SubmitButton
              className="ml10"
              label={formatMessage({ defaultMessage: 'Top up validator' })}
              rainbow
              onClick={submitTopupTransaction}
              disabled={
                value <= 0 ||
                value > maxTopupValue ||
                value < minTopupValue ||
                !termA
              }
            />
          </span>
        </InputContainer>
      </Paper>
    </div>
  );
};

export default TopupPage;
