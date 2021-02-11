import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Heading } from '../../../components/Heading';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line no-unused-vars
export const OpenEthereumDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      OpenEthereum
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="Formerly Parity, OpenEthereum is designed to be “the fastest,
          lightest, and most secure Ethereum client”."
      />
    </Text>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="OpenEthereum is written in Rust and licensed under the GPLv3." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text>
        <FormattedMessage
          defaultMessage="The OpenEthereum documentation explains how to download and
            install the client."
        />
      </Text>
      <Link primary to="https://openethereum.github.io/Setup" className="mt10">
        <FormattedMessage defaultMessage="OpenEthereum installation documentation" />
      </Link>
    </section>
    {!IS_MAINNET && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Setup" />
          </SectionTitle>
          <Text className="mb20 mt10">
            <FormattedMessage defaultMessage="Make sure you do the following to get your Eth1 client working properly." />
          </Text>
          <Heading level={3} className="mt20">
            <FormattedMessage defaultMessage="Testing on Goerli" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {goerli} to sync the Goerli testnet."
              values={{
                goerli: <Code className="mt20">--chain goerli</Code>,
              }}
              description="{goerli} shows '--chain goerli' terminal command"
            />
          </Text>
          <Link className="mt20" primary to="https://openethereum.github.io/">
            <FormattedMessage defaultMessage="OpenEthereum documentation" />
          </Link>
        </section>
      </>
    )}
  </>
);
