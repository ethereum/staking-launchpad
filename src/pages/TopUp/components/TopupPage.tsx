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
import { BeaconChainValidator } from '../types';
import { bufferHex } from '../../../utils/SSZ';
import { buf2hex } from '../../../utils/buf2hex';
import { Text } from '../../../components/Text';
import { Button } from '../../../components/Button';
import { Paper } from '../../../components/Paper';
import { Heading } from '../../../components/Heading';
import { NumberInput } from '../../../components/NumberInput';
import shortenAddress from '../../../utils/shortenAddress';
import { Alert } from '../../../components/Alert';
import {
  TransactionStatusModal,
  TransactionStatus,
} from '../../../components/TransactionStatusModal';
import {
  fortmaticTxRejected,
  isLedgerTimeoutError,
  ledgerTxRejected,
  metamaskTxRejected,
} from '../../../utils/transactionErrorTypes';
import {
  MIN_ACTIVATION_BALANCE,
  TICKER_NAME,
  CONTRACT_ADDRESS,
  ETHER_TO_GWEI,
  MAX_EFFECTIVE_BALANCE,
  EJECTION_PRICE,
  COMPOUNDING_CREDENTIALS,
} from '../../../utils/envVars';

interface Props {
  validator: BeaconChainValidator;
  backButton: React.ReactNode;
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
  margin: 30px auto 0;
  gap: 10px;
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

const IndentedText = styled(Text)`
  margin-inline-start: 10px;
`;

const TopupPage: React.FC<Props> = ({ validator, backButton }) => {
  const { connector, account } = useWeb3React();
  const { formatMessage } = useIntl();

  const hasElectraMaxEB =
    +validator.withdrawalcredentials.slice(0, 4) >= +COMPOUNDING_CREDENTIALS;
  const maxEffectiveBalanceEther = Number(
    hasElectraMaxEB ? MAX_EFFECTIVE_BALANCE : MIN_ACTIVATION_BALANCE
  );
  const balanceEther = Number(validator.balance) / ETHER_TO_GWEI;
  const MIN_TOPUP_VALUE = 1;
  const maxTopupValue = Math.max(
    MIN_TOPUP_VALUE,
    maxEffectiveBalanceEther + 0.26 - Number(balanceEther)
  );

  const [value, setValue] = React.useState(maxTopupValue);
  const [showTxModal, setShowTxModal] = React.useState(false);
  const [txHash, setTxHash] = React.useState('');
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );

  const effectiveBalanceEther =
    Number(validator.effectivebalance) / ETHER_TO_GWEI;

  const balanceAfterTopup = +balanceEther + Number(value);

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

  const showAlert = useMemo(() => {
    return (
      balanceAfterTopup > maxEffectiveBalanceEther ||
      balanceEther > maxEffectiveBalanceEther
    );
  }, [balanceEther, balanceAfterTopup, maxEffectiveBalanceEther]);

  const alertText = useMemo(() => {
    // If EB already maxed out
    if (effectiveBalanceEther >= maxEffectiveBalanceEther)
      return formatMessage(
        {
          defaultMessage:
            'Validator effective balance is currently maxed out. If desired, you may add {MIN_TOPUP_VALUE} {TICKER_NAME} (the minimum allowed by the deposit contract)',
          description:
            '{MIN_TOPUP_VALUE} is a number, and {TICKER_NAME} is either ETH or a variation of ETH depending on network',
        },
        { TICKER_NAME, MIN_TOPUP_VALUE }
      );
    // If EB over 32, below 2048 (0x02 Compounding type or later)
    if (effectiveBalanceEther >= MIN_ACTIVATION_BALANCE)
      return formatMessage(
        {
          defaultMessage:
            'Depositing additional {TICKER_NAME} can increase the effective balance of this validator. Current effective balance is {effectiveBalanceEther}, with a max allowed of {MAX_EFFECTIVE_BALANCE}.',
        },
        {
          effectiveBalanceEther,
          MAX_EFFECTIVE_BALANCE,
          TICKER_NAME,
        }
      );
    // If EB is low (31 or less)
    if (balanceEther > EJECTION_PRICE)
      return formatMessage(
        {
          defaultMessage:
            'Validator balance is over {EJECTION_PRICE}, but effective balance is low ({effectiveBalanceEther}). Adding {MIN_TOPUP_VALUE} {TICKER_NAME} (the minimum allowed by the deposit contract) will max out your effective balance.',
        },
        {
          effectiveBalanceEther,
          EJECTION_PRICE,
          MIN_TOPUP_VALUE,
          TICKER_NAME,
        }
      );
    if (value > maxTopupValue)
      return formatMessage(
        {
          defaultMessage: `This validator account has a maximum effective balance of {maxEffectiveBalanceEther} {TICKER_NAME}. You only need to top up {maxTopupValue} {TICKER_NAME} to max out your effective balance.`,
        },
        {
          maxEffectiveBalanceEther,
          TICKER_NAME,
          maxTopupValue: maxTopupValue.toFixed(4),
        }
      );
    if (value < MIN_TOPUP_VALUE)
      return formatMessage(
        {
          defaultMessage: `The Ethereum staking deposit contract requires a minimum of {MIN_TOPUP_VALUE} {TICKER_NAME} to be sent at one time to be accepted.`,
        },
        { MIN_TOPUP_VALUE, TICKER_NAME }
      );
    return '';
  }, [
    balanceEther,
    maxTopupValue,
    formatMessage,
    effectiveBalanceEther,
    value,
    maxEffectiveBalanceEther,
  ]);

  const submitBtnTooltipText = useMemo(() => {
    if (value <= 0 || value > maxTopupValue)
      return formatMessage({
        defaultMessage: 'Please enter a valid top-up value.',
      });

    if (value < MIN_TOPUP_VALUE)
      return formatMessage(
        {
          defaultMessage:
            'Minimum top-up value is {MIN_TOPUP_VALUE} {TICKER_NAME}.',
        },
        { MIN_TOPUP_VALUE, TICKER_NAME }
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
        <TransactionStatusModal
          headerMessage="Top-up transaction"
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
          handleRetry={submitTopupTransaction}
        />
      )}

      <Paper className="mt30">
        {backButton}
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
            <Text>{`${balanceEther.toFixed(8)} ${TICKER_NAME}`}</Text>
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
              <IndentedText className="checkbox-label">
                <FormattedMessage defaultMessage="I am certain that the validator I am topping up is my validator." />
              </IndentedText>
            }
          />
        </div>
        <div style={{ display: showAlert ? 'block' : 'none' }}>
          <Alert variant="warning" className="mt30">
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <AlertIcon color="redLight" />
              <IndentedText className="center">{alertText}</IndentedText>
            </div>
          </Alert>
        </div>
        <InputContainer>
          <NumberInput
            allowDecimals
            value={value}
            setValue={setValue}
            maxValue={maxTopupValue}
          />
          <span data-tip={submitBtnTooltipText}>
            <SubmitButton
              label={formatMessage({ defaultMessage: 'Top up validator' })}
              rainbow
              onClick={submitTopupTransaction}
              disabled={
                value <= 0 ||
                value > maxTopupValue ||
                value < MIN_TOPUP_VALUE ||
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
