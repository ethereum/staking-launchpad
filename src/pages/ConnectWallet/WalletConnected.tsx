import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Box, Button, Heading, Text } from "grommet";
import { AllowedNetworks, metamask, NetworkChainId } from "./web3Utils";
import { Paper } from "../../components/Paper";
import { FormNextLink } from "grommet-icons";
import { web3ReactInterface } from "./index";
import { Dot } from "../../components/Dot";
import { ProgressStep, updateProgress } from "../../store/actions";
import { connect } from "react-redux";

const _WalletConnected = ({
  updateProgress
}: {
  updateProgress: () => void;
}) => {
  const {
    account,
    chainId,
    connector: walletProvider,
    deactivate
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  let network;
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = Object.values(AllowedNetworks).includes(network);
  }

  const handleSubmit = () => {
    updateProgress();
  };

  return (
    <div>
      <Paper>
        <Heading level={3} size="small" color="blueDark" className="mt0">
          {walletProvider === metamask ? "Metamask" : "Portis"}
        </Heading>
        <Box className="flex flex-row">
          <Dot success={networkAllowed} />
          <Text className="ml10">{account}</Text>
        </Box>
        <Text
          className="mt10 ml31"
          color={networkAllowed ? "greenDark" : "redMedium"}
        >
          {network}
        </Text>
      </Paper>
      <Box align="center" pad="large">
        {!networkAllowed && (
          <Text className="mb10">Please connect to Göerli Testnet</Text>
        )}
        <div>
          <Button
            onClick={deactivate}
            label="Connect a different wallet"
            className="mr10"
            color="blueDark"
          />
          <Button
            disabled={!networkAllowed}
            onClick={handleSubmit}
            label="CONTINUE ON TESTNET"
            primary
            reverse
            icon={<FormNextLink />}
          />
        </div>
      </Box>
    </div>
  );
};

const mdtp = (dispatch: any) => ({
  updateProgress: (): void => {
    dispatch(updateProgress(ProgressStep.SUMMARY));
  }
});

export const WalletConnected = connect(null, mdtp)(_WalletConnected);
