import React, { useState } from "react";
import {Box, Button, Grid, ResponsiveContext} from "grommet";
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
import { Redirect } from "react-router-dom";
import { routesEnum } from "../../Routes";

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

export const ConnectWalletPage = (): JSX.Element => {
  const [goToNextPage, setGoToNextPage] = useState(false);
  const attemptedMMConnection: boolean = useMetamaskEagerConnect();
  const {
    active: walletConnected,
    connector: walletProvider,
    error
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  useMetamaskListener(!attemptedMMConnection); // listen for RPC events

  if (goToNextPage) {
    return <Redirect to={routesEnum.SummaryPage} />;
  }

  if (walletConnected) {
    return (
      <WorkflowPageTemplate title="Connect Wallet">
        <WalletConnected setGoToNextPage={setGoToNextPage} />
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
