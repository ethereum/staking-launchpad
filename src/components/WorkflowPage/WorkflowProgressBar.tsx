import React from "react";
import styled from "styled-components";
import EthRound from "../../static/ethRound.svg";
import { StoreState } from "../../store/reducers";
import { ProgressStep } from "../../store/actions";
import { connect } from "react-redux";

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
  background: ${p => p.theme.secondary};
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
`;

interface StepProps {
  active: boolean;
  disabled: boolean;
  theme: any;
}
const Step = styled.div`
  margin: 0 20px;
  text-align: center;
  color: ${(p: StepProps) => {
    if (p.disabled) return p.theme.gray10;
    if (p.active) return p.theme.secondary;
    return p.theme.brand;
  }};
  font-weight: 500;
`;

interface Props {
  progress: ProgressStep;
}

const _WorkflowProgressBar = ({ progress }: Props) => {
  return (
    <Container>
      <SubContainer>
        <BarContainer>
          <GreyedColor />
          <CompletedColor position={progress} />
          <EthLogo position={progress} src={EthRound} alt="eth-diamond-round" />
        </BarContainer>
        <Flexbox>
          <Step
            disabled={progress < ProgressStep.OVERVIEW}
            active={progress === ProgressStep.OVERVIEW}
          >
            Overview
          </Step>
          <Step
            disabled={progress < ProgressStep.VALIDATOR_SETTINGS}
            active={progress === ProgressStep.VALIDATOR_SETTINGS}
          >
            ValidatorSettings
          </Step>
          <Step
            disabled={progress < ProgressStep.GENERATE_KEY_PAIRS}
            active={progress === ProgressStep.GENERATE_KEY_PAIRS}
          >
            Generate Keys
          </Step>
          <Step
            disabled={progress < ProgressStep.UPLOAD_VALIDATOR_FILE}
            active={progress === ProgressStep.UPLOAD_VALIDATOR_FILE}
          >
            UploadValidator
          </Step>
          <Step
            disabled={progress < ProgressStep.CONNECT_WALLET}
            active={progress === ProgressStep.CONNECT_WALLET}
          >
            Connect Wallet
          </Step>
          <Step
            disabled={progress < ProgressStep.SUMMARY}
            active={progress === ProgressStep.SUMMARY}
          >
            Summary
          </Step>
        </Flexbox>
      </SubContainer>
    </Container>
  );
};

const mstp = ({ progress }: StoreState) => ({
  progress
});

export const WorkflowProgressBar = connect(mstp)(_WorkflowProgressBar);
