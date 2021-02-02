import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';

// eslint-disable-next-line no-unused-vars
export const BesuDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Hyperledger Besu
    </SectionTitle>
    <Text className="mt10">
      An Ethereum client designed to be enterprise-friendly for both public and
      private, permissioned network use cases.
    </Text>
    <SectionTitle level={2} className="mb5">
      Language information
    </SectionTitle>
    <Text className="mt10">
      Besu is written in Java and released under the Apache 2.0 Licence.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installation
      </SectionTitle>
      <Text className="mt10">
        The Besu documentation explains how to download and install the client.
      </Text>
      <Link
        className="mt10"
        primary
        external
        to="https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/"
      >
        Besu installation documentation
      </Link>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        Setup
      </SectionTitle>
      <Text className="mb20 mt10">
        Make sure you do the following to get your Eth1 client working properly.
      </Text>
      {!IS_MAINNET && (
        <>
          <SectionTitle level={3} className="my20">
            Testing on Goerli
          </SectionTitle>
          <Code className="px5 ml5">--network=goerli</Code>
          <Text className="mt10">
            Configures Besu to sync the Goerli testnet.
          </Text>
          <Link
            primary
            external
            to="https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet"
          >
            {' '}
            Besu on Goerli documentation
          </Link>
        </>
      )}
      <Code className="px5 ml5">-rpc-http-enabled</Code>
      <Text className="mt10">
        Makes sure your Eth2 node will be able to connect to the JSON RPC
        endpoint. This will enable the JSON RPC services on the default 8545
        port.
      </Text>
      <Link
        primary
        external
        to="https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/#rpc-http-enabled"
      >
        rpc-http-enabled documentation
      </Link>
    </section>
  </>
);
