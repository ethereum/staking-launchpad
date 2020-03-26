import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { StoreState } from '../../store/reducers';
import {
  KeyFileInterface,
  ProgressStep,
  updateProgress,
} from '../../store/actions';
import { web3ReactInterface } from '../ConnectWallet';
import { NetworkChainId } from '../ConnectWallet/web3Utils';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Button } from '../../components/Button';
import { ValidatorInfoSummary } from './ValidatorInfoSummary';
import { SummaryAcknowledgements } from './SummaryAcknowledgements';
import { WalletDisconnected } from './WalletDisconnected';
import { WrongNetwork } from './WrongNetwork';
import { Link } from '../../components/Link';
import { routesEnum } from '../../Routes';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';

const NETWORK_NAME = 'Göerli Testnet';
const NETWORK_ID = NetworkChainId[NETWORK_NAME];

interface SummaryPageProps {
  keyFiles: KeyFileInterface[];
  progress: ProgressStep;
  updateProgress: (step: ProgressStep) => void;
}

const _SummaryPage = ({
  progress,
  updateProgress,
}: SummaryPageProps): JSX.Element => {
  const [allChecked, setAllChecked] = useState(false);
  const { account, chainId, connector }: web3ReactInterface = useWeb3React<
    Web3Provider
  >();

  const handleSubmit = () => {
    if (progress === ProgressStep.SUMMARY) {
      updateProgress(ProgressStep.TRANSACTION_SIGNING);
    }
  };

  if (progress !== ProgressStep.SUMMARY)
    return routeToCorrectProgressStep(progress);
  if (!account || !connector) return <WalletDisconnected />;
  if (chainId !== NETWORK_ID)
    return <WrongNetwork networkName={NETWORK_NAME} />;
  return (
    <WorkflowPageTemplate title="Summary" progressStep={ProgressStep.SUMMARY}>
      <ValidatorInfoSummary />
      <SummaryAcknowledgements setAllChecked={setAllChecked} />
      <div className="flex center p30">
        <Link to={routesEnum.connectWalletPage}>
          <Button className="mr10" width={100} label="Back" />
        </Link>
        <Link to={routesEnum.transactionsPage} onClick={handleSubmit}>
          <Button width={300} rainbow disabled={!allChecked} label="Continue" />
        </Link>
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
