import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Alert } from './Alert';

const StyledAlert = styled(Alert)`
  text-align: center;
`;

export const TestnetNotification = (): JSX.Element => {
  return (
    <StyledAlert variant="warning" round="none" pad="small">
      <FormattedMessage defaultMessage="Warning: This is a staking launchpad for TESTNET." />
    </StyledAlert>
  );
};
