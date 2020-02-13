import React, { useState } from "react";
import { Grid, ResponsiveContext } from "grommet";
import { AbstractConnector as AbstractConnectorInterface } from "@web3-react/abstract-connector";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { WalletConnected } from "./WalletConnected";
import {
  metamask,
  portis,
  useMetamaskEagerConnect,
  useMetamaskListener
} from "./web3Utils";
import { WalletButton } from "./WalletButton";

import { StoreState } from "../../store/reducers";
import { ProgressStep } from "../../store/actions";
import { connect } from "react-redux";
import { routeToCorrectProgressStep } from "../../utils/RouteToCorrectProgressStep";

export interface web3ReactInterface {
  activate: (
    connector: AbstractConnectorInterface,
    onError?: (error: Error) => void,
    throwErrors?: boolean
  ) => Promise<void>;
  setError: (error: Error) => void;
  deactivate: () => void;
  connector?: AbstractConnectorInterface;
  library?: any;
  chainId?: number;
  account?: null | string;
  active: boolean;
  error?: Error;
}

const _ConnectWalletPage = ({
  progress
}: {
  progress: ProgressStep;
}): JSX.Element => {
  const attemptedMMConnection: boolean = useMetamaskEagerConnect();
  const {
    active: walletConnected,
    connector: walletProvider,
    error
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  useMetamaskListener(!attemptedMMConnection); // listen for RPC events

  if (progress !== ProgressStep.CONNECT_WALLET) {
    return routeToCorrectProgressStep(progress);
  }

  if (walletConnected) {
    return (
      <WorkflowPageTemplate title="Connect Wallet">
        <WalletConnected />
      </WorkflowPageTemplate>
    );
  }

  return (
    <WorkflowPageTemplate title="Connect Wallet">
      <ResponsiveContext.Consumer>
        {() => (
          <Grid columns="medium">
            <WalletButton
              walletProvider={metamask}
              title="Metamask"
              error={walletProvider === metamask ? error : undefined}
            />
            <WalletButton
              walletProvider={portis}
              title="Portis"
              error={walletProvider === portis ? error : undefined}
            />
          </Grid>
        )}
      </ResponsiveContext.Consumer>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ progress }: StoreState) => ({
  progress
});

export const ConnectWalletPage = connect(mstp)(_ConnectWalletPage);
