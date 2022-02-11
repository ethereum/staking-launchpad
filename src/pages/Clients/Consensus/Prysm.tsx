import React from 'react';
import styled from 'styled-components';
import { PageTemplate } from '../../../components/PageTemplate';
import prysmBg from '../../../static/prysmatic-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { PRYSM_INSTALLATION_URL } from '../../../utils/envVars';
import { FormattedMessage, useIntl } from 'react-intl';

const ClientDiversityWarning = styled(Text as any)`
  background: #ffdeb32e;
  border: 1px solid burlywood;
  padding: 30px;
  border-radius: 4px;
`;

// eslint-disable-next-line no-unused-vars
export const PrysmDetails = ({ shortened }: { shortened?: boolean }) => (
  <>
    <ClientDiversityWarning>
      <FormattedMessage
        defaultMessage="Currently the majority of validators run Prysm as their consensus client.
      Client diversity is extremely important for the network health of Ethereum:
      A bug in a client with a share of over 33% can cause Ethereum to go offline. If the client has
      a super-majority (>66%), a bug could cause the chain to incorrectly split, potentially leading to
      slashing."
      />
      <Link
        to="https://ethereum.org/en/developers/docs/nodes-and-clients/client-diversity/"
        primary
      >
        <FormattedMessage defaultMessage="More on client diversity" />
      </Link>
    </ClientDiversityWarning>
    <SectionTitle level={2} className="mb5">
      Prysm
    </SectionTitle>
    <Text className="mt10 mb20">
      <FormattedMessage
        defaultMessage="An implementation of the consensus protocol with a focus on usability,
          security, and reliability. Prysm is developed by Prysmatic Labs, a company with
          the sole focus on the development of their client."
      />
    </Text>
    <Link to="https://prysmaticlabs.com/" primary>
      <FormattedMessage defaultMessage="More on Prysmatic Labs" />
    </Link>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Prysm is written in Go and released under a GPL-3.0 license." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Become a validator with Prysm" />
      </SectionTitle>
      <Text className="mt10 mb20">
        <FormattedMessage
          defaultMessage="Prysm offers step-by-step guidelines to run their client after completing
            your deposit through the launchpad."
        />
      </Text>
      <Link primary to={PRYSM_INSTALLATION_URL}>
        <FormattedMessage defaultMessage="Prysm installation documentation" />
      </Link>
    </section>
  </>
);

export const Prysm = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Consensus Clients: {clientName}' },
        { clientName: 'Prysm' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={prysmBg} style={{ objectPosition: '0 -80px' }} />
        <PrysmDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link
            primary
            to="https://docs.prylabs.network/docs/getting-started/"
            className="mt10"
          >
            <FormattedMessage defaultMessage="Prysm documentation" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
