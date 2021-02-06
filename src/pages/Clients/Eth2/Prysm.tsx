import React from 'react';
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
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line no-unused-vars
export const PrysmDetails = ({ shortened }: { shortened?: boolean }) => (
  <>
    <SectionTitle level={2} className="mb5">
      Prysm
    </SectionTitle>
    <Text className="mt10 mb20">
      <FormattedMessage
        defaultMessage="An implementation of the Eth2 protocol with a focus on usability,
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
  return (
    <PageTemplate title="">
      <ValidatorClientPageStyles>
        <Hero imgSrc={prysmBg} style={{ objectPosition: '0 -80px' }} />
        <PrysmDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link
            primary
            to="https://docs.prylabs.network/docs/"
            className="mt10"
          >
            <FormattedMessage defaultMessage="Prysm documentation" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
