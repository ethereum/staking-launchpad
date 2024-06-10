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
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { IS_GOERLI } from '../../ConnectWallet/web3Utils';
import { IS_MAINNET } from '../../../utils/envVars';

// eslint-disable-next-line no-unused-vars
export const RethDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Reth
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="An Ethereum client with a huge pool of developers. It's perfect for enterprise-grade systems." />
    </Text>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Reth is built on .NET Core. Extend it, customise it - the sky’s the limit.." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text>
        <FormattedMessage defaultMessage="The Reth documentation explains how to download and install the client." />
      </Text>
      <Link primary to="https://downloads.nethermind.io/" className="mt10">
        <FormattedMessage defaultMessage="Reth installation documentation" />
      </Link>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Setup" />
      </SectionTitle>
      <Text className="mb20 mt10">
        <FormattedMessage defaultMessage="Make sure you do the following to get your execution client working properly." />
      </Text>
      {IS_MAINNET && (
        <>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {mainnet} to sync the Ethereum mainnet."
              values={{
                mainnet: <Code className="mt20">--config mainnet</Code>,
              }}
              description="{mainnet} shows '--config mainnet' terminal command"
            />
          </Text>
          <Link
            primary
            className="mt20"
            to="https://docs.nethermind.io/nethermind/ethereum-client/networks#mainnet"
          >
            --config mainnet documentation
          </Link>
        </>
      )}
      {!IS_MAINNET && IS_GOERLI && (
        <>
          <Heading level={3} className="mt20">
            <FormattedMessage defaultMessage="Testing on Goerli" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {goerli} to sync the Goerli testnet."
              values={{
                goerli: <Code className="mt20">--config goerli</Code>,
              }}
              description="{goerli} shows '--config goerli' terminal command"
            />
          </Text>
          <Link
            primary
            className="mt20"
            to="https://docs.nethermind.io/nethermind/ethereum-client/networks#goerli-goerli"
          >
            <FormattedMessage
              defaultMessage="Reth on Goerli documentation"
              description="Links to the documentation for the execution client Reth, specifically for testnet Goerli"
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
            http: <Code className="mt20">--JsonRpc.Enabled true</Code>,
          }}
          description="{http} shows '--JsonRpc.Enabled true' terminal command"
        />
      </Text>
      <Link
        primary
        className="mt20"
        to="https://docs.nethermind.io/nethermind/ethereum-client/json-rpc"
      >
        <FormattedMessage defaultMessage="--JsonRpc.Enabled documentation" />
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
        <Hero imgSrc={nethermindBg} />
        <RethDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://docs.nethermind.io/nethermind/">
            <FormattedMessage defaultMessage="Documentation on running Reth" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
