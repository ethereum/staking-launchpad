import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';

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
          <Code className="px5 ml5">--config mainnet</Code>
          <Text className="mt10">
            Configures Nethermind to sync the Ethereum mainnet.
          </Text>
          <Link
            primary
            external
            to="https://nethermind.readthedocs.io/en/latest/networks.html#mainnet"
          >
            --config mainnet documentation
          </Link>
        </>
      )}
      {!IS_MAINNET && (
        <>
          <SectionTitle level={3} className="my20">
            Testing on Goerli
          </SectionTitle>
          <Code className="px5 ml5">--config goerli</Code>
          <Text className="mt10">
            Configures Nethermind to sync the Goerli testnet.
          </Text>

          <Link
            primary
            external
            to="https://nethermind.readthedocs.io/en/latest/networks.html#gorli-goerli"
          >
            Nethermind on Goerli documentation
          </Link>
        </>
      )}
      <Code className="px5 ml5">--JsonRpc.Enabled true</Code>
      <Text className="mt10">
        Makes sure your Eth2 node will be able to connect to the JSON RPC
        endpoint. This will enable the JSON RPC services on the default 8545
        port.
      </Text>
      <Link
        primary
        external
        to="https://nethermind.readthedocs.io/en/latest/configuration.html#jsonrpcconfig"
      >
        --JsonRpc.Enabled documentation
      </Link>
    </section>
  </>
);
