import React from 'react';
import { AcknowledgementSection } from '../Summary/AcknowledgementSection';
import { Text } from '../../components/Text';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { FormattedMessage, useIntl } from 'react-intl';
import { EL_NETWORK_NAME } from './web3Utils';

export const WrongNetwork = () => {
  const { formatMessage } = useIntl();
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
            defaultMessage="Your wallet is on the wrong Ethereum network. To continue, connect to the 
            {networkName} network."
            values={{ networkName: <span>{EL_NETWORK_NAME}</span> }}
          />
        </Text>
      </AcknowledgementSection>
    </WorkflowPageTemplate>
  );
};
