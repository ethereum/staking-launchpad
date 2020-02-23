import React from "react";
import styled from "styled-components";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import EthDiamondPlain from "../../static/eth-diamond-plain.svg";
import "animate.css/animate.min.css";
import ScrollAnimation from "react-animate-on-scroll";
import { routesEnum } from "../../Routes";
import { Link } from "../../components/Link";

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbow}`});
`;
const MainContainer = styled.div`
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 0 auto;
  padding: 0 120px 100px;
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    padding: 0 60px 100px;
  }
`;
const ResponsiveContainer = styled.div`
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
  return (
    <RainbowBackground>
      <MainContainer>
        <ResponsiveContainer>
          <div className="py100">
            <ScrollAnimation animateIn="fadeIn" delay={150} animateOnce>
              <LogoContainer>
                <EthLogo src={EthDiamondPlain} />
                <LogoText>eth2 Launch Pad</LogoText>
              </LogoContainer>
              <Heading level={2} size="large" color="brand" className="my20">
                Become a validator and help secure the eth2 network.
              </Heading>
            </ScrollAnimation>
            <ScrollAnimation animateIn="fadeInUp" delay={750} animateOnce>
              <Text className="mt24">
                Earn continuous payouts for providing a public good to the
                community.
              </Text>
            </ScrollAnimation>
          </div>
          <ScrollAnimation animateIn="fadeIn" delay={750} animateOnce>
            <Link to={routesEnum.AcknowledgementPage}>
              <Button rainbow width={250} label="GET STARTED" />
            </Link>
          </ScrollAnimation>
        </ResponsiveContainer>
      </MainContainer>
    </RainbowBackground>
  );
};
