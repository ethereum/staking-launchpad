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
            Validating with Prysm
          </SectionTitle>
          <Text>
            Prysm offers step-by-step guidelines to run their client after completing your deposit through the launchpad 
          </Text>
          <Link
            primary
            external
            to="https://docs.prylabs.network/docs/testnet/medalla/"
            withArrow
          >
            Run Prysm
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
