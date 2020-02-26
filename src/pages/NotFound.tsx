import React from "react";
import styled from "styled-components";
import EthDiamondPlain from "../static/eth-diamond-plain.svg";
import { Text } from "../components/Text";

const RainbowBackground = styled.div`
  background-image: ${p =>
    `radial-gradient(circle at 100% -80%, ${p.theme.rainbowLight}`});
  min-height: 100vh;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
`;
const EthLogo = styled.img`
  height: 100px;
`;
const LogoText = styled(Text)`
  margin-left: 25px;
  font-weight: bold;
  display: inline-flex;
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
          <LogoText size="large">eth2 Launch Pad</LogoText>
        </LogoContainer>
        <Text center className="mt20">
          Sorry, this page does not exist.
        </Text>
      </Content>
    </RainbowBackground>
  );
};
