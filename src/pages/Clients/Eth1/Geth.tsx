import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line no-unused-vars
export const GethDetails = () => (
  <>
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
        to="https://docs.lukso.tech/networks/l15-testnet"
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
        <FormattedMessage defaultMessage="Make sure you do the following to get your Eth1 client working properly." />
      </Text>
      {!IS_MAINNET && (
        <>
          <Heading level={3} className="mt20">
            <FormattedMessage defaultMessage="Testing on L15" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use LYXt to sync the L15 testnet."
              values={{
                goerli: <Code className="mt20">--goerli</Code>,
              }}
            />
          </Text>
          <Link
            primary
            to="https://geth.ethereum.org/docs/interface/command-line-options"
          >
            <FormattedMessage defaultMessage="Geth on L15 documentation" />
          </Link>
        </>
      )}
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="JSON RPC endpoint" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage
          defaultMessage="Use {http} to connect your Eth2 node to the JSON RPC
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
