import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Spinning } from 'grommet-controls';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';

export const WalletButtonLogo = styled.img`
  height: 50px;
  width: 50px;
  display: block;
  margin: 10px;
`;

export const WalletButtonText = styled(Text)`
  margin: auto;
  font-size: ${(p: { invalid?: boolean }) => (p.invalid ? '14px' : '24px')};
  text-align: center;
`;

export const WalletButtonPaper = styled(Paper)`
  box-shadow: ${(p: { isActive: boolean }) =>
    p.isActive && `0 0 10px rgba(0, 0, 0, 0.5)`};
  width: 350px;
  margin: 10px;
  cursor: pointer;
`;

export const WalletButton = ({
  title,
  walletProvider,
  error,
  logoSource,
  selectedWallet,
  setSelectedWallet,
  invalid,
}: {
  title: string;
  walletProvider: any;
  error: Error | undefined;
  logoSource: string;
  selectedWallet: AbstractConnector | undefined | null;
  setSelectedWallet(wallet?: AbstractConnector): void;
  invalid?: boolean;
}) => {
  const { activate, active } = useWeb3React<Web3Provider>();
  const [showSpinner, setShowSpinner] = useState<boolean>(false);

  useEffect(() => {
    if (error || active) {
      setShowSpinner(false);
    }
  }, [error, active, setShowSpinner]);

  const handleClick = async () => {
    if (!selectedWallet) {
      setShowSpinner(true);
      setSelectedWallet(walletProvider);
      await activate(walletProvider);
      setSelectedWallet(undefined);
    }
  };

  return (
    <WalletButtonPaper
      pad="xsmall"
      className="wallet-button flex flex-row relative"
      onClick={() => {
        if (!invalid) handleClick();
      }}
      isActive={selectedWallet === walletProvider}
    >
      <WalletButtonLogo src={logoSource} />
      <WalletButtonText invalid={invalid}>
        {`${title} ${invalid ? 'is not supported in offline mode.' : ''}`}
      </WalletButtonText>
      {showSpinner && (
        <span className="mt20 mr10">
          <Spinning kind="pulse" />
        </span>
      )}
    </WalletButtonPaper>
  );
};
