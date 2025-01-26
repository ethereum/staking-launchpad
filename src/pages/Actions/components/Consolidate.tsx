import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Box, Button, Heading, Layer } from 'grommet';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { Validator } from '../types';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';
import Select from '../../../components/Select';

interface Props {
  validator: Validator;
  validators: Validator[];
}

const Consolidate: React.FC<Props> = ({ validator, validators }) => {
  const { connector, account } = useWeb3React();

  const [selectedValidator, setSelectedValidator] = useState<Validator | null>(
    null
  );
  const [showSelectValidatorModal, setShowSelectValidatorModal] = useState<
    boolean
  >(false);
  const [showTxModal, setShowTxModal] = useState<boolean>(false);
  const [transactionStatus, setTransactionStatus] = useState<TransactionStatus>(
    'not_started'
  );
  const [txHash, setTxHash] = useState<string>('');

  const confirmConsolidate = () => {
    setShowSelectValidatorModal(true);
    setSelectedValidator(null);
  };

  const closeSelectValidatorModal = () => {
    setShowSelectValidatorModal(false);
    setSelectedValidator(null);
  };

  const createConsolidationTransaction = async () => {
    setTransactionStatus('waiting_user_confirmation');
    setShowSelectValidatorModal(false);
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
      {showSelectValidatorModal && (
        <Layer position="center" onEsc={() => closeSelectValidatorModal()}>
          <Box pad="medium" gap="small" width="medium">
            <Heading level={3} margin="none">
              <FormattedMessage
                defaultMessage="Which validator would you like to consolidate into {index}"
                values={{ index: validator.validatorindex }}
              />
            </Heading>
            <Select
              options={validators.map(v => ({
                value: v.pubkey,
                label: v.validatorindex.toString(),
              }))}
              value={selectedValidator?.pubkey || ''}
              onChange={(value: string) => {
                setSelectedValidator(
                  validators.find(v => v.pubkey === value) || null
                );
              }}
            />
          </Box>
          <Box
            as="footer"
            gap="small"
            direction="row"
            align="center"
            justify="center"
            pad={{ top: 'medium', bottom: 'small' }}
          >
            <Button
              label="Cancel"
              onClick={() => closeSelectValidatorModal()}
            />
            <Button
              disabled={!selectedValidator}
              label="Consolidate"
              onClick={() => createConsolidationTransaction()}
            />
          </Box>
        </Layer>
      )}

      {showTxModal && selectedValidator && (
        <TransactionStatusModal
          headerMessage={
            <FormattedMessage
              defaultMessage="Consolidate {index} into {otherIndex}"
              values={{
                index: selectedValidator.validatorindex,
                otherIndex: validator.validatorindex,
              }}
            />
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
        />
      )}

      <Button label="Consolidate" onClick={() => confirmConsolidate()} />
    </>
  );
};

export default Consolidate;
