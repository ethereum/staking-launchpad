import React from 'react';
import styled from 'styled-components';
import 'animate.css/animate.min.css';
import ScrollAnimation from 'react-animate-on-scroll';
// @ts-ignore
import Animate from 'animate.css-react';
import EthDiamondPlain from '../../static/eth-diamond-plain.svg';
import { routesEnum } from '../../Routes';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';

interface mobile {
  isMobile: boolean;
}

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight})`};
  min-height: ${(p: mobile) => p.isMobile && 'calc(100vh - 20px)'};
`;
const MainContainer = styled.div`
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px 100px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: ${(p: mobile) => (p.isMobile ? '20px' : '0 60px 100px')};
    min-height: ${(p: mobile) => (p.isMobile ? '100vh' : undefined)};
  }
`;
const ResponsiveContainer = styled.div`
  height: ${(p: mobile) => (p.isMobile ? '100%' : undefined)};
  > div.is-mobile {
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: calc(100vh - 20px);
  }
  @media only screen and (min-width: ${p => p.theme.screenSizes.medium}) {
    max-width: 65%;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  height: 50px;
`;
const EthLogo = styled.img`
  height: 50px;
`;
const LogoText = styled(Text)`
  line-height: 50px;
  margin-left: 15px;
  font-weight: bold;
`;

export const Hero = () => {
  const m: boolean = (window as any).mobileCheck();
  return (
    <RainbowBackground isMobile={m}>
      <MainContainer isMobile={m}>
        <ResponsiveContainer isMobile={m}>
          <div className={`pt100 ${m ? 'is-mobile' : undefined}`}>
            <div>
              <ScrollAnimation animateIn="fadeIn" delay={150} animateOnce>
                <LogoContainer className={m ? 'mb50' : undefined}>
                  <EthLogo src={EthDiamondPlain} />
                  <LogoText>Eth2 Launch Pad</LogoText>
                </LogoContainer>
                <Heading
                  level={m ? 1 : 2}
                  size={m ? 'meduim' : 'large'}
                  color="brand"
                  className="my20"
                >
                  Become a validator and help secure the eth2{' '}
                  {IS_MAINNET ? ` mainnet` : ` ${ETH2_NETWORK_NAME} testnet`}.
                </Heading>
              </ScrollAnimation>
              <ScrollAnimation animateIn="fadeInUp" delay={750} animateOnce>
                <Text className="mt25">
                  Earn continuous payouts for providing a public good to the
                  community.
                </Text>
              </ScrollAnimation>
            </div>
            <Animate
              enter="fadeIn"
              appear="fadeIn"
              className={m ? undefined : 'mt100'}
            >
              <Link
                to={routesEnum.acknowledgementPage}
                className={`${m ? 'mb125' : undefined}`}
              >
                <Button
                  fullWidth={m}
                  rainbow
                  width={m ? undefined : 250}
                  label={`GET STARTED ${m ? 'ON DESKTOP' : ''}`}
                />
              </Link>
            </Animate>
          </div>
        </ResponsiveContainer>
      </MainContainer>
    </RainbowBackground>
  );
};
