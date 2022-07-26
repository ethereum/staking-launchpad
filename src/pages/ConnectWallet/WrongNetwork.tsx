import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { AcknowledgementSection } from '../Summary/AcknowledgementSection';
import { Text } from '../../components/Text';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { IS_MAINNET, EL_TESTNET_NAME } from '../../utils/envVars';

export const WrongNetwork = () => {
  const { formatMessage } = useIntl();

  const networkName = IS_MAINNET
    ? formatMessage({ defaultMessage: 'Mainnet' })
    : formatMessage(
        { defaultMessage: '{testNetwork} testnet' },
        { testNetwork: EL_TESTNET_NAME }
      );

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
            defaultMessage="Your wallet is on the wrong Ethereum network. To continue, connect to {networkName}."
            values={{ networkName }}
          />
        </Text>
      </AcknowledgementSection>
    </WorkflowPageTemplate>
  );
};
