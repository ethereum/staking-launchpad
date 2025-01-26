import React, { useState } from 'react';
import { Validator } from '../types';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';
import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3 from 'web3';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, Heading, Layer } from 'grommet';
import { FormattedMessage } from 'react-intl';
import { Text } from '../../../components/Text';

interface Props {
  validator: Validator;
}

const ForceExit: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();

  const [showConfirmationModal, setShowConfirmationModal] = useState<boolean>(
    false
  );
  const [stepTwo, setStepTwo] = useState<boolean>(false);

  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  const confirmForceExit = () => {
    setStepTwo(false);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setStepTwo(false);
  };

  const createExitTransaction = async () => {
    setTransactionStatus('waiting_user_confirmation');
    setShowConfirmationModal(false);
    setStepTwo(false);
    setShowTxModal(true);

    const walletProvider: any = await (connector as AbstractConnector).getProvider();
    const web3: any = new Web3(walletProvider);

    // TODO: Replace with contract call
    const transactionParams = {
      to: '0x40EDC53b0559D3A360DBe2DdB58f71A8833416E1',
      from: account,
      value: web3.utils.toWei('0.0001', 'ether'),
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
      {showConfirmationModal && (
        <Layer position="center" onEsc={() => closeConfirmationModal()}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              <FormattedMessage
                defaultMessage="Are you sure you want to exit validator {index}?"
                values={{ index: validator.validatorindex }}
              />
            </Heading>
            <Text center>
              <FormattedMessage defaultMessage="You will be asked to sign a transaction to exit your validator." />
              <FormattedMessage defaultMessage="Please understand that once you begin the exit process you will not be able to undo the decision. " />
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
            <Button label="Cancel" onClick={() => closeConfirmationModal()} />
            {stepTwo ? (
              <Button
                label="I'm really sure"
                onClick={() => createExitTransaction()}
                color="dark-3"
              />
            ) : (
              <Button
                label="I'm sure"
                onClick={() => setStepTwo(true)}
                color="dark-3"
              />
            )}
          </Box>
        </Layer>
      )}

      {showTxModal && (
        <TransactionStatusModal
          headerMessage="Fully exit validator"
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
        />
      )}

      <Button label="Force exit" onClick={() => confirmForceExit()} />
    </>
  );
};

export default ForceExit;
