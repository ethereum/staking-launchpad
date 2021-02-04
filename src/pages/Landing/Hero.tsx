import React from 'react';
import styled from 'styled-components';
import 'animate.css/animate.min.css';
import ScrollAnimation from 'react-animate-on-scroll';
// @ts-ignore
import Animate from 'animate.css-react';
import LeslieTheRhinoPNG from '../../static/eth2-leslie-rhino.png';
import { routesEnum } from '../../Routes';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Button } from '../../components/Button';
import { Link } from '../../components/Link';
import useMobileCheck from '../../hooks/useMobileCheck';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';

interface mobile {
  isMobile: boolean;
}

const RainbowBackground = styled.div`
  min-width: 100%;
  overflow: hidden;
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
    min-height: calc(100vh - 10px);
  }
`;
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.small}) {
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: calc(100vh - 40px);
    height: calc(100vh - 40px);
  }
`;
const LefContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
const InfoContainer = styled.div`
  min-height: calc(100% - 50px);
  justify-content: space-evenly;
  display: flex;
  flex-direction: column;
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.small}) {
    min-height: calc(100% - 70px);
  }
`;
const TitleContainer = styled.div`
  flex-basis: 50px;
  flex-shrink: 0;
  height: 50px;
  @media screen and (max-width: ${({ theme }) => theme.screenSizes.small}) {
    flex-basis: 70px;
    flex-shrink: 0;
    height: 70px;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  min-height: 50px;
`;

// @ts-ignore
const LogoText = styled(Text)`
  line-height: 40px;
  font-weight: bold;
  @media screen and (max-width: 1080px) {
    line-height: 24px;
  }
`;
const StyledLeslieImgNode = styled.img`
  max-width: 100%;
  margin: 3rem 0 5rem;
  transform: scale(1.2, 1.2);
  transform-origin: 0% 0%;
  @media screen and (min-width: 800px) {
    transform: translate3d(0, 0, 0);
    margin: 0 -3rem 0 3rem;
    max-width: 100%;
    max-height: 510px;
  }
  @media screen and (max-width: 800px) {
    max-width: 220px;
    margin: 30px auto;
    display: block;
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
  const isMediumScreen = useMobileCheck('1080px');
  const m: boolean = (window as any).mobileCheck();
  return (
    <RainbowBackground isMobile={m}>
      <MainContainer isMobile={m}>
        <ResponsiveContainer isMobile={m}>
          <div className={`flex ${m ? 'flex-column is-mobile' : ''}`}>
            <ContentContainer className={m ? undefined : 'pt100'}>
              <LefContentContainer>
                {isMediumScreen && (
                  <TitleContainer>
                    <Animate enter="fadeIn" appear="fadeIn" delay={150}>
                      <LogoContainer className={m ? 'mb50' : undefined}>
                        <LogoText>
                          Eth2 Launchpad{' '}
                          {IS_MAINNET ? `` : `for ${ETH2_NETWORK_NAME} testnet`}
                        </LogoText>
                      </LogoContainer>
                    </Animate>
                  </TitleContainer>
                )}
                <InfoContainer>
                  <ScrollAnimation animateIn="fadeIn" delay={150} animateOnce>
                    <Heading
                      level={m ? 1 : 2}
                      size={m ? 'medium' : 'large'}
                      color="brand"
                      className="my20"
                    >
                      Become a validator and help secure the future of Ethereum
                    </Heading>
                  </ScrollAnimation>
                  <ScrollAnimation animateIn="fadeInUp" delay={750} animateOnce>
                    <Text className="mt25">
                      Earn continuous rewards for providing a public good to the
                      community.
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
                        fullWidth={m || isSmallScreen}
                        rainbow
                        width={isSmallScreen || m ? undefined : 250}
                        label={`Become a validator ${m ? 'ON DESKTOP' : ''}`}
                      />
                    </Link>
                  </Animate>
                </InfoContainer>
              </LefContentContainer>
              {!isSmallScreen && <LeslieImage />}
            </ContentContainer>
          </div>
        </ResponsiveContainer>
      </MainContainer>
    </RainbowBackground>
  );
};
