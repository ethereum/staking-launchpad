import React from 'react';
import { AcknowledgementSection } from './AcknowledgementSection';
import { Text } from '../../components/Text';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { ProgressStep } from '../../store/actions';

export const WrongNetwork = ({ networkName }: { networkName: string }) => (
  <WorkflowPageTemplate
    title="Deposit Summary"
    progressStep={ProgressStep.CONNECT_WALLET}
  >
    <AcknowledgementSection title="Your network has changed">
      <Text>
        Your Ethereum network is not correct, Please connect to the
        {networkName} network and refresh the page to begin the deposit process
        again.
      </Text>
    </AcknowledgementSection>
  </WorkflowPageTemplate>
);
