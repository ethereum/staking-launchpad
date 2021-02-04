import React from 'react';
import styled from 'styled-components';
import { FormNext } from 'grommet-icons';
import { rainbowColors } from '../../styles/styledComponentsTheme';
import { WorkflowStep } from '../../store/actions/workflowActions';

const Container = styled.div`
  background-color: white;
`;

const StepContainer = styled.div`
  padding: 20px;
  width: fit-content;
  margin: auto;
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
    if (p.active) return rainbowColors[p.index];
    return p.theme.gray.medium;
  }};
  font-weight: ${p => (p.active ? 600 : undefined)};
`;

const Arrow = styled(FormNext)`
  stroke: ${p => p.color || p.theme.gray.medium};
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
    { step: WorkflowStep.SELECT_CLIENT, text: 'Choose client' },
    { step: WorkflowStep.GENERATE_KEY_PAIRS, text: 'Generate keys' },
    {
      step: WorkflowStep.UPLOAD_VALIDATOR_FILE,
      text: 'Upload Validator',
    },
    { step: WorkflowStep.CONNECT_WALLET, text: 'Connect wallet' },
    { step: WorkflowStep.SUMMARY, text: 'Summary' },
    { step: WorkflowStep.TRANSACTION_SIGNING, text: 'Transactions' },
  ];

  return (
    <Container>
      <StepContainer>
        {steps.map(({ step, text }, i) => (
          <div className="flex-inline" key={text}>
            <Step
              index={i}
              disabled={workflow < step}
              active={workflow === step}
            >
              {text}
            </Step>
            {i !== steps.length - 1 && (
              // @ts-ignore
              <Arrow color={workflow === step ? rainbowColors[i] : undefined} />
            )}
          </div>
        ))}
      </StepContainer>
    </Container>
  );
};
