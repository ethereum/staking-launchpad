import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import gethBg from '../../../static/geth-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { PageTemplate } from '../../../components/PageTemplate';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { IS_HOLESKY } from '../../ConnectWallet/web3Utils';
import { ClientDiversityWarning } from '../../../components/ClientDiversityWarning';

import { IS_MAINNET } from '../../../utils/envVars';

// eslint-disable-next-line no-unused-vars
export const GethDetails = () => (
  <>
    <ClientDiversityWarning>
      <FormattedMessage defaultMessage="Currently Geth is used by >66% of the network." />
    </ClientDiversityWarning>
    <SectionTitle level={2} className="mb5">
      Geth
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="One of the three original implementations of the Ethereum protocol." />
    </Text>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Geth is written in Go, fully open source and licensed under the GNU LGPL v3." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text>
        <FormattedMessage defaultMessage="The Geth documentation explains how to download and install the client." />
      </Text>
      <Link
        primary
        to="https://geth.ethereum.org/docs/install-and-build/installing-geth"
        className="mt10"
      >
        <FormattedMessage defaultMessage="Geth installation documentation" />
      </Link>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Setup" />
      </SectionTitle>
      <Text className="mb20 mt10">
        <FormattedMessage defaultMessage="Make sure you do the following to get your execution client working properly." />
      </Text>
      {!IS_MAINNET && IS_HOLESKY && (
        <>
          <Heading level={3} className="mt20">
            <FormattedMessage defaultMessage="Testing on Holesky" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {testnet} to sync the Holesky testnet."
              values={{
                testnet: <Code className="mt20">--holesky</Code>,
              }}
            />
          </Text>
          <Link
            primary
            to="https://geth.ethereum.org/docs/interface/command-line-options"
          >
            <FormattedMessage defaultMessage="Geth on Holesky documentation" />
          </Link>
        </>
      )}
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="JSON RPC endpoint" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage
          defaultMessage="Use {http} to connect your consensus node to the JSON RPC
          endpoint. This will enable the JSON RPC services on the default 8545
          port."
          values={{
            http: <Code className="mt20">--http</Code>,
          }}
          description="{http} shows '--http' terminal command"
        />
      </Text>
      <Link
        primary
        to="https://geth.ethereum.org/docs/interface/command-line-options"
      >
        <FormattedMessage defaultMessage="--http documentation" />
      </Link>
    </section>
  </>
);

export const Geth = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Execution Clients: {clientName}' },
        { clientName: 'Geth' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={gethBg} />
        <GethDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://geth.ethereum.org/docs/">
            <FormattedMessage defaultMessage="Documentation on running Geth" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
