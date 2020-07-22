import React from 'react';
import styled from 'styled-components';

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
  background: ${(p: DotProps) => {
    if (p.success) return p.theme.green.dark;
    if (p.error) return p.theme.red.medium;
    return p.theme.gray.light;
  }};
  border: 3px solid
    ${(p: DotProps) => {
      if (p.success) return p.theme.green.medium;
      if (p.error) return p.theme.red.light;
      return p.theme.gray.medium;
    }};
  border-radius: 50%;
`;

export const Dot = (props: DotProps) => <StyledDiv {...props} />;
