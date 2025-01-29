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
import { generateCompoundParams } from '../ActionUtils';

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
    if (!account) {
      return;
    }

    setTransactionStatus('waiting_user_confirmation');
    setShowTxModal(true);

    try {
      const walletProvider = await (connector as AbstractConnector).getProvider();
      const web3 = new Web3(walletProvider);

      const params = await generateCompoundParams(
        web3,
        account,
        validator.pubkey,
        validator.pubkey
      );
      return web3.eth
        .sendTransaction(params)
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
    } catch (e) {
      console.log(e);
    }
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
