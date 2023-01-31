import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { AcknowledgementSection } from '../Summary/AcknowledgementSection';
import { Text } from '../../components/Text';
import { routesEnum } from '../../Routes';
import { Link as L } from '../../components/Link';

const Link = styled(L)`
  display: inline;
  text-decoration: underline !important;
  color: ${(p: { theme: any }) => p.theme.blueLight} !important;
`;

export const WalletDisconnected = () => {
  const { formatMessage } = useIntl();
  const acknowledgementTitle = formatMessage({
    defaultMessage: 'Your wallet has disconnected',
  });

  const pageTitle = formatMessage({
    defaultMessage: 'Deposit summary',
  });
  return (
    <WorkflowPageTemplate title={pageTitle}>
      <AcknowledgementSection title={acknowledgementTitle}>
        <Text>
          <FormattedMessage
            defaultMessage="To continue, {reconnect}"
            values={{
              reconnect: (
                <Link to={routesEnum.connectWalletPage}>
                  {formatMessage({
                    defaultMessage: 'reconnect your wallet',
                  })}
                </Link>
              ),
            }}
          />
        </Text>
      </AcknowledgementSection>
    </WorkflowPageTemplate>
  );
};
