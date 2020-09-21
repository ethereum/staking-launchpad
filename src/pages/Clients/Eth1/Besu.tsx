import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';

// eslint-disable-next-line no-unused-vars
export const BesuDetails = () => (
  <>
    <Text className="mt10">
      <Link external to="https://www.hyperledger.org/use/besu" primary inline>
        Hyperledger Besu
      </Link>{' '}
      is an Ethereum client designed to be enterprise-friendly for both public
      and private permissioned network use cases. Besu is written in Java and
      released under the Apache 2.0 Licence.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installing Besu
      </SectionTitle>
      <Text>
        The
        <Link
          primary
          external
          to="https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Install-Binaries/"
          inline
        >
          {' '}
          Besu documentation
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
                Besu must be configured to sync the Goerli testnet which can be
                done with the <Code className="px5 ml5">--network=goerli</Code>{' '}
                flag.
                <Link
                  primary
                  external
                  to="https://besu.hyperledger.org/en/stable/HowTo/Get-Started/Starting-node/#run-a-node-on-goerli-testnet"
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
            enabled with <Code className="px5 ml5">-rpc-http-enabled</Code>.
            This will enable the JSON RPC service on the default port of 8545.
            <Link
              primary
              external
              to="hhttps://besu.hyperledger.org/en/stable/Reference/CLI/CLI-Syntax/#rpc-http-enabled"
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
