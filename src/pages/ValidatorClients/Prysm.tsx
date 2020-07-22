import React from 'react';
import { PageTemplate } from '../../components/PageTemplate';
import prysmBg from '../../static/prysmatic-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from './ValidatorClientComponents';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';

export const Prysm = () => {
  return (
    <PageTemplate title="">
      <ValidatorClientPageStyles>
        <Hero imgSrc={prysmBg} style={{ objectPosition: '0 -80px' }} />
        <Text className="mt10">
          <Link
            external
            to="https://github.com/prysmaticlabs/prysm"
            primary
            inline
          >
            Prysm
          </Link>{' '}
          is a Go implementation of Ethereum 2.0 protocol with a focus on
          usability, security, and reliability. Prysm is developed by{' '}
          <Link external to="https://prysmaticlabs.com/" primary inline>
            Prysmatic Labs
          </Link>
          , a company with the sole focus on the development of their client.
          Prysm is written in Go and released under a GPL-3.0 license.
        </Text>
        <section>
          <SectionTitle level={2} className="mb5">
            Installation
          </SectionTitle>
          <Link
            external
            primary
            to="https://docs.prylabs.network/docs/getting-started/"
          >
            https://docs.prylabs.network/docs/getting-started/
          </Link>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Key Management
          </SectionTitle>
          <Text>
            Prysm is currently going through a redesign of how their keys are
            managed. After this redesign is completed, it will be much easier to
            use keystores in Prysm and these instructions will be updated then.
          </Text>
          <Link
            primary
            external
            to="https://github.com/prysmaticlabs/prysm/pulls?q=is%3Apr+Accounts+V2+"
            withArrow
          >
            Follow the progress of this update on the Prysm Github repository
          </Link>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Documentation
          </SectionTitle>
          <Link
            primary
            external
            to="https://docs.prylabs.network/docs/"
            withArrow
          >
            https://docs.prylabs.network/docs/
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
