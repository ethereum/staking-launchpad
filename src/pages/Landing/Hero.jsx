import React from "react";
import styled from "styled-components";
import { Heading } from "../../components/Heading";
import { Text } from "../../components/Text";
import { Button } from "../../components/Button";
import EthDiamondPlain from "../../static/eth-diamond-plain.svg";

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
            <LogoContainer>
              <EthLogo src={EthDiamondPlain} />
              <LogoText>eth2 Launch Pad</LogoText>
            </LogoContainer>
            <Heading level={2} size="large" color="brand" className="my20">
              Become a validator and help secure the eth2 network.
            </Heading>
            <Text className="mt24">
              Earn continuous payouts for providing a public good to the
              community.
            </Text>
          </div>
          <Button width={250} label="GET STARTED" />
        </ResponsiveContainer>
      </MainContainer>
    </RainbowBackground>
  );
};
