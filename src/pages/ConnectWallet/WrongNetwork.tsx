import React from 'react';
import { AcknowledgementSection } from '../Summary/AcknowledgementSection';
import { Text } from '../../components/Text';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';

const isMainnet = process.env.REACT_APP_IS_MAINNET === 'true';

const networkName = isMainnet ? 'Mainnet' : 'Göerli Testnet';

export const WrongNetwork = () => (
  <WorkflowPageTemplate title="Deposit Summary">
    <AcknowledgementSection title="Your network has changed">
      <Text>
        Your Ethereum network is not correct, Please connect to the{' '}
        {networkName} network.
      </Text>
    </AcknowledgementSection>
  </WorkflowPageTemplate>
);
