import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import EthDiamondPlain from '../static/eth-diamond-plain.svg';
import { Text } from '../components/Text';
import { Link } from '../components/Link';

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  min-height: 100vh;
`;
const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const EthLogo = styled.img`
  height: 100px;
`;
const LogoText = styled(Text)`
  font-weight: bold;
  align-items: center;
`;
const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  width: 400px;
  height: 400px;

  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  /*this to solve "the content will not be cut when the window is smaller than the content": */
  max-width: 100%;
  max-height: 100%;
  overflow: auto;
`;

export const NotFoundPage = (): JSX.Element => {
  return (
    <RainbowBackground>
      <Content>
        <LogoContainer>
          <EthLogo src={EthDiamondPlain} />
          <LogoText className="mt20" center size="large">
            Eth2 Launchpad
          </LogoText>
        </LogoContainer>
        <Text center className="mt20">
          <FormattedMessage defaultMessage="Sorry, this page does not exist." />
          <Link primary className="mt20" to="/">
            {' '}
            <FormattedMessage defaultMessage="Launchpad home" />
          </Link>
        </Text>
      </Content>
    </RainbowBackground>
  );
};
