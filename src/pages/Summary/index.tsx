import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import Web3 from 'web3';
import { Eth } from 'web3-eth';
import { SendOptions } from 'web3-eth-contract';
import { StoreState } from '../../store/reducers';
import { keyFile, ProgressStep, updateProgress } from '../../store/actions';
import { web3ReactInterface } from '../ConnectWallet';
import { NetworkChainId } from '../ConnectWallet/web3Utils';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { KeyList } from './KeyList';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';
import { Button } from '../../components/Button';
import { rainbowMutedColors } from '../../styles/styledComponentsTheme';
import { prefix0X } from '../../utils/prefix0x';
import { contractAbi } from '../../contractAbi';
import { pricePerValidator, contractAddress } from '../../enums';
import { ValidatorInfoSummary } from './ValidatorInfoSummary';
import { SummaryAcknowledgements } from './SummaryAcknowledgements';
import { WalletDisconnected } from './WalletDisconnected';
import { WrongNetwork } from './WrongNetwork';
import { Transactions } from './Transactions';

// DEPOSIT CONTRACT VARIABLES(public for transparency)
const CONTRACT_ADDRESS = contractAddress;
const TX_VALUE = pricePerValidator * 1e18; // 3.2 eth for testnet, change to 32 on mainnet
const NETWORK_NAME = 'Göerli Testnet';
const NETWORK_ID = NetworkChainId[NETWORK_NAME];

const _SummaryPage = ({
  keyFiles,
  progress,
  updateProgress,
}: {
  validatorCount: number;
  keyFiles: keyFile[];
  progress: ProgressStep;
  updateProgress: (step: ProgressStep) => void;
}): JSX.Element => {
  const [txIsMining, setTxMining] = useState(false);
  const [allChecked, setAllChecked] = useState(false);
  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();
  const handleTransaction = async (depositFile: keyFile): Promise<void> => {
    const {
      pubkey,
      signature,
      // eslint-disable-next-line camelcase
      withdrawal_credentials,
      // eslint-disable-next-line camelcase
      signed_deposit_data_root,
    } = depositFile;

    try {
      const walletProvider: any = await (connector as AbstractConnector).getProvider();
      const web3: Eth = new Web3(walletProvider).eth;
      const contract = new web3.Contract(contractAbi, CONTRACT_ADDRESS);

      const transactionParameters: SendOptions = {
        gasPrice: '0x0055e72a000', // TODO: estimate gas price
        from: account as string,
        value: TX_VALUE,
      };

      // Send validator transaction
      contract.methods
        .deposit(
          prefix0X(pubkey),
          prefix0X(withdrawal_credentials),
          prefix0X(signature),
          prefix0X(signed_deposit_data_root)
        )
        .send(transactionParameters)
        // Event for when the user confirms the tx
        .on('transactionHash', (): void => {
          setTxMining(true);
          // TODO(tx UI feature): return txId
        })
        // Event is for when the tx is mined
        .on(
          'confirmation',
          (confirmation: number, receipt: { status: {} }): any => {
            if (confirmation === 0) {
              console.log('receipt: ', receipt);
              if (receipt.status) {
                console.log('receipt status: ', receipt.status);
                // TODO(tx UI feature): return status
                updateProgress(ProgressStep.CONGRATULATIONS);
              } else {
                console.log('error: receipt status not received');
              }
            }
          }
        );
    } catch (rejected) {
      console.log('user rejected transaction: ', rejected);
      // TODO(tx UI): return rejected status
    }
  };
  // Fires off a transaction for each validator in the users deposit key file
  const handleDepositClick = async () => {
    keyFiles.forEach(validator => {
      handleTransaction(validator);
    });
  };

  // if (progress !== ProgressStep.SUMMARY) return routeToCorrectProgressStep(progress);
  // Handles the edge case for when the user disconnects the wallet while on this page
  // TODO(Post release UI): consider moving the user back to connect wallet or making the wallet connection reusable for this edgecase
  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== NETWORK_ID)
    return <WrongNetwork networkName={NETWORK_NAME} />;
  if (txIsMining) return <Transactions />;

  return (
    <WorkflowPageTemplate
      title="Summary"
      backgroundColor={rainbowMutedColors[5]}
    >
      <ValidatorInfoSummary />
      {/*
          I dont think we should render this
          <KeyList />
      */}
      <SummaryAcknowledgements setAllChecked={setAllChecked} />
      <div className="flex center p30">
        <Button
          className="mr10"
          width={100}
          label="Back"
          onClick={() => updateProgress(ProgressStep.CONNECT_WALLET)}
        />
        <Button
          width={300}
          rainbow
          disabled={!allChecked}
          label="Continue"
          onClick={handleDepositClick}
        />
      </div>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ keyFiles, progress }: StoreState) => ({
  keyFiles,
  progress,
});

const mdtp = (dispatch: any) => ({
  updateProgress: (step: ProgressStep): void => {
    dispatch(updateProgress(step));
  },
});

export const SummaryPage = connect(mstp, mdtp)(_SummaryPage);
