import React from 'react';
import styled from 'styled-components';
import { Button as GrommetButton, ButtonProps } from 'grommet';

interface CustomButtonProps {
  className?: string;
  width?: number;
  fullWidth?: boolean;
  rainbow?: boolean;
  onClick?: () => any;
}

const calculateWidth = (p: { width?: number; fullWidth?: boolean }) => {
  if (p.width) {
    return `${p.width}px`;
  }
  if (p.fullWidth) {
    return '100%';
  }
};

const StyledButton = styled(GrommetButton)`
  display: block;
  padding: 10px;
  text-transform: capitalize;
  width: ${calculateWidth};
  background-color: ${p => (p.primary ? p.theme.blue.dark : p.theme.white)};
  border: ${p => `1px solid ${p.theme.gray.light}`};
  :hover {
    box-shadow: none;
  }
  // rainbow styles
  ${p =>
    // @ts-ignore
    p.rainbow &&
    `background-image: linear-gradient(to right, ${p.theme.rainbow});
     color: ${p.theme.blue.dark};
     border: 1px solid ${p.theme.blue.dark};
   `}
`;

export const Button = (props: CustomButtonProps & ButtonProps) => {
  const { className } = props;
  return <StyledButton className={className} {...props} />;
};
