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
      An Ethereum client with a huge pool of developers. It's perfect for
      enterprise-grade systems.
    </Text>
    <SectionTitle level={2} className="mb5">
      Language information
    </SectionTitle>
    <Text className="mt10">
      Nethermind is built on .NET Core. Extend it, customise it - the sky’s the
      limit..
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installation
      </SectionTitle>
      <Text>
        The Nethermind documentation explains how to download and install the
        client.
      </Text>
      <Link
        primary
        external
        to="https://nethermind.readthedocs.io/en/latest/download.html"
        className="mt10"
      >
        Nethermind installation documentation
      </Link>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        Setup
      </SectionTitle>
      <Text className="mb20 mt10">
        Make sure you do the following to get your Eth1 client working properly.
      </Text>
      {IS_MAINNET && (
        <>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {mainnet} to sync the Ethereum mainnet."
              values={{
                mainnet: <Code className="mt20">--config mainnet</Code>,
              }}
            />
          </Text>
          <Link
            primary
            external
            className="mt20"
            to="https://nethermind.readthedocs.io/en/latest/networks.html#mainnet"
          >
            --config mainnet documentation
          </Link>
        </>
      )}
      {!IS_MAINNET && (
        <>
          <Heading level={3} className="mt20">
            Testing on Goerli
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {goerli} to sync the Goerli testnet."
              values={{
                goerli: <Code className="mt20">--config goerli</Code>,
              }}
            />
          </Text>
          <Link
            primary
            external
            className="mt20"
            to="https://nethermind.readthedocs.io/en/latest/networks.html#gorli-goerli"
          >
            Nethermind on Goerli documentation
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
        />
      </Text>
      <Link
        primary
        external
        className="mt20"
        to="https://nethermind.readthedocs.io/en/latest/configuration.html#jsonrpcconfig"
      >
        --JsonRpc.Enabled documentation
      </Link>
    </section>
  </>
);
