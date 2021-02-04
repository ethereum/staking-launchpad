import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { FormattedMessage } from 'react-intl';

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
          <Heading level={3} className="mt20">
            Testing on Goerli
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {goerli} to sync the Goerli testnet."
              values={{
                goerli: <Code className="mt20">--network=goerli</Code>,
              }}
            />
          </Text>
          <Link
            primary
            to="https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet"
            className="mt20"
          >
            {' '}
            Besu on Goerli documentation
          </Link>
        </>
      )}
      <Text className="mt10">
        <FormattedMessage
          defaultMessage="Use {http} to connect your Eth2 node to the JSON RPC
          endpoint. This will enable the JSON RPC services on the default 8545
          port."
          values={{
            http: <Code className="mt20">-rpc-http-enabled</Code>,
          }}
        />
      </Text>
      <Link
        primary
        to="https://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/#rpc-http-enabled"
        className="mt20"
      >
        rpc-http-enabled documentation
      </Link>
    </section>
  </>
);
