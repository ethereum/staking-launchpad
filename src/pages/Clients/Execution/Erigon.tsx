import React from 'react';
import { SectionTitle } from '../ValidatorClientComponents';
import { IS_MAINNET } from '../../../utils/envVars';
import { Text } from '../../../components/Text';
import { Heading } from '../../../components/Heading';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { FormattedMessage } from 'react-intl';

// eslint-disable-next-line no-unused-vars
export const ErigonDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Erigon
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="Formerly TurboGeth, Erigon is an Ethereum client built to enable performance optimisations."
      />
    </Text>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Erigon is written in Go and licensed under the GNU LGPLv3." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text>
        <FormattedMessage
          defaultMessage="The Erigon documentation explains how to download and
            install the client."
        />
      </Text>
      <Link primary to="https://github.com/ledgerwatch/erigon#beacon-chain" className="mt10">
        <FormattedMessage defaultMessage="Erigon installation documentation" />
      </Link>
    </section>
    {!IS_MAINNET && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Setup" />
          </SectionTitle>
          <Text className="mb20 mt10">
            <FormattedMessage defaultMessage="Make sure you do the following to get your execution client working properly." />
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
          <Link className="mt20" primary to="https://github.com/ledgerwatch/erigon/blob/devel/README.md">
            <FormattedMessage defaultMessage="Erigon documentation" />
          </Link>
        </section>
      </>
    )}
  </>
);
