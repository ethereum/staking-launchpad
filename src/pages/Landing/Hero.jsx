import React from "react";
import styled from "styled-components";
import { Heading, Text } from "grommet";
import { Button } from "../../components/Button";
import RainbowImg from "../../static/JumboRainbow.png";
import EthLogoImg from "../../static/eth-diamond.svg";

const Rainbow = styled.img`
  height: 630px;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  z-index: -1;
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
const Jumbotron = styled.div`
  height: 630px;
  position: relative;
  padding: 30px;
  .container {
    max-width: 100%;
  }
`;

const Container = styled.div`
  width: 1170px;
  margin: 100px auto;
  padding: 0 15px;
`;
const TextContent = styled.div`
  width: 640px;
`;

export const Hero = () => {
  return (
    <Jumbotron>
      <Rainbow src={RainbowImg} />
      <Container>
        <TextContent>
          <LogoContainer>
            <EthLogo src={EthLogoImg} />
            <LogoText>eth2 Launch Pad</LogoText>
          </LogoContainer>
          <Heading level={2} size="large" color="brand">
            Become a validator and help secure the eth2 network.
          </Heading>
          <Text>
            Earn continuous payouts for providing a public good to the
            community.
          </Text>
          <Button className="mt20" label="GET STARTED" />
        </TextContent>
      </Container>
    </Jumbotron>
  );
};
