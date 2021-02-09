import React from 'react';
import styled from 'styled-components';
import { Checkmark } from 'grommet-icons';
import { Close } from 'grommet-icons';

interface DotProps {
  theme?: any;
  success?: boolean;
  error?: boolean;
  width?: number;
  height?: number;
  className?: string;
}

const StyledDiv = styled.div`
  width: ${(p: DotProps) => p.width || 20}px;
  height: ${(p: DotProps) => p.height || 20}px;
  padding: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p: DotProps) => {
    if (p.success) return p.theme.green.dark;
    if (p.error) return p.theme.red.medium;
    return p.theme.gray.light;
  }};
  border-radius: 50%;
`;

export const Dot = (props: DotProps) => (
  <StyledDiv {...props}>
    {props.success && <Checkmark size="small" color="white" />}
    {!props.success && <Close size="small" color="white" />}
  </StyledDiv>
);
