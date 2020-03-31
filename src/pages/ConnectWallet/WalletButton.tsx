import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spinner } from 'react-rainbow-components';
import { Text } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
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
const StyledPaper = styled(Paper)`
  box-shadow: ${(p: { isActive: boolean }) =>
    p.isActive && `0 0 10px rgba(0, 0, 0, 0.5)`};
`;
const StyledSpinner = styled(Spinner)`
  height: 25px;
  width: 25px;
  top: 40px;
  left: 88%;
`;

export const WalletButton = ({
  title,
  walletProvider,
  error,
  logoSource,
  selectedWallet,
  setSelectedWallet,
}: {
  title: string;
  walletProvider: any;
  error: Error | undefined;
  logoSource: string;
  selectedWallet: AbstractConnector | undefined | null;
  setSelectedWallet(wallet?: AbstractConnector): void;
}) => {
  const { activate, active } = useWeb3React<Web3Provider>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    if (error || active) {
      setShowSpinner(false);
    }
  });

  const handleClick = async () => {
    if (!selectedWallet) {
      setTimeout(() => setShowSpinner(true), 100); // avoids spinner flash  when metamask connects instantly
      setSelectedWallet(walletProvider);
      await activate(walletProvider);
      setSelectedWallet(undefined);
    }
  };

  return (
    <StyledPaper
      pad="xsmall"
      className="wallet-button flex flex-row relative"
      onClick={handleClick}
      isActive={selectedWallet === walletProvider}
    >
      <Logo src={logoSource} />
      <StyledText>{title}</StyledText>
      {showSpinner && <StyledSpinner />}
    </StyledPaper>
  );
};
