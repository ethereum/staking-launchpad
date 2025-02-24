import React from 'react';
import { FormattedMessage } from 'react-intl';
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
  onClose?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

const ModalHeader = ({ children, className, onClose }: ModalHeaderProps) => (
  <Wrapper className={className}>
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
    {onClose && (
      <CloseButton
        label={<FormattedMessage defaultMessage="Close" />}
        onClick={onClose}
      />
    )}
  </Wrapper>
);

export default ModalHeader;
