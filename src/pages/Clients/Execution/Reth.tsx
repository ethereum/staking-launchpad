import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import rethBg from '../../../static/reth-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { PageTemplate } from '../../../components/PageTemplate';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';

// eslint-disable-next-line no-unused-vars
export const RethDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Reth
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Reth is a modular, contributor-friendly and blazing-fast implementation of the Ethereum protocol, in Rust. Reth is able to sync an archive node in less than 50 hours from genesis. A Reth mainnet archive node is only 2.1TB in June 2024." />
    </Text>
    <Link
      primary
      to="https://www.paradigm.xyz/2024/03/reth-beta"
      className="mt10"
    >
      <FormattedMessage defaultMessage="Latest Reth Benchmarks" />
    </Link>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Reth 1.0 was audited by Sigma Prime over the course of >8 weeks in May 2024, link below." />
    </Text>
    <Link
      primary
      to="https://github.com/paradigmxyz/reth/blob/1bc9d8b145e0131684b8b053fd31c7589bc76317/Sigma_Prime_Paradigm_Reth_Security_Assessment_Report_v1_0.pdf"
      className="mt10"
    >
      <FormattedMessage defaultMessage="Reth Audit Report" />
    </Link>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Reth is built in Rust, a language empowering everyone to build reliable and efficient software. Rust is a general-purpose programming language that emphasizes performance, type safety, and concurrency. It enforces memory safety—meaning that all references point to valid memory—without a garbage collector." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text>
        <FormattedMessage defaultMessage="The Reth book explains how to download and install the client. We also provide versioned releases on Github." />
      </Text>
      <Link primary to="https://reth.rs/" className="mt10">
        <FormattedMessage defaultMessage="Reth installation documentation" />
      </Link>
      <Link
        primary
        to="https://github.com/paradigmxyz/reth/releases"
        className="mt10"
      >
        <FormattedMessage defaultMessage="Reth Releases" />
      </Link>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Support" />
      </SectionTitle>
      <Text>
        <FormattedMessage defaultMessage="Reth provides an active Telegram chat for technical discussion and troubleshooting." />
      </Text>
      <Link primary to="https://t.me/paradigm_reth/" className="mt10">
        <FormattedMessage defaultMessage="Reth Chat" />
      </Link>
    </section>
  </>
);

export const Reth = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Execution Clients: {clientName}' },
        { clientName: 'Reth' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={rethBg} />
        <RethDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://reth.rs">
            <FormattedMessage defaultMessage="Documentation for building, running and debugging Reth" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
