import React from 'react';
import styled from 'styled-components';
import { Box, BoxProps } from 'grommet';

const variantStyles: Record<string, React.CSSProperties> = {
  primary: {
    backgroundColor: '#cce5ff',
    borderColor: '#b8daff',
  },
  warning: {
    backgroundColor: '#fcf8e3',
    borderColor: '#faebcc',
  },
  secondary: {
    backgroundColor: '#fdfcfe',
    borderColor: '#d3d3d3',
  },
  info: {
    backgroundColor: '#d9edf7',
    borderColor: '#bce8f1',
  },
  error: {
    backgroundColor: '#f2dede',
    borderColor: '#ebccd1',
  },
  success: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
};

const HighlightStyles = styled.div`
  .alert-highlight {
    padding: 5px;
    border-radius: 4px;
    background-color: rgba(0, 0, 0, 0.04);
    margin-inline-end: 3px;
    margin-inline-start: 3px;
  }
`;

type AlertProps = {
  children: React.ReactNode;
  className?: string;
  error?: boolean;
  style?: any;
  variant?: string;
} & BoxProps;

export const Alert = ({
  variant = 'primary',
  className,
  children,
  style,
  pad,
  ...props
}: AlertProps) => (
  <Box
    border
    className={className}
    pad={pad || 'medium'}
    round="xsmall"
    style={{
      ...variantStyles[variant],
      ...style,
    }}
    {...props}
  >
    <HighlightStyles>{children}</HighlightStyles>
  </Box>
);
