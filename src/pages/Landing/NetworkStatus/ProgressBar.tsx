import styled from "styled-components";
import React from "react";

export const ProgressBar = ({ progress }: { progress: number }) => {
    const PBarContainer = styled.div`
    height: 70px;
    display: flex;
    border-radius: ${p => p.theme.borderRadius};
    margin-top: 20px;
  `;
    const PBarComplete = styled.div`
    border-radius: ${p => p.theme.borderRadius} 0 0 ${p => p.theme.borderRadius};
    background-color: ${p => p.theme.success};
    height: 100%;
    width: ${progress}%;
  `;
    const PBarIncomplete = styled.div`
    border-radius: 0 ${p => p.theme.borderRadius} ${p => p.theme.borderRadius} 0;
    background-color: ${p => p.theme.successLight};
    height: 100%;
    width: ${100 - progress}%;
  `;
    return (
        <PBarContainer>
            <PBarComplete />
            <PBarIncomplete />
        </PBarContainer>
    );
};
