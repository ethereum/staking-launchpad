import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { Box, Heading, Layer } from 'grommet';
import Web3 from 'web3';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';

import { Validator } from '../types';

import { Button } from '../../../components/Button';
import { NumberInput } from '../../../components/NumberInput';
import { Text } from '../../../components/Text';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';

import { MIN_VALIDATOR_BALANCE, TICKER_NAME } from '../../../utils/envVars';

interface Props {
  validator: Validator;
}

const PartialWithdraw: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();

  const [amount, setAmount] = useState<number>(0);
  const [maxAmount, setMaxAmount] = useState<number>(0);
  const [showInputModal, setShowInputModal] = useState<boolean>(false);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  useEffect(() => {
    setMaxAmount(
      validator ? Math.max(0, validator.coinBalance - MIN_VALIDATOR_BALANCE) : 0
    );
  }, [validator]);

  const prepareInputModal = () => {
    setAmount(0);
    setShowInputModal(true);
  };

  const createWithdrawTransaction = async () => {
    if (!amount) {
      return;
    }

    setTransactionStatus('waiting_user_confirmation');
    setShowTxModal(true);

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);

    // TODO: Replace with contract call
    const transactionParams = {
      to: '0x40EDC53b0559D3A360DBe2DdB58f71A8833416E1',
      from: account,
      value: web3.utils.toWei(amount, 'ether'),
    };

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
      {showInputModal && (
        <Layer position="center" onEsc={() => setShowInputModal(false)}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              <FormattedMessage defaultMessage="How much would you like to withdraw?" />
            </Heading>
            <Text center>
              <FormattedMessage
                defaultMessage="Your validator has a balance of {balance}"
                values={{ balance: validator.balanceDisplay }}
              />
              {validator.coinBalance <= MIN_VALIDATOR_BALANCE ? (
                <FormattedMessage
                  defaultMessage="Your validator must have a minimum balance of {minBalance}{ticker} to withdraw. If you want to withdraw the entirety of the validator balance you must exit."
                  values={{
                    minBalance: MIN_VALIDATOR_BALANCE,
                    ticker: TICKER_NAME,
                  }}
                />
              ) : (
                <>
                  <FormattedMessage
                    defaultMessage="Please select how much you would like to withdraw. Due to requiring a minimum balance of {minBalance}{ticker} for the validator to operate, you will be able to withdraw a maximum of {maxAmount}{ticker}."
                    values={{
                      minBalance: MIN_VALIDATOR_BALANCE,
                      maxAmount,
                      ticker: TICKER_NAME,
                    }}
                  />

                  <NumberInput
                    value={amount}
                    setValue={setAmount}
                    allowDecimals
                    maxValue={maxAmount}
                  />
                </>
              )}
            </Text>
          </Box>
          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="center"
            pad={{ top: 'medium', bottom: 'small' }}
          >
            <Button label="Cancel" onClick={() => setShowInputModal(false)} />

            <Button
              disabled={!amount}
              label="Withdraw"
              onClick={() => createWithdrawTransaction()}
              color="dark-3"
            />
          </Box>
        </Layer>
      )}

      {showTxModal && (
        <TransactionStatusModal
          headerMessage={
            <FormattedMessage
              defaultMessage="Partial Withdraw of {amount}{ticker}"
              values={{ amount, ticker: TICKER_NAME }}
            />
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
        />
      )}

      <Button
        onClick={() => prepareInputModal()}
        label={<FormattedMessage defaultMessage="Partial Withdraw" />}
      />
    </>
  );
};

export default PartialWithdraw;
