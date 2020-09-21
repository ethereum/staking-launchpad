import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';

// eslint-disable-next-line no-unused-vars
export const GethDetails = () => (
  <>
    <Text className="mt10">
      <Link external to="https://geth.ethereum.org/" primary inline>
        Geth
      </Link>{' '}
      is one of the three original implementations of the Ethereum protocol. It
      is written in Go, fully open source and licensed under the GNU LGPL v3.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installing Geth
      </SectionTitle>
      <Text>
        The
        <Link
          primary
          external
          to="https://geth.ethereum.org/docs/install-and-build/installing-geth"
          inline
        >
          {' '}
          Geth documentation
        </Link>{' '}
        explains how to download and install the client.
      </Text>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        Setup
      </SectionTitle>
      <Text>
        When starting up the client, there are a few important options to
        configure:
        <ul>
          {!IS_MAINNET && (
            <>
              <li>
                Geth must be configured to sync the Goerli testnet which can be
                done with the <Code className="px5 ml5">--goerli</Code> flag.
                <Link
                  primary
                  external
                  to="https://geth.ethereum.org/docs/interface/command-line-options"
                  withArrow
                  inline
                >
                  {' '}
                  Documentation
                </Link>
              </li>
            </>
          )}
          <li>
            The JSON RPC endpoint for the eth2 node to connect to must be
            enabled with <Code className="px5 ml5">--http</Code>. This will
            enable the JSON RPC service on the default port of 8545.
            <Link
              primary
              external
              to="https://geth.ethereum.org/docs/interface/command-line-options"
              withArrow
              inline
            >
              {' '}
              Documentation
            </Link>
          </li>
        </ul>
      </Text>
    </section>
  </>
);
