import React from 'react';
import { AcknowledgementSection } from '../Summary/AcknowledgementSection';
import { Text } from '../../components/Text';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';

export const WrongNetwork = ({ networkName }: { networkName: string }) => (
  <WorkflowPageTemplate title="Deposit Summary">
    <AcknowledgementSection title="Your network has changed">
      <Text>
        Your Ethereum network is not correct, Please connect to the
        {networkName} network.
      </Text>
    </AcknowledgementSection>
  </WorkflowPageTemplate>
);
