import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';

// eslint-disable-next-line no-unused-vars
export const NethermindDetails = () => (
  <>
    <Text className="mt10">
      <Link external to="https://nethermind.io/" primary inline>
        Nethermind
      </Link>{' '}
      is an Ethereum client built on .NET Core, perfect for enterprise-grade
      systems and benefiting from a huge pool of developers. Extend it,
      customise it - the sky’s the limit.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installing Nethermind
      </SectionTitle>
      <Text>
        The
        <Link
          primary
          external
          to="https://nethermind.readthedocs.io/en/latest/download.html"
          inline
        >
          {' '}
          Nethermind documentation
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
          {IS_MAINNET && (
            <>
              <li>
                Nethermind must be configured to sync the Ethereum mainnet which
                can be done with the{' '}
                <Code className="px5 ml5">--config mainnet</Code> parameter.
                <Link
                  primary
                  external
                  to="https://nethermind.readthedocs.io/en/latest/networks.html#mainnet"
                  withArrow
                  inline
                >
                  {' '}
                  Documentation
                </Link>
              </li>
            </>
          )}
          {!IS_MAINNET && (
            <>
              <li>
                Nethermind must be configured to sync the Goerli testnet which
                can be done with the{' '}
                <Code className="px5 ml5">--config goerli</Code> parameter.
                <Link
                  primary
                  external
                  to="https://nethermind.readthedocs.io/en/latest/networks.html#gorli-goerli"
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
            The JSON RPC endpoint for the Eth2 node to connect to must be
            enabled with <Code className="px5 ml5">--JsonRpc.Enabled true</Code>
            . This will enable the JSON RPC service on the default port of 8545.
            <Link
              primary
              external
              to="https://nethermind.readthedocs.io/en/latest/configuration.html#jsonrpcconfig"
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
