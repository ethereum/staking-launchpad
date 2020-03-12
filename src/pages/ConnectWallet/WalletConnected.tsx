import React from "react";
import { connect } from "react-redux";
import { FormNextLink } from "grommet-icons";
import { Box, Heading, Text } from "grommet";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { AllowedNetworks, metamask, NetworkChainId } from "./web3Utils";
import { web3ReactInterface } from "./index";
import { ProgressStep, updateProgress } from "../../store/actions";
import { Paper } from "../../components/Paper";
import { Dot } from "../../components/Dot";
import { Button } from "../../components/Button";

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
          className="mt10 ml30"
          color={networkAllowed ? "greenDark" : "redMedium"}
        >
          {network}
        </Text>
      </Paper>
      <Box align="center" pad="large">
        {!networkAllowed && (
          <Text className="mb10">Please connect to Göerli Testnet</Text>
        )}
        <div className="flex">
          <Button
            width={300}
            onClick={deactivate}
            label="Connect a different wallet"
            className="mr10"
            color="blueDark"
          />
          <Button
            width={300}
            rainbow
            disabled={!networkAllowed}
            onClick={handleSubmit}
            label="Continue on testnet"
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
