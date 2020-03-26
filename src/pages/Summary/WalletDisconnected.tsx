import React from 'react';
import styled from 'styled-components';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { AcknowledgementSection } from './AcknowledgementSection';
import { Text } from '../../components/Text';
import { routesEnum } from '../../Routes';
import { Link as L } from '../../components/Link';
import { ProgressStep } from '../../store/actions';

const Link = styled(L)`
  display: inline;
  margin: 6px;
  text-decoration: underline !important;
  color: ${(p: { theme: any }) => p.theme.blueLight} !important;
`;
export const WalletDisconnected = () => (
  <WorkflowPageTemplate
    title="Deposit summary"
    progressStep={ProgressStep.CONNECT_WALLET}
  >
    <AcknowledgementSection title="Your wallet has disconnected">
      <Text>
        Your wallet has disconnected.
        <Link to={routesEnum.connectWalletPage}>
          Please connect your wallet
        </Link>
        and begin the deposit process again.
      </Text>
    </AcknowledgementSection>
  </WorkflowPageTemplate>
);
