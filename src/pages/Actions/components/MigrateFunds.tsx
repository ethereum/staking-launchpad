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
import { generateCompoundParams } from '../ActionUtils';
import { Button } from '../../../components/Button';
import ValidatorSelector from './ValidatorSelector';

type MigrateToProps = {
  sourceValidator: Validator; // The selected validator to drain and migrate (source)
  targetValidatorSet: Validator[]; // List of available target validators (Any 0x02 or higher, excluding the source)
};

const MigrateFunds = ({
  sourceValidator,
  targetValidatorSet,
}: MigrateToProps) => {
  const { connector, account } = useWeb3React();

  const [
    selectedTargetValidator,
    setSelectedTargetValidator,
  ] = useState<Validator | null>(null);
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
    setSelectedTargetValidator(null);
  };

  const closeSelectValidatorModal = () => {
    setShowSelectValidatorModal(false);
    setSelectedTargetValidator(null);
  };

  const createConsolidationTransaction = async () => {
    if (!account || !selectedTargetValidator) {
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
        sourceValidator.pubkey,
        selectedTargetValidator.pubkey
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
                defaultMessage="Which validator would you like to migrate {index} funds to?"
                values={{ index: sourceValidator.validatorindex }}
              />
            </Heading>
            <ValidatorSelector
              validators={targetValidatorSet}
              selectedValidator={selectedTargetValidator}
              setSelectedValidator={setSelectedTargetValidator}
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
              disabled={!selectedTargetValidator}
              label="Migrate funds"
              onClick={() => createConsolidationTransaction()}
            />
          </Box>
        </Layer>
      )}

      {showTxModal && selectedTargetValidator && (
        <TransactionStatusModal
          headerMessage={
            <FormattedMessage
              defaultMessage="Consolidate {index} into {otherIndex}"
              values={{
                index: selectedTargetValidator.validatorindex,
                otherIndex: sourceValidator.validatorindex,
              }}
            />
          }
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
        />
      )}

      <Button
        label="Migrate funds"
        destructive
        secondary
        onClick={() => confirmConsolidate()}
      />
    </>
  );
};

export default MigrateFunds;
