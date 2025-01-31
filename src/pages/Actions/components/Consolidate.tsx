import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import { Box, Heading, Layer } from 'grommet';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import Web3 from 'web3';
import { Validator } from '../types';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';
import Select from '../../../components/Select';
import { generateCompoundParams } from '../ActionUtils';
import { Button } from '../../../components/Button';

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
    if (!account || !selectedValidator) {
      return;
    }

    setTransactionStatus('waiting_user_confirmation');
    setShowSelectValidatorModal(false);
    setShowTxModal(true);

    try {
      const walletProvider = await (connector as AbstractConnector).getProvider();
      const web3 = new Web3(walletProvider);

      const params = await generateCompoundParams(
        web3,
        account,
        selectedValidator.pubkey,
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
