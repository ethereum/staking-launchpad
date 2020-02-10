import React from "react";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { Box, Button, Heading, Text } from "grommet";
import { AllowedNetworks, metamask, NetworkChainId } from "./web3Utils";
import { Paper } from "../../components/Paper";
import styled from "styled-components";
import { FormNextLink } from "grommet-icons";
import { web3ReactInterface } from "./index";

const Dot = styled.div`
  width: 15px;
  height: 15px;
  background: ${(p: { theme: any; success: boolean }) =>
    p.success ? p.theme.success : p.theme.error};
  border: 3px solid
    ${(p: { theme: any; success: boolean }) =>
      p.success ? p.theme.successLight : p.theme.errorLight};
  border-radius: 50%;
`;

export const WalletConnected = () => {
  const {
    account,
    chainId,
    connector: walletProvider,
    deactivate
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  // @ts-ignore chainId should not ever be undefined
  const network = NetworkChainId[chainId];
  const networkAllowed = Object.values(AllowedNetworks).includes(network);

  return (
    <div>
      <Paper>
        <Heading level={3} size="small" color="brand" className="mt0">
          {walletProvider === metamask ? "Metamask" : "Portis"}
        </Heading>
        <Box className="flex flex-row">
          <Dot success={networkAllowed} />
          <Text className="ml10">{account}</Text>
        </Box>
        <Text
          className="mt10 ml31"
          color={networkAllowed ? "success" : "error"}
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
            color="brand"
          />
          <Button
            disabled={!networkAllowed}
            onClick={() => {}}
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
