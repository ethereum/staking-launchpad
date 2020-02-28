import React from "react";
import { Box, Heading, Text } from "grommet";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import EthDiamond from "../static/eth-diamond-plain.svg";
import { web3ReactInterface } from "../pages/ConnectWallet";
import { trimString } from "../utils/trimString";
import {
  AllowedNetworks,
  NetworkChainId
} from "../pages/ConnectWallet/web3Utils";
import { Dot } from "./Dot";
import { Link } from "./Link";
import { routesEnum } from "../Routes";
import styled from "styled-components";

const RainbowBackground = styled(Box)`
  background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
`;

const EthLogo = styled.img`
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

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
    <RainbowBackground
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ left: "medium", right: "small", vertical: "small" }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <div className="ml50 flex">
        <Link to={routesEnum.LandingPage}>
          <EthLogo src={EthDiamond} alt="eth-diamond" />
          <Heading level={4} margin="none" style={{ padding: "8px 0" }}>
            ETH 2 deposit ceremony
          </Heading>
        </Link>
      </div>
      {walletConnected && (
        <Box className="flex flex-row mr20">
          <Dot success={networkAllowed} />
          <Text size="small" className="ml10" color="blueDark">
            {trimString(account as string, 10)}
          </Text>
        </Box>
      )}
    </RainbowBackground>
  );
};
