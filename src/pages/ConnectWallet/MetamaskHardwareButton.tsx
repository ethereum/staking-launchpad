import React from 'react';
import styled from 'styled-components';
import ledger from '../../static/ledger.png';
import { Paper } from '../../components/Paper';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';

const Logo = styled.img`
  height: 50px;
  width: 50px;
  display: block;
  margin: 10px;
`;

const StyledText = styled(Text)`
  margin: auto;
  font-size: 14px;
  text-align: center;
`;
const StyledPaper = styled(Paper)`
  width: 350px;
  margin: 10px;
`;

export const MetamaskHardwareButton = () => {
  return (
    <Link
      external
      to="https://metamask.zendesk.com/hc/en-us/articles/360020394612-How-to-connect-a-Trezor-or-Ledger-Hardware-Wallet"
    >
      <StyledPaper
        pad="xsmall"
        className="wallet-button flex flex-row relative"
      >
        <Logo src={ledger} />
        <StyledText>
          Learn how to connect your hardware device on Metamask
        </StyledText>
      </StyledPaper>
    </Link>
  );
};
