import React from "react";
import { Box, Text } from "grommet";
import { BrandWithTitle } from "./Brand";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { web3ReactInterface } from "../pages/ConnectWallet";
import { trimString } from "../utils/trimString";
import {
  AllowedNetworks,
  NetworkChainId
} from "../pages/ConnectWallet/web3Utils";
import { Dot } from "./Dot";

export const AppBar = () => {
  const {
    active: walletConnected,
    account,
    chainId
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  let network;
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = Object.values(AllowedNetworks).includes(network);
  }

  return (
    <Box
      tag="header"
      direction="row"
      align="center"
      justify="between"
      background="brand"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <BrandWithTitle />
      {walletConnected && (
        <Box className="flex flex-row mr20">
          <Dot success={networkAllowed} />
          <Text size="small" className="ml10" color="white">
            {trimString(account as string, 10)}
          </Text>
        </Box>
      )}
    </Box>
  );
};
