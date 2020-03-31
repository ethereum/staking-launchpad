import React from 'react';
import styled from 'styled-components';

const PBarContainer = styled.div`
  height: 70px;
  display: flex;
  border-radius: ${p => p.theme.borderRadius};
  margin-top: 20px;
  box-shadow: -1px 2px 4px rgba(238, 238, 238, 0.5),
    -1px 2px 2px rgba(222, 222, 222, 0.5);
`;
const PBarComplete = styled.div`
  border-radius: ${p => p.theme.borderRadius} 0 0 ${p => p.theme.borderRadius};
  background-color: ${p => p.theme.blue.dark};
  height: 100%;
  width: ${(p: { workflow: number }) => p.workflow}%;
`;

const PBarNewlyAdded = styled.div`
  background-color: ${p => p.theme.blue.light};
  height: 100%;
  width: ${(p: { workflow: number }) => p.workflow}%;
`;

const PBarIncomplete = styled.div`
  border-radius: 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0;
  background-color: ${p => p.theme.blue.lightest};
  height: 100%;
  width: ${(p: { workflow: number }) => p.workflow}%;
`;

interface Props {
  complete: number;
  newlyAdded: number;
  incomplete: number;
}

export const ProgressBar = ({ complete, newlyAdded, incomplete }: Props) => {
  return (
    <div>
      <PBarContainer>
        <PBarComplete workflow={complete} />
        <PBarNewlyAdded workflow={newlyAdded} />
        <PBarIncomplete workflow={incomplete} />
      </PBarContainer>
    </div>
  );
};
