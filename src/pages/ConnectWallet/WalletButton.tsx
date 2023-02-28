// Import libraries
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Spinning } from 'grommet-controls';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { AbstractConnector } from '@web3-react/abstract-connector';
// Components and pages
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import { changeToTestnet } from './Chains';
import { TARGET_NETWORK_CHAIN_ID } from './web3Utils';
// Utilities
import { IS_NON_INFURA_TESTNET } from '../../utils/envVars';

export const Logo = styled.img`
  height: 50px;
  width: 50px;
  display: block;
  margin: 24px;
`;

const StyledText = styled(Text)`
  margin: 10px;
  font-size: ${(p: { invalid?: boolean }) => (p.invalid ? '14px' : '24px')};
`;

const StyledPaper = styled(Paper)`
  box-shadow: ${(p: { isActive: boolean }) =>
    p.isActive && `0 0 10px rgba(0, 0, 0, 0.5)`};
  width: 350px;
  margin: 10px;
  align-items: center;
  cursor: ${p => (p.error ? 'not-allowed' : 'pointer')};
  &:hover {
    box-shadow: ${p => (p.error ? 'none' : '0px 8px 17px rgba(0, 0, 0, 0.15)')};
    transition: ${p => (p.error ? 'none' : 'transform 0.1s;')};
    transform: ${p => (p.error ? 'none' : 'scale(1.02)')};
  }
`;

const WalletText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`;

const ConnectingContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin: 8px;
`;

const SpinnerContainer = styled.span`
  margin-top: 20px;
  display: flex;
  margin-inline-end: 10px;
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
    if (IS_NON_INFURA_TESTNET) {
      await changeToTestnet(TARGET_NETWORK_CHAIN_ID);
    }
    if (!selectedWallet) {
      setShowSpinner(true);
      setSelectedWallet(walletProvider);
      await activate(walletProvider);
      setSelectedWallet(undefined);
    }
  };

  return (
    <StyledPaper
      pad="xsmall"
      className="wallet-button flex flex-row relative"
      error={invalid}
      onClick={() => {
        if (!invalid) handleClick();
      }}
      isActive={selectedWallet === walletProvider}
    >
      <Logo src={logoSource} />
      <ConnectingContainer>
        <WalletText>
          <StyledText invalid={invalid}>
            {!invalid && <>{title}</>}
            {invalid && (
              <FormattedMessage
                defaultMessage="{title} is not supported in offline mode."
                values={{ title: <span>{title}</span> }}
              />
            )}
          </StyledText>
          {showSpinner && (
            <Text size="small">
              <FormattedMessage defaultMessage="Waiting to connect..." />
            </Text>
          )}
        </WalletText>
        {showSpinner && (
          <SpinnerContainer>
            <Spinning kind="pulse" />
          </SpinnerContainer>
        )}
      </ConnectingContainer>
    </StyledPaper>
  );
};
