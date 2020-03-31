import React from 'react';
import styled from 'styled-components';

const PBarContainer = styled.div`
  height: 70px;
  display: flex;
  border-radius: ${p => p.theme.borderRadius};
  margin-top: 20px;
`;
const PBarComplete = styled.div`
  border-radius: ${p => p.theme.borderRadius} 0 0 ${p => p.theme.borderRadius};
  background-color: ${p => p.theme.green.dark};
  height: 100%;
  width: ${(p: { workflow: number }) => p.workflow}%;
`;
const PBarIncomplete = styled.div`
  border-radius: 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0;
  background-color: ${p => p.theme.green.medium};
  height: 100%;
  width: ${(p: { workflow: number }) => 100 - p.workflow}%;
`;

export const ProgressBar = ({ workflow }: { workflow: number }) => {
  return (
    <PBarContainer>
      <PBarComplete workflow={workflow} />
      <PBarIncomplete workflow={workflow} />
    </PBarContainer>
  );
};
