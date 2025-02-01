import React from 'react';
import styled from 'styled-components';
import { Heading } from 'grommet';
import { CloseButton } from './Shared';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dedede;
  gap: 0.5rem;
  justify-content: space-between;
  padding: 1rem;
`;

type ModalHeaderProps = {
  children: React.ReactNode;
  onClose: () => void;
};

const ModalHeader = ({ children, onClose }: ModalHeaderProps) => (
  <Wrapper>
    <Heading
      level={3}
      margin="none"
      style={{
        flex: 1,
        fontSize: '1.5rem',
      }}
    >
      {children}
    </Heading>
    <CloseButton label="Close" onClick={onClose} />
  </Wrapper>
);

export default ModalHeader;
