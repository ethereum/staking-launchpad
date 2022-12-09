import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AcknowledgementSection } from '../Summary/AcknowledgementSection';
import { Text } from '../../components/Text';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import useIntlNetworkName from '../../hooks/useIntlNetworkName';

export const WrongNetwork = () => {
  const { formatMessage } = useIntl();
  const { executionLayerName } = useIntlNetworkName();

  const acknowledgementTitle = formatMessage({
    defaultMessage: 'Your network has changed',
  });

  const pageTitle = formatMessage({
    defaultMessage: 'Deposit summary',
  });
  return (
    <WorkflowPageTemplate title={pageTitle}>
      <AcknowledgementSection title={acknowledgementTitle}>
        <Text>
          <FormattedMessage
            defaultMessage="Your wallet is on the wrong Ethereum network. To continue, connect to {executionLayerName}."
            values={{ executionLayerName }}
          />
        </Text>
      </AcknowledgementSection>
    </WorkflowPageTemplate>
  );
};
