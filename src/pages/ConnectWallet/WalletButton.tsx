import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spinning } from 'grommet-controls';
import { Text } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { Paper } from '../../components/Paper';

const Logo = styled.img`
  height: 50px;
  width: 50px;
  display: block;
  margin: 10px;
`;

const StyledText = styled(Text)`
  margin: auto;
  font-size: 24px;
`;

export const WalletButton = ({
  title,
  walletProvider,
  error,
  logoSource,
}: {
  title: string;
  walletProvider: any;
  error: Error | undefined;
  logoSource: string;
}) => {
  const { activate, active } = useWeb3React<Web3Provider>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);
  console.log(title, showSpinner);

  useEffect(() => {
    if (error || active) setShowSpinner(false);
  });

  const handleClick = () => {
    setShowSpinner(true);
    activate(walletProvider);
  };

  return (
    <Paper pad="xsmall" className="flex flex-row" onClick={handleClick}>
      <Logo src={logoSource} />
      <StyledText>{title}</StyledText>
      {showSpinner && <Spinning kind="pulse" />}
    </Paper>
  );
};
