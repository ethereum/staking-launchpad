import React from 'react';
import styled from 'styled-components';
import 'animate.css/animate.min.css';
import ScrollAnimation from 'react-animate-on-scroll';
// @ts-ignore
import Animate from 'animate.css-react';
import EthDiamondPlain from '../../static/eth-diamond-plain.svg';
import LeslieTheRhinoPNG from '../../static/eth2-leslie-rhino.png';
import { routesEnum } from '../../Routes';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';
import useMobileCheck from '../../hooks/useMobileCheck';

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
`;
const SectionContainer = styled.div`
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.small}) {
    min-height: calc(100vh - 50px);
  }
`;
const ContentContainer = styled.div`
  display: flex;
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.small}) {
    justify-content: space-between;
    min-height: calc(100vh - 100px);
  }
`;
const LogoContainer = styled.div`
  display: flex;
  height: 50px;
`;
const EthLogo = styled.img`
  height: 50px;
`;
// @ts-ignore
const LogoText = styled(Text)`
  line-height: 50px;
  margin-left: 15px;
  font-weight: bold;
`;
const StyledLeslieImgNode = styled.img`
  margin: 3rem 0;
  max-width: 100%;
  @media screen and (min-width: ${({ theme }) => theme.screenSizes.small}) {
    max-width: 100%;
    max-height: 600px;
  }
`;

//
// Sub-components

const LeslieImage: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <div>
    <ScrollAnimation animateIn="fadeIn" delay={750} animateOnce>
      <StyledLeslieImgNode
        src={LeslieTheRhinoPNG}
        alt="Leslie the Rhino - eth2 mascot"
        {...{ style }}
      />
    </ScrollAnimation>
  </div>
);

//
// Main component

export const Hero = () => {
  const isSmallScreen = useMobileCheck('800px');
  const m: boolean = (window as any).mobileCheck();
  return (
    <RainbowBackground isMobile={m}>
      <MainContainer isMobile={m}>
        <ResponsiveContainer isMobile={m}>
          <div className={`flex ${m ? 'flex-column is-mobile' : ''}`}>
            <SectionContainer className={m ? undefined : 'pt100'}>
              <SectionContainer>
                <div style={{ minHeight: 50 }}>
                  <Animate enter="fadeIn" appear="fadeIn" delay={150}>
                    <LogoContainer className={m ? 'mb50' : undefined}>
                      <EthLogo src={EthDiamondPlain} />
                      <LogoText>Eth2 Launch Pad</LogoText>
                    </LogoContainer>
                  </Animate>
                </div>
                <ContentContainer
                  className={isSmallScreen ? undefined : 'pt100'}
                >
                  <div>
                    <ScrollAnimation animateIn="fadeIn" delay={150} animateOnce>
                      <Heading
                        level={m ? 1 : 2}
                        size={m ? 'meduim' : 'large'}
                        color="brand"
                        className="my20"
                      >
                        Become a validator and help secure the eth2{' '}
                        {IS_MAINNET
                          ? ` mainnet`
                          : ` ${ETH2_NETWORK_NAME} testnet`}
                        .
                      </Heading>
                    </ScrollAnimation>
                    <ScrollAnimation
                      animateIn="fadeInUp"
                      delay={750}
                      animateOnce
                    >
                      <Text className="mt25">
                        Earn continuous payouts for providing a public good to
                        the community.
                      </Text>
                    </ScrollAnimation>
                    {!!isSmallScreen && <LeslieImage />}
                    <Animate
                      enter="fadeIn"
                      appear="fadeIn"
                      className={m ? undefined : 'mt100'}
                    >
                      <Link to={routesEnum.acknowledgementPage}>
                        <Button
                          fullWidth={isSmallScreen}
                          rainbow
                          width={isSmallScreen ? undefined : 250}
                          label={`GET STARTED ${m ? 'ON DESKTOP' : ''}`}
                        />
                      </Link>
                    </Animate>
                  </div>
                  {!isSmallScreen && (
                    <LeslieImage style={{ margin: '3rem 0 0 3rem ' }} />
                  )}
                </ContentContainer>
              </SectionContainer>
            </SectionContainer>
          </div>
        </ResponsiveContainer>
      </MainContainer>
    </RainbowBackground>
  );
};
