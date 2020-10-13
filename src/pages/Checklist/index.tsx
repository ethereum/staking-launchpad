import React from 'react';
import styled from 'styled-components';
// import { Link } from '../../components/Link';
import { PageTemplate } from '../../components/PageTemplate';
import { Heading } from '../../components/Heading';
// import { Text } from '../../components/Text';
const ChecklistPageStyles = styled.div`
  section > h3 {
    border-bottom: 1px solid lightgray;
  }
`;

export const Checklist = () => {
  return (
    <PageTemplate title="Eth2 Staker Checklist">
      <ChecklistPageStyles>
        <section>
          <Heading level={3}>Hardware</Heading>
        </section>
        <section>
          <Heading level={3}>Keystore</Heading>
        </section>
        <section>
          <Heading level={3}>Security</Heading>
        </section>
        <section>
          <Heading level={3}>Eth1 Client</Heading>
        </section>
        <section>
          <Heading level={3}>Eth2 Beacon Node (BN)</Heading>
        </section>
        <section>
          <Heading level={3}>Eth2 Validator Client (VC)</Heading>
        </section>
        <section>
          <Heading level={3}>Eth2 Validator Client (VC)</Heading>
        </section>
        <section>
          <Heading level={3}>[Optional] Prometheus + Grafana monitor</Heading>
        </section>
        <section>
          <Heading level={3}>[Optional] POAP Graffiti</Heading>
        </section>
      </ChecklistPageStyles>
    </PageTemplate>
  );
};
