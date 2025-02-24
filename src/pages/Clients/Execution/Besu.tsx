import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import besuBg from '../../../static/besu-bg.png';
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
import { IS_MAINNET } from '../../../utils/envVars';

// eslint-disable-next-line no-unused-vars
export const BesuDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Hyperledger Besu
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="An Ethereum client designed to be enterprise-friendly for
          both public and private, permissioned network use cases."
      />
    </Text>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Besu is written in Java and released under the Apache 2.0 Licence." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text className="mt10">
        <FormattedMessage defaultMessage="The Besu documentation explains how to download and install the client." />
      </Text>
      <Link
        className="mt10"
        primary
        to="https://besu.hyperledger.org/public-networks/get-started/install"
      >
        <FormattedMessage defaultMessage="Besu installation documentation" />
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
                testnet: <Code className="mt20">--network=holesky</Code>,
              }}
              description="{testnet} shows '--network=holesky' terminal command"
            />
          </Text>
          <Link
            primary
            to="https://besu.hyperledger.org/public-networks/get-started/connect/testnet"
            className="mt20"
          >
            <FormattedMessage
              defaultMessage="Besu on Holesky documentation"
              description="Link to documentation about execution client Besu, specifically for Holesky testnet"
            />
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
            http: <Code className="mt20">-rpc-http-enabled</Code>,
          }}
          description="{http} shows '-rpc-http-enabled' terminal command"
        />
      </Text>
      <Link
        primary
        to="https://besu.hyperledger.org/public-networks/reference/cli/options#rpc-http-enabled"
        className="mt20"
      >
        <FormattedMessage defaultMessage="rpc-http-enabled documentation" />
      </Link>
    </section>
  </>
);

export const Besu = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Execution Clients: {clientName}' },
        { clientName: 'Besu' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={besuBg} />
        <BesuDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://besu.hyperledger.org/">
            <FormattedMessage defaultMessage="Documentation on running Besu" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
