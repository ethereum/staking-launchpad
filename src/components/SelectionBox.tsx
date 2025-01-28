import React from 'react';
import styled from 'styled-components';

const LogoContainerBox = styled.button`
  width: 196px;
  background: white;
  height: 100%;
  border: ${(p: { theme: any; isActive: boolean }) =>
    `2px solid ${p.isActive ? p.theme.gray.dark : p.theme.gray.medium}`};
  box-shadow: ${(p: { theme: any; isActive: boolean }) =>
    p.isActive && `0 0 10px rgba(0, 0, 0, 0.5)`};
  border-radius: ${p => p.theme.borderRadius};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 1rem;
  cursor: pointer;
  -webkit-transition: border 500ms ease-out, box-shadow 500ms ease-out;
  -moz-transition: border 500ms ease-out, box-shadow 500ms ease-out;
  -o-transition: border 500ms ease-out, box-shadow 500ms ease-out;
  transition: border 500ms ease-out, box-shadow 500ms ease-out;
  padding: 0;
  @media only screen and (max-width: 770px) {
    width: 100%;
  }
`;

interface SelectionBoxProps {
  isActive: boolean;
  onClick: any;
  children?: React.ReactElement | React.ReactElement[];
  fullWidth?: boolean;
  style?: any;
}

export const SelectionBox = ({
  isActive,
  onClick,
  style,
  children,
}: SelectionBoxProps) => {
  return (
    <LogoContainerBox onClick={onClick} isActive={isActive} style={style}>
      {children}
    </LogoContainerBox>
  );
};
