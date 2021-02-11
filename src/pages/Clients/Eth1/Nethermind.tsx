import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line no-unused-vars
export const NethermindDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Nethermind
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="An Ethereum client with a huge pool of developers. It's perfect for enterprise-grade systems." />
    </Text>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Nethermind is built on .NET Core. Extend it, customise it - the sky’s the limit.." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text>
        <FormattedMessage defaultMessage="The Nethermind documentation explains how to download and install the client." />
      </Text>
      <Link primary to="https://downloads.nethermind.io/" className="mt10">
        <FormattedMessage defaultMessage="Nethermind installation documentation" />
      </Link>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Setup" />
      </SectionTitle>
      <Text className="mb20 mt10">
        <FormattedMessage defaultMessage="Make sure you do the following to get your Eth1 client working properly." />
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
      {!IS_MAINNET && (
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
              defaultMessage="Nethermind on Goerli documentation"
              description="Links to the documentation for the eth1 client Nethermind, specifically for testnet Goerli"
            />
          </Link>
        </>
      )}
      <Text className="mt10">
        <FormattedMessage
          defaultMessage="Use {http} to connect your Eth2 node to the JSON RPC
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
