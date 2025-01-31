import React from 'react';
import styled from 'styled-components';
import { Button as GrommetButton, ButtonProps } from 'grommet';

interface CustomButtonProps {
  className?: string;
  width?: number;
  fullWidth?: boolean;
  rainbow?: boolean;
  onClick?: () => any;
  destructive?: boolean;
  secondary?: boolean;
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
  text-transform: uppercase;
  width: ${calculateWidth};
  padding: 1rem;
  font-size: 18px;
  letter-spacing: 1.5px;
  background-color: ${p =>
    p.primary ? p.theme.blue.dark : p.theme.gray.light};
  border: ${p => `1px solid ${p.theme.gray.medium}`};
  border-radius: 4px;
  &:hover {
    box-shadow: 0px 8px 17px rgba(0, 0, 0, 0.15);
    background-image: ${p =>
      `linear-gradient(to right, ${
        // @ts-ignore
        p.destructive ? 'none' : p.theme.rainbow
      })`};
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

  // destructive styles
  ${p =>
    // @ts-ignore
    p.destructive &&
    // @ts-ignore
    `background-color: ${p.secondary ? p.theme.gray.light : p.theme.red.light};
    // @ts-ignore
    color: ${p.secondary ? p.theme.red.medium : p.theme.black};
    border: 1px solid ${p.theme.red.medium};
    &:hover {
      background-color: darkred;
       color: white;
     }
   `}
`;

export const Button = ({
  className,
  ...props
}: CustomButtonProps & ButtonProps) => (
  <StyledButton className={className} {...props} />
);
