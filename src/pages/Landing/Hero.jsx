import React from "react";
import styled from "styled-components";
import { Heading } from "grommet";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import EthLogoImg from "../../static/eth-diamond.svg";

const RainbowBackground = styled.div`
  background-image: radial-gradient(
    circle at 100% -80%,
    ${p => p.theme.rainbow.red},
    ${p => p.theme.rainbow.orange},
    ${p => p.theme.rainbow.yellow},
    ${p => p.theme.rainbow.green},
    ${p => p.theme.rainbow.blue},
    ${p => p.theme.rainbow.purple}
  );
`;
const MainContainer = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  margin: 0 auto;
  padding: 0 120px;
  @media only screen and (max-width: 1440px) {
    padding: 0px 60px;
  }
`;
const ContentContainer = styled.div`
  display: flex;
  align-items: center;
  > div {
    max-width: 65%;
  }
`;
const RainbowBtn = styled(Button)`
  width: 250px;
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
  color: ${p => p.theme.black};
  font-weight: bold;
`;
const CTAContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 40px 0 20px;
`;
const BottomSpacer = styled.div`
  padding-bottom: 100px;
  width: 100%;
`;

export const Hero = () => {
  return (
    <RainbowBackground>
      <MainContainer>
        <ContentContainer>
          <div>
            <div className="py100">
              <LogoContainer>
                <EthLogo src={EthLogoImg} />
                <LogoText>eth2 Launch Pad</LogoText>
              </LogoContainer>
              <Heading level={2} size="large" color="brand">
                Become a validator and help secure the eth2 network.
              </Heading>
              <Text className="mt24">
                Earn continuous payouts for providing a public good to the
                community.
              </Text>
            </div>
            <CTAContainer className="mt40 mb20">
              <RainbowBtn label="GET STARTED" />
            </CTAContainer>
          </div>
        </ContentContainer>
        <BottomSpacer />
      </MainContainer>
    </RainbowBackground>
  );
};
