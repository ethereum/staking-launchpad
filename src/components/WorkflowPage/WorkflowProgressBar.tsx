import React from 'react';
import styled from 'styled-components';
import { EthRoundLogo } from './EthRoundLogo';
import { rainbowColors } from '../../styles/styledComponentsTheme';
import { WorkflowStep } from '../../store/actions/workflowActions';

export const logoPositions = {
  small: [0, 17.5, 35, 52, 69, 90],
  medium: [-5, 14.5, 36.5, 57.5, 77.5, 95.5],
  large: [-2, 17, 37.5, 58.5, 77, 94.5],
};

const Container = styled.div`
  background-color: white;
  height: 200px;
  display: flex;
`;
const SubContainer = styled.div`
  box-sizing: border-box;
  max-width: ${p => p.theme.screenSizes.largest};
  width: 100%;
  margin: 80px auto 0;
  padding: 0 120px;

  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
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
  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
  }
  @media only screen and (max-width: 1024px) {
    width: 100%;
  }
`;
const CompletedColor = styled.div`
  width: ${(p: { position: number }) => logoPositions.large[p.position] + 1}%;
  background: ${(p: { position: number }) => rainbowColors[p.position]};
  border-radius: 8px;
  height: 10px;
  position: absolute;
  z-index: 1;

  @media only screen and (max-width: ${p => p.theme.screenSizes.largest}) {
    width: ${(p: { position: number }) =>
      logoPositions.medium[p.position] + 1}%;
  }
  @media only screen and (max-width: 1024px) {
    width: ${(p: { position: number }) => logoPositions.small[p.position] + 1}%;
  }
`;
const GreyedColor = styled.div`
  width: 100%;
  background: ${p => p.theme.gray.medium};
  border-radius: 8px;
  height: 4px;
  position: absolute;
  top: 3px;
  @media only screen and (max-width: 1024px) {
    width: 98%;
  }
`;

const Flexbox = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const Step = styled.div`
  margin: 0 20px;
  text-align: center;
  color: ${(p: {
    disabled: boolean;
    active: boolean;
    index: number;
    theme: any;
  }) => {
    if (p.disabled) return p.theme.gray.medium;
    return rainbowColors[p.index];
  }};
  font-weight: ${p => (p.active ? 600 : undefined)};
`;

interface Props {
  workflow: WorkflowStep;
}

export const WorkflowProgressBar = ({ workflow }: Props): JSX.Element => {
  interface step {
    step: WorkflowStep;
    text: string;
  }

  const steps: step[] = [
    { step: WorkflowStep.OVERVIEW, text: 'Overview' },
    { step: WorkflowStep.GENERATE_KEY_PAIRS, text: 'Generate Keys' },
    {
      step: WorkflowStep.UPLOAD_VALIDATOR_FILE,
      text: 'Upload Validator',
    },
    { step: WorkflowStep.CONNECT_WALLET, text: 'Connect Wallet' },
    { step: WorkflowStep.SUMMARY, text: 'Summary' },
    { step: WorkflowStep.TRANSACTION_SIGNING, text: 'Transactions' },
  ];
  return (
    <Container>
      <SubContainer>
        <BarContainer>
          <GreyedColor />
          <CompletedColor position={workflow} />
          <EthRoundLogo position={workflow} />
        </BarContainer>
        <Flexbox>
          {steps.map(({ step, text }, i) => (
            <Step
              key={text}
              index={i}
              disabled={workflow < step}
              active={workflow === step}
            >
              {text}
            </Step>
          ))}
        </Flexbox>
      </SubContainer>
    </Container>
  );
};
