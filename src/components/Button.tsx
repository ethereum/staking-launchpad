import React from "react";
import styled from "styled-components";
import { Button as GrommetButton, ButtonProps } from "grommet";

interface CustomButtonProps {
  className?: string;
}

const StyledButton = styled(GrommetButton)`
  display: block;
  padding: 10px;
  text-transform: capitalize;
  background-image: linear-gradient(
    to right,
    ${p => p.theme.rainbow.red},
    ${p => p.theme.rainbow.orange},
    ${p => p.theme.rainbow.yellow},
    ${p => p.theme.rainbow.green},
    ${p => p.theme.rainbow.blue},
    ${p => p.theme.rainbow.purple}
  );
`;

export const Button = (props: CustomButtonProps & ButtonProps) => {
  const { className } = props;
  return <StyledButton className={className} {...props} />;
};
