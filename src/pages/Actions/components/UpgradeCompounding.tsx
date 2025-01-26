import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Button } from 'grommet';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { Validator } from '../types';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';

interface Props {
  validator: Validator;
}

const UpgradeCompounding: React.FC<Props> = ({ validator }) => {
  const { connector, account } = useWeb3React();

  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  const createUpgradeMessage = async () => {
    setTransactionStatus('waiting_user_confirmation');
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
      {showTxModal && (
        <TransactionStatusModal
          headerMessage={
            <FormattedMessage
              defaultMessage="Upgrade validator {index} to compounding"
              values={{ index: validator.validatorindex }}
            />
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
        />
      )}

      <Button onClick={() => createUpgradeMessage()}>
        Upgrade to "Compounding"
      </Button>
    </>
  );
};

export default UpgradeCompounding;
