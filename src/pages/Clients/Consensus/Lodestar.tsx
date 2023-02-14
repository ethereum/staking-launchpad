import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { PageTemplate } from '../../../components/PageTemplate';
import lodestarBg from '../../../static/lodestar-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { LODESTAR_INSTALLATION_URL } from '../../../utils/envVars';

export const LodestarDetails = ({ shortened }: { shortened?: boolean }) => (
  <>
    <SectionTitle level={2} className="mb5">
      Lodestar
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="Lodestar is an open-sourced TypeScript implementation of the Ethereum Consensus (formerly known as eth2)
                        specification maintained by ChainSafe Systems. ChainSafe's goal is to develop, improve and diversify the Ethereum
                        proof of stake ecosystem with their beacon chain and validator client with a focus on light client implementations."
      />
    </Text>
    <Link to="https://chainsafe.github.io/lodestar/" primary className="mt10">
      <FormattedMessage defaultMessage="More on Lodestar" />
    </Link>
    <Link to="https://chainsafe.io/" primary className="mt10">
      <FormattedMessage defaultMessage="More on ChainSafe" />
    </Link>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Lodestar is built using TypeScript under a GNU Lesser General Public License v3.0." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Become a validator with Lodestar" />
      </SectionTitle>
      <Link primary to={LODESTAR_INSTALLATION_URL}>
        <FormattedMessage defaultMessage="Lodestar installation documentation" />
      </Link>
    </section>
    {!shortened && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Validator management" />
          </SectionTitle>
          <Link
            primary
            to="https://chainsafe.github.io/lodestar/usage/validator-management/"
          >
            <FormattedMessage defaultMessage="Lodestar validator key management documentation" />
          </Link>
        </section>
      </>
    )}
  </>
);

export const Lodestar = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Consensus Clients: {clientName}' },
        { clientName: 'Lodestar' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={lodestarBg} />
        <LodestarDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://chainsafe.github.io/lodestar/">
            <FormattedMessage defaultMessage="Lodestar documentation" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
