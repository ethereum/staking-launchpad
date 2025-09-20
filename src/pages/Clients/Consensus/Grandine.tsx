import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import grandineBg from '../../../static/grandine-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { PageTemplate } from '../../../components/PageTemplate';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { GRANDINE_INSTALLATION_URL } from '../../../utils/envVars';

// eslint-disable-next-line no-unused-vars
export const GrandineDetails = ({ shortened }: { shortened?: boolean }) => (
  <>
    <SectionTitle level={2} className="mb5">
      Grandine
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="Grandine is a high-performance Ethereum consensus layer client built in Rust,
                        designed with a strong focus on speed and security. Its performance-oriented
                        architecture makes it well-suited for a wide range of users—from large
                        institutional operators to individual home stakers running on
                        resource-constrained machines."
      />
    </Text>
    <Link to="https://grandine.io/" primary className="mt10">
      <FormattedMessage defaultMessage="More on Grandine" />
    </Link>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Grandine is built in Rust and offered under an GPL 3.0 License." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Become a validator with Grandine" />
      </SectionTitle>
      <Link primary to={GRANDINE_INSTALLATION_URL}>
        <FormattedMessage defaultMessage="Grandine installation documentation" />
      </Link>
    </section>
  </>
);

export const Grandine = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Consensus Clients: {clientName}' },
        { clientName: 'Grandine' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={grandineBg} />
        <GrandineDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://docs.grandine.io/">
            <FormattedMessage defaultMessage="Grandine documentation" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
