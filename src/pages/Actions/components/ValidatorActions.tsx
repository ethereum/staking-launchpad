import React, { useState } from 'react';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { useWeb3React } from '@web3-react/core';
import Web3 from 'web3';
import styled from 'styled-components';
import { BeaconChainValidator } from '../../TopUp/types';
import { Text } from '../../../components/Text';
import { FormattedMessage } from 'react-intl';
import { BLS_CREDENTIALS } from '../../../utils/envVars';
import { Alert } from '../../../components/Alert';
import { Link } from '../../../components/Link';
import { routesEnum } from '../../../Routes';
import {
  TransactionStatus,
  TransactionStatusModal,
} from '../../../components/TransactionStatusModal';

interface Props {
  validator: BeaconChainValidator;
}

const ValidatorDetails = styled.div`
  background-color: white;
  padding: 1rem;
  margin: 1rem;
  border-radius: 4px;

  span {
    margin-bottom: 5px;
  }
`;

const Actions = styled.div`
  margin-top: 10px;
`;

const ValidatorActions: React.FC<Props> = ({ validator }) => {
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
          headerMessage="Upgrade validator to compounding"
          txHash={txHash}
          transactionStatus={transactionStatus}
          onClose={() => setShowTxModal(false)}
        />
      )}

      <ValidatorDetails>
        <Text>
          <FormattedMessage
            defaultMessage="Validator Index: {index}"
            values={{ index: validator.validatorindex }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Public Key: {pubkey}"
            values={{
              pubkey: `${validator.pubkey.slice(
                0,
                10
              )}...${validator.pubkey.slice(-10)}`,
            }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Balance: {balance}"
            values={{ balance: validator.balance }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Activation Epoch: {epoch}"
            values={{ epoch: validator.activationepoch }}
          />
        </Text>
        <Text>
          <FormattedMessage
            defaultMessage="Withdrawal Credentails: {credentials}"
            values={{
              credentials: `${validator.withdrawalcredentials.slice(
                0,
                10
              )}...${validator.withdrawalcredentials.slice(-10)}`,
            }}
          />
        </Text>
      </ValidatorDetails>

      {validator.withdrawalcredentials.substring(4) === BLS_CREDENTIALS ? (
        <Alert className="mt-20">
          <Text>
            <FormattedMessage defaultMessage="This validator has Type 0 (0x00) credentials and must be updated in order to perform validator actions." />
          </Text>

          <Text>
            <FormattedMessage
              defaultMessage="You can learn how to perform this update by viewing the {LINK} section."
              values={{
                LINK: (
                  <Link to={routesEnum.withdrawals} className="secondary-link">
                    <FormattedMessage defaultMessage="Withdrawals" />
                  </Link>
                ),
              }}
            />
          </Text>
        </Alert>
      ) : (
        <Actions>
          <button type="button" onClick={() => createUpgradeMessage()}>
            Upgrade to "Compounding"
          </button>
          <div>Everything else TODO</div>
        </Actions>
      )}
    </>
  );
};

export default ValidatorActions;
