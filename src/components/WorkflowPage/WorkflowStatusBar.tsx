import React, { useState } from "react";
import styled from "styled-components";
import EthRound from "../../static/ethRound.svg";

const logoPositions = {
  small: [-7, 16, 38, 59, 80.5, 98],
  medium: [-5, 14.5, 36.5, 57.5, 79.5, 97.5],
  large: [-2, 16.5, 37.5, 57.5, 78, 96]
};

const Container = styled.div`
  background-color: white;
  height: 200px;
  display: flex;
`;
const SubContainer = styled.div`
  box-sizing: border-box;
  max-width: 1440px;
  width: 100%;
  margin: 80px auto 0;
  padding: 0 120px;

  @media only screen and (max-width: 1440px) {
    max-width: 1024px;
    padding: 0px 60px;
  }
  @media only screen and (max-width: 1024px) {
    max-width: 768px;
  }
`;
const BarContainer = styled.div`
  position: relative;
  margin: auto;
  height: 50px;

  width: 85%;
  @media only screen and (max-width: 1440px) {
  }
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const CompletedColor = styled.div`
  width: ${(p: { position: number }) => logoPositions.large[p.position] + 1}%;
  background: ${p => p.theme.brand};
  border-radius: 8px;
  height: 10px;
  position: absolute;
  z-index: 1;

  @media only screen and (max-width: 1440px) {
    width: ${(p: { position: number }) =>
      logoPositions.medium[p.position] + 1}%;
  }
  @media only screen and (max-width: 1024px) {
    width: ${(p: { position: number }) => logoPositions.small[p.position] + 1}%;
  }
`;
const GreyedColor = styled.div`
  width: 100%;
  background: ${p => p.theme.gray10};
  border-radius: 8px;
  height: 4px;
  position: absolute;
  top: 3px;
`;
const EthLogo = styled.img`
  position: absolute;
  top: -25px;
  left: ${(p: { position: number }) => logoPositions.large[p.position]}%;
  height: 60px;
  width: 60px;
  z-index: 2;

  @media only screen and (max-width: 1440px) {
    left: ${(p: { position: number }) => logoPositions.medium[p.position]}%;
  }
  @media only screen and (max-width: 1024px) {
    left: ${(p: { position: number }) => logoPositions.small[p.position]}%;
  }
`;

const Flexbox = styled.div`
  display: flex;
  justify-content: space-evenly;
  //padding-top: 40px;
`;

const Section = styled.div`
  //width: ${100 / 6}%;
  margin: 0 20px;
  text-align: center;
`;

export const WorkflowStatusBar = () => {
  const [pos, setPos] = useState(0);
  return (
    <Container>
      <SubContainer>
        <BarContainer>
          <GreyedColor />
          <CompletedColor position={pos} />
          <EthLogo
            position={pos}
            src={EthRound}
            alt="eth-diamond-round"
          />
        </BarContainer>
        <Flexbox>
          <Section onClick={() => setPos(pos - 1)}>Overview</Section>
          <Section>ValidatorSettings</Section>
          <Section>Generate Keys</Section>
          <Section>UploadValidator</Section>
          <Section>Connect Wallet</Section>
          <Section onClick={() => setPos(pos + 1)}>Summary</Section>
        </Flexbox>
      </SubContainer>
    </Container>
  );
};
