import React from 'react';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';
import { Alert as AlertIcon } from 'grommet-icons';
import { Alert } from './Alert';
import { Text } from './Text';

const BannerContent = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  @media (max-width: 32rem) {
    flex-direction: column;
    text-align: center;
  }
`;

export const ApiOutageBanner = (): JSX.Element => (
  <Alert variant="warning" className="my10">
    <BannerContent>
      <AlertIcon size="large" />
      <div>
        <Text className="text-bold">
          <FormattedMessage defaultMessage="Validator lookup features are temporarily unavailable while we perform a service update." />
        </Text>
        <Text className="mt10">
          <FormattedMessage defaultMessage="Your funds are safe and unaffected. We are actively working on a fix and expect to restore this functionality shortly." />
        </Text>
      </div>
    </BannerContent>
  </Alert>
);
