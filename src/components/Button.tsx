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
  padding: 15px;
  text-transform: uppercase;
  width: ${calculateWidth};
  font-size: 18px;
  letter-spacing: 1.5px;
  background-color: ${p =>
    p.primary ? p.theme.blue.dark : p.theme.gray.light};
  border: ${p => `1px solid ${p.theme.gray.medium}`};
  &:hover {
    border-radius: 4px;
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p => `linear-gradient(to right, ${p.theme.rainbow})`};
    transition: transform 0.1s;
    transform: scale(1.02);
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
