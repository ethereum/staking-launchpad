import React from 'react';
import styled from 'styled-components';
import { SelectionBox } from './SelectionBox';
import { Heading } from './Heading';

const SelectionText = styled(Heading)`
  margin: 20px 0;
  text-align: center;
`;

interface TextSelectionBoxProps {
  isActive: boolean;
  onClick: any;
  children: string;
  style?: any;
}

export const TextSelectionBox = ({
  isActive,
  onClick,
  style,
  children,
}: TextSelectionBoxProps) => {
  return (
    <SelectionBox
      onClick={onClick}
      isActive={isActive}
      style={{
        display: 'flex',
        alignItems: 'center',
        width: 'initial',
        height: 'initial',
        padding: '0 2rem',
        minWidth: 0,
        minHeight: 0,
        ...style,
      }}
    >
      <SelectionText level={5} size="small" color="blueDark">
        {children}
      </SelectionText>
    </SelectionBox>
  );
};
