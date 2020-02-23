import React from "react";
import styled from "styled-components";
import { Button as GrommetButton, ButtonProps } from "grommet";

interface CustomButtonProps {
  className?: string;
  width?: number;
}

const StyledButton = styled(GrommetButton)`
  display: block;
  padding: 10px;
  text-transform: capitalize;
  width: ${(p: { width: number }) => (p.width ? `${p.width}px` : undefined)};
  background-color: ${p => p.theme.brand};
  color: ${p => p.theme.white};
  border: none;
  :hover {
    box-shadow: none;
  }
  
  // rainbow styles
  ${p =>
    p.theme.rainbow &&
    `background-image: linear-gradient(to right, ${p.theme.rainbow});
     color: ${p.theme.brand};
     border: 1px solid ${p.theme.brand};
     `}
`;

export const Button = (props: CustomButtonProps & ButtonProps) => {
  const { className } = props;
  return <StyledButton className={className} {...props} />;
};
