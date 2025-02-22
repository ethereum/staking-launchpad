import React, { useEffect, useState } from 'react';
import { Box, Text, Meter, Stack } from 'grommet';
import styled from 'styled-components';
import { useInView } from 'react-intersection-observer';

const ProgressContainer = styled(Box)`
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
  background: ${p => p.theme.colors.background};
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const StepIndicator = styled(Box)<{ isActive: boolean; isCompleted: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${p => 
    p.isCompleted ? p.theme.colors.green :
    p.isActive ? p.theme.colors.brand :
    p.theme.colors.background
  };
  border: 2px solid ${p => p.theme.colors.brand};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${p => 
    p.isCompleted || p.isActive ? '#fff' :
    p.theme.colors.text
  };
  transition: all 0.3s ease;
`;

interface Step {
  label: string;
  estimatedTime: number; // in seconds
}

const steps: Step[] = [
  { label: 'Generating Seed', estimatedTime: 2 },
  { label: 'Creating Key Pairs', estimatedTime: 5 },
  { label: 'Deriving Withdrawal Credentials', estimatedTime: 3 },
  { label: 'Encrypting Keys', estimatedTime: 4 },
  { label: 'Saving Key Store', estimatedTime: 1 },
];

interface Props {
  onComplete?: () => void;
  totalValidators: number;
}

export const KeyGenerationProgress: React.FC<Props> = ({ onComplete, totalValidators }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const totalTime = steps.reduce((acc, step) => acc + step.estimatedTime, 0) * totalValidators;

  useEffect(() => {
    if (!inView) return;

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          onComplete?.();
          return 100;
        }
        return prev + (100 / (totalTime * 10)); // Update every 100ms
      });
    }, 100);

    return () => clearInterval(interval);
  }, [inView, totalTime, onComplete]);

  useEffect(() => {
    const stepProgress = (progress / 100) * steps.length;
    const currentStepIndex = Math.min(Math.floor(stepProgress), steps.length - 1);
    setCurrentStep(currentStepIndex);

    const remainingProgress = 100 - progress;
    const remainingTime = (remainingProgress / 100) * totalTime;
    setTimeRemaining(Math.ceil(remainingTime));
  }, [progress, totalTime]);

  return (
    <ProgressContainer ref={ref}>
      <Box gap="medium">
        <Text weight="bold" size="large">
          Generating Keys for {totalValidators} Validator{totalValidators > 1 ? 's' : ''}
        </Text>

        <Box align="center">
          <Stack anchor="center">
            <Meter
              type="circle"
              size="large"
              thickness="small"
              values={[{ value: progress, color: 'brand' }]}
            />
            <Box align="center">
              <Text size="xxlarge" weight="bold">{Math.round(progress)}%</Text>
              <Text size="small">
                {timeRemaining > 0 ? `${timeRemaining}s remaining` : 'Complete!'}
              </Text>
            </Box>
          </Stack>
        </Box>

        <Box gap="small">
          {steps.map((step, index) => (
            <Box
              key={step.label}
              direction="row"
              align="center"
              gap="small"
              animation={currentStep === index ? { type: 'pulse', duration: 1500, size: 'medium' } : undefined}
            >
              <StepIndicator
                isActive={currentStep === index}
                isCompleted={currentStep > index}
              >
                {currentStep > index ? '✓' : index + 1}
              </StepIndicator>
              <Text
                color={
                  currentStep > index ? 'status-ok' :
                  currentStep === index ? 'text' :
                  'text-weak'
                }
              >
                {step.label}
              </Text>
            </Box>
          ))}
        </Box>
      </Box>
    </ProgressContainer>
  );
};
