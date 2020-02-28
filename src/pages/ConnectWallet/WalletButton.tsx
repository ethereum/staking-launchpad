import React from "react";
import { Button, Heading, Text } from "grommet";
import { Paper } from "../../components/Paper";
import { getErrorMessage } from "./web3Utils";
import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

export const WalletButton = ({
  title,
  walletProvider,
  error
}: {
  title: string;
  walletProvider: any;
  error: Error | undefined;
}) => {
  const { activate } = useWeb3React<Web3Provider>();
  const handleClick = async () => await activate(walletProvider);

  return (
    <Paper className="m10">
      <Heading level={3} size="small" color="blueDark">
        {title}
      </Heading>
      <Button primary onClick={handleClick} label="CONNECT" />
      {error && (
        <Text textAlign="center" className="mt10" color="error">
          {getErrorMessage(error)}
        </Text>
      )}
    </Paper>
  );
};
