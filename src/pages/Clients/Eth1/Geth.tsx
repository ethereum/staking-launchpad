import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';

// eslint-disable-next-line no-unused-vars
export const GethDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Geth
    </SectionTitle>
    <Text className="mt10">
      One of the three original implementations of the Ethereum protocol.
    </Text>
    <SectionTitle level={2} className="mb5">
      Language information
    </SectionTitle>
    <Text className="mt10">
      Geth is written in Go, fully open source and licensed under the GNU LGPL
      v3.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installation
      </SectionTitle>
      <Text>
        The Geth documentation explains how to download and install the client.
      </Text>
      <Link
        primary
        external
        to="https://geth.ethereum.org/docs/install-and-build/installing-geth"
        className="mt10"
      >
        Geth installation documentation
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
          <Heading level={3} className="mt20">
            Testing on Goerli
          </Heading>
          <Code className="mt20">--goerli</Code>
          <Text className="mt10">
            Configures Geth to sync the Goerli testnet
          </Text>
          <Link
            primary
            external
            to="https://geth.ethereum.org/docs/interface/command-line-options"
          >
            Geth on Goerli documentation
          </Link>
        </>
      )}
      <Code className="mt20">--http</Code>
      <Text className="mt10">
        Makes sure your Eth2 node will be able to connect to the JSON RPC
        endpoint. This will enable the JSON RPC services on the default 8545
        port.
      </Text>
      <Link
        primary
        external
        to="https://geth.ethereum.org/docs/interface/command-line-options"
      >
        --http documentation
      </Link>
    </section>
  </>
);
