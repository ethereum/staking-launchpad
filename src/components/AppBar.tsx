import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Box, DropButton } from 'grommet';
import { useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import EthDiamond from '../static/eth-diamond-plain.svg';
import { web3ReactInterface } from '../pages/ConnectWallet';
import { trimString } from '../utils/trimString';
import {
  AllowedNetworks,
  NetworkChainId,
} from '../pages/ConnectWallet/web3Utils';
import { Dot } from './Dot';
import { Link } from './Link';
import { Text } from './Text';
import { routesEnum } from '../Routes';
import { Heading } from './Heading';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../utils/envVars';

const RainbowBackground = styled(Box)`
  background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
`;

const EthLogo = styled.img`
  height: 40px;
  width: 40px;
`;

const NetworkText = styled(Text)`
  margin-right: 30px;
  padding: 5px 15px;
  border-radius: 4px;
  border: 1px solid;
  font-weight: 500;
`;

const NavBarLinks = styled.div`
  display: flex;
  @media only screen and (max-width: 1080px) {
    .secondary-link {
      display: none;
    }
  }
`;

const ValidatorDropdown = styled(DropButton)`
  font-weight: 300;
  border: none;
  :hover {
    border: none;
    box-shadow: none;
  }
`;

const DropdownLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

const BarLink = styled(Link)``;

const BarLinkText = styled(Heading)`
  :not(.no-padding) {
    padding: 0 12px;
  }
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-weight: ${(p: { active?: boolean }) => (p.active ? 'bold' : 300)};
`;
const _AppBar = ({ location }: RouteComponentProps) => {
  const {
    active: walletConnected,
    account,
    chainId,
  }: web3ReactInterface = useWeb3React<Web3Provider>();

  let network;
  let networkAllowed = false;

  if (chainId) {
    network = NetworkChainId[chainId];
    networkAllowed = Object.values(AllowedNetworks).includes(network);
  }

  const pathname: string = React.useMemo(() => location.pathname, [
    location.pathname,
  ]);

  const isDropdownPage = React.useMemo(
    () =>
      pathname === routesEnum.lighthouse ||
      pathname === routesEnum.nimbus ||
      pathname === routesEnum.prysm ||
      pathname === routesEnum.teku,
    [pathname]
  );

  return (
    <RainbowBackground
      tag="header"
      direction="row"
      align="center"
      justify="between"
      pad={{ left: 'medium', right: 'small', vertical: 'small' }}
      elevation="medium"
      style={{ zIndex: 1 }}
    >
      <NavBarLinks>
        <BarLink to={routesEnum.landingPage} className="mx30">
          <EthLogo src={EthDiamond} alt="eth-diamond" />
          <div className="flex flex-column center ml5">
            <BarLinkText
              active={pathname === routesEnum.landingPage}
              level={4}
              margin="none"
              className="bar-link-text no-padding"
            >
              Eth2 Launch Pad
            </BarLinkText>
            {!IS_MAINNET && <Text>for {ETH2_NETWORK_NAME} testnet</Text>}
          </div>
        </BarLink>

        <BarLink
          to={routesEnum.acknowledgementPage}
          className="mx30 secondary-link"
        >
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.acknowledgementPage}
          >
            Deposit
          </BarLinkText>
        </BarLink>
        <ValidatorDropdown
          className="secondary-link"
          label={
            <BarLinkText level={4} margin="none" active={isDropdownPage}>
              Validator Clients
            </BarLinkText>
          }
          dropAlign={{ top: 'bottom', right: 'right' }}
          dropContent={
            <Box pad="small">
              <DropdownLink to={routesEnum.lighthouse}>Lighthouse</DropdownLink>
              <DropdownLink to={routesEnum.nimbus}>Nimbus</DropdownLink>
              <DropdownLink to={routesEnum.prysm}>Prysm</DropdownLink>
              <DropdownLink to={routesEnum.teku}>Teku</DropdownLink>
            </Box>
          }
        />
        <BarLink to={routesEnum.checklistPage} className="mx30 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.checklistPage}
          >
            Checklist
          </BarLinkText>
        </BarLink>
        <BarLink to={routesEnum.FaqPage} className="mx30 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.FaqPage}
          >
            FAQ
          </BarLinkText>
        </BarLink>
      </NavBarLinks>

      <div className="flex">
        <NetworkText>
          {ETH2_NETWORK_NAME}
          {IS_MAINNET ? `` : ` Testnet`}
        </NetworkText>
        {walletConnected && (
          <Box className="flex flex-row mr20" style={{ paddingTop: 8 }}>
            <Dot success={networkAllowed} error={!networkAllowed} />
            <Text size="small" className="ml10" color="blueDark">
              {trimString(account as string, 10)}
            </Text>
          </Box>
        )}
      </div>
    </RainbowBackground>
  );
};

export const AppBar = withRouter(_AppBar);
