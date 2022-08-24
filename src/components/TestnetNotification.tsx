import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Alert } from './Alert';

const StyledAlert = styled(Alert)`
  text-align: center;
`;

const AllCaps = styled.span`
  text-transform: uppercase;
`;

export const TestnetNotification = (): JSX.Element => {
  return (
    <StyledAlert variant="error" round="none" pad="small">
      <FormattedMessage
        defaultMessage="Warning: This is a staking launchpad for the {testnet}."
        values={{ testnet: <AllCaps><FormattedMessage defaultMessage="testnet" /></AllCaps> }}
      />
    </StyledAlert>
  );
};
