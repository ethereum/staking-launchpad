import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';

// eslint-disable-next-line no-unused-vars
export const OpenEthereumDetails = () => (
  <>
    <Text className="mt10">
      <Link external to="https://www.parity.io/ethereum/" primary inline>
        OpenEthereum
      </Link>{' '}
      (used to be called Parity) is written in Rust and licensed under the
      GPLv3. The design goals are to be “the fastest, lightest, and most secure
      Ethereum client”.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Installing OpenEthereum
      </SectionTitle>
      <Text>
        The
        <Link
          primary
          external
          to="https://openethereum.github.io/wiki/Setup"
          inline
        >
          {' '}
          OpenEthereum documentation
        </Link>{' '}
        explains how to download and install the client.
      </Text>
    </section>
    {!IS_MAINNET && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            Setup
          </SectionTitle>
          <Text>
            When starting up the client, there are a few important options to
            configure:
            <ul>
              <li>
                OpenEthereum must be configured to sync the Goerli testnet which
                can be done with the{' '}
                <Code className="px5 ml5">---chain goerli</Code> parameter.
                <Link
                  primary
                  external
                  to="https://openethereum.github.io/wiki/Basic-Usage.html#networking"
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
    )}
  </>
);
