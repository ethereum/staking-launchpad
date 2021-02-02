import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';

// eslint-disable-next-line no-unused-vars
export const OpenEthereumDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      OpenEthereum
    </SectionTitle>
    <Text className="mt10">
      Formerly Parity, OpenEthereum is designed to be “the fastest, lightest,
      and most secure Ethereum client”.
    </Text>
    <SectionTitle level={2} className="mb5">
      Language information
    </SectionTitle>
    <Text className="mt10">
      OpenEthereum is written in Rust and licensed under the GPLv3.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installation
      </SectionTitle>
      <Text>
        The OpenEthereum documentation explains how to download and install the
        client.
      </Text>
      <Link primary external to="https://openethereum.github.io/Setup">
        OpenEthereum installation documentation
      </Link>
    </section>
    {!IS_MAINNET && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            Setup
          </SectionTitle>
          <Text className="mb20 mt10">
            Make sure you do the following to get your Eth1 client working
            properly.
          </Text>
          <SectionTitle level={3} className="my20">
            Testing on Goerli
          </SectionTitle>
          <Code className="px5 ml5">---chain goerli</Code>
          <Text>Configures OpenEthereum to sync the Goerli testnet.</Text>
          <Link primary external to="https://openethereum.github.io/">
            {' '}
            OpenEthereum documentation
          </Link>
        </section>
      </>
    )}
  </>
);
