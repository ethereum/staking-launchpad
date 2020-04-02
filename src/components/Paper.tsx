import React from 'react';
import { Box, BoxProps } from 'grommet';
import styled from 'styled-components';

export const Paper = (
  props: {
    children: React.ReactNode;
    className?: string;
    error?: boolean;
    style?: any;
  } & BoxProps
): JSX.Element => {
  const { error, className, children, pad } = props;
  return (
    <Box
      border={error ? { color: 'redLight', size: 'small' } : true}
      className={className}
      pad={pad || 'large'}
      background="white"
      round="xsmall"
      {...props}
    >
      {children}
    </Box>
  );
};

const BoxGroup = styled(Box)`
  width: 100%;
  > :first-child {
    border-radius: ${p =>
      `${p.theme.borderRadius} ${p.theme.borderRadius} 0 0`};
  }
  > :last-child {
    border-radius:${p => `0 0 ${p.theme.borderRadius} ${p.theme.borderRadius}`};
  }
  }
  > *:not(:first-child):not(:last-child) {
    border-radius: 0;
    border-top: none;
    border-bottom: none;
  }
`;

export const PaperGroup = (
  props: {
    children: React.ReactNode;
    className?: string;
    id?: string;
  } & BoxProps
): JSX.Element => {
  const { children } = props;
  return <BoxGroup {...props}>{children}</BoxGroup>;
};
