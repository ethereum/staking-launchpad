import React from "react";
import styled from "styled-components";

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
  width: ${(p: { progress: number }) => p.progress}%;
`;
const PBarIncomplete = styled.div`
  border-radius: 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0;
  background-color: ${p => p.theme.green.medium};
  height: 100%;
  width: ${(p: { progress: number }) => 100 - p.progress}%;
`;

export const ProgressBar = ({ progress }: { progress: number }) => {
    return (
        <PBarContainer>
            <PBarComplete progress={progress} />
            <PBarIncomplete progress={progress} />
        </PBarContainer>
    );
};
