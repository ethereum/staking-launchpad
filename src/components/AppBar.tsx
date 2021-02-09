import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { Box, DropButton } from 'grommet';
import { Menu } from 'grommet-icons';
import { Language } from 'grommet-icons';
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
import useMobileCheck from '../hooks/useMobileCheck';
import { FormattedMessage } from 'react-intl';

const RainbowBackground = styled(Box)`
  background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
`;

const EthLogo = styled.img`
  height: 40px;
  width: 40px;
`;

const NetworkText = styled(Text)`
  padding: 5px 8px;
  border-radius: 4px;
  border: 1px solid;
  font-weight: 500;
  text-align: center;
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
  padding: 12px 8px;
  font-weight: 300;
  display: flex;
  align-items: center;
  border: none;
  :hover {
    border: none;
    box-shadow: none;
  }
`;

const DotDropdown = styled(DropButton)`
  display: flex;
  align-items: center;
  border: none;
  padding: 0;
  margin: 0;
  :hover {
    transition: transform 0.2s;
    transform: scale(1.1);
  }
`;

const DropdownLink = styled(Link)`
  :hover {
    text-decoration: underline;
  }
`;

const Card = styled.div``;

const NetworkInfo = styled.div`
  background: ${p => p.theme.gray.light};
  padding: 32px;
`;

const NavLinksRight = styled.div`
  display: flex;
  align-items: center;
`;

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

  const mobile = useMobileCheck('1080px');

  const networkName = IS_MAINNET ? 'Mainnet' : 'Göerli Testnet';

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
        <Link to={routesEnum.landingPage} className="mr30">
          <EthLogo src={EthDiamond} alt="eth-diamond" />
          {!mobile && (
            <div className="flex flex-column center ml5">
              <BarLinkText
                active={pathname === routesEnum.landingPage}
                level={4}
                margin="none"
                className="bar-link-text no-padding"
              >
                <Text>
                  Eth2 {!IS_MAINNET && `${ETH2_NETWORK_NAME} `}Launchpad
                </Text>
              </BarLinkText>
            </div>
          )}
        </Link>

        <Link
          to={routesEnum.acknowledgementPage}
          className="mx10 secondary-link"
        >
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.acknowledgementPage}
          >
            <FormattedMessage defaultMessage="Deposit" />
          </BarLinkText>
        </Link>
        <ValidatorDropdown
          className="secondary-link"
          label={
            <BarLinkText level={4} margin="none" active={isDropdownPage}>
              <FormattedMessage defaultMessage="Clients" />
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
        <Link to={routesEnum.checklistPage} className="mx10 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.checklistPage}
          >
            <FormattedMessage defaultMessage="Checklist" />
          </BarLinkText>
        </Link>
        <Link to={routesEnum.FaqPage} className="mx10 secondary-link">
          <BarLinkText
            level={4}
            margin="none"
            className="bar-link-text"
            active={pathname === routesEnum.FaqPage}
          >
            <FormattedMessage defaultMessage="FAQ" />
          </BarLinkText>
        </Link>
      </NavBarLinks>
      <NavLinksRight>
        {!mobile && (
          <Link to={routesEnum.languagesPage} className="mx10 secondary-link">
            <BarLinkText
              level={4}
              margin="none"
              className="bar-link-text"
              active={pathname === routesEnum.languagesPage}
            >
              <FormattedMessage defaultMessage="Languages" />
            </BarLinkText>
          </Link>
        )}
        {mobile && (
          <Link to={routesEnum.languagesPage} className="mx10">
            <Language color="black" />
          </Link>
        )}
        {mobile && (
          <ValidatorDropdown
            className="secondary-link"
            label={<Menu color="black" />}
            dropAlign={{ top: 'bottom', right: 'right' }}
            dropContent={
              <Card>
                <NetworkInfo>
                  {walletConnected && (
                    <Box className="flex flex-row mb20">
                      <Dot success={networkAllowed} error={!networkAllowed} />
                      <Text size="small" className="ml10" color="blueDark">
                        {trimString(account as string, 10)}
                      </Text>
                    </Box>
                  )}
                  <NetworkText>
                    {ETH2_NETWORK_NAME}
                    {IS_MAINNET ? `` : ` Testnet`}
                  </NetworkText>
                  <Text className="mt20">
                    <em>
                      <FormattedMessage defaultMessage="Visit this site on desktop to become a validator." />
                    </em>
                  </Text>
                </NetworkInfo>
                <Box pad="medium" className="mt0">
                  <DropdownLink to={routesEnum.FaqPage}>
                    <FormattedMessage defaultMessage="FAQ" />
                  </DropdownLink>
                  <DropdownLink to={routesEnum.checklistPage}>
                    <FormattedMessage defaultMessage="Staker checklist" />
                  </DropdownLink>
                  <DropdownLink to={routesEnum.languagesPage}>
                    <FormattedMessage defaultMessage="Languages" />
                  </DropdownLink>
                  <Text className="my20">
                    <b>
                      <FormattedMessage defaultMessage="The Eth2 clients" />
                    </b>
                  </Text>
                  <DropdownLink to={routesEnum.lighthouse}>
                    Lighthouse
                  </DropdownLink>
                  <DropdownLink to={routesEnum.nimbus}>Nimbus</DropdownLink>
                  <DropdownLink to={routesEnum.prysm}>Prysm</DropdownLink>
                  <DropdownLink to={routesEnum.teku}>Teku</DropdownLink>
                </Box>
              </Card>
            }
          />
        )}
        {!mobile && (
          <NetworkText className="mr30">
            {ETH2_NETWORK_NAME}
            {IS_MAINNET ? `` : ` Testnet`}
          </NetworkText>
        )}
        {!mobile && walletConnected && (
          <Box className="flex flex-row mr20">
            {networkAllowed && (
              <DotDropdown
                className="secondary-link"
                label={<Dot success={networkAllowed} error={!networkAllowed} />}
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <Box pad="small">
                    <Text>
                      <FormattedMessage defaultMessage="You're on the right network!" />
                    </Text>
                  </Box>
                }
              />
            )}
            {!networkAllowed && (
              <DotDropdown
                className="secondary-link"
                label={<Dot error={!networkAllowed} />}
                dropAlign={{ top: 'bottom', right: 'right' }}
                dropContent={
                  <Box pad="small">
                    <Text>
                      <FormattedMessage
                        defaultMessage="Your wallet should be set to {networkName} to use this launchpad."
                        values={{
                          networkName: <span>{networkName}</span>,
                        }}
                      />
                    </Text>
                  </Box>
                }
              />
            )}
            <Text size="small" className="ml10" color="blueDark">
              {trimString(account as string, 10)}
            </Text>
          </Box>
        )}
      </NavLinksRight>
    </RainbowBackground>
  );
};

export const AppBar = withRouter(_AppBar);
