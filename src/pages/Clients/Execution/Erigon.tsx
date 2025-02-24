import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import erigonBg from '../../../static/geth-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { PageTemplate } from '../../../components/PageTemplate';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { IS_HOLESKY } from '../../ConnectWallet/web3Utils';
import { IS_MAINNET } from '../../../utils/envVars';

// eslint-disable-next-line no-unused-vars
export const ErigonDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Erigon
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Formerly TurboGeth, Erigon is an Ethereum client built to enable performance optimizations." />
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
      <Link
        primary
        to="https://github.com/ledgerwatch/erigon#beacon-chain"
        className="mt10"
      >
        <FormattedMessage defaultMessage="Erigon installation documentation" />
      </Link>
    </section>
    {!IS_MAINNET && IS_HOLESKY && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Setup" />
          </SectionTitle>
          <Text className="mb20 mt10">
            <FormattedMessage defaultMessage="Make sure you do the following to get your execution client working properly." />
          </Text>
          <Heading level={3} className="mt20">
            <FormattedMessage defaultMessage="Testing on Holesky" />
          </Heading>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="Use {testnet} to sync the Holesky testnet."
              values={{
                testnet: <Code className="mt20">--chain holesky</Code>,
              }}
              description="{testnet} shows '--chain holesky' terminal command"
            />
          </Text>
          <Link
            className="mt20"
            primary
            to="https://github.com/ledgerwatch/erigon/blob/devel/README.md"
          >
            <FormattedMessage defaultMessage="Erigon documentation" />
          </Link>
        </section>
      </>
    )}
  </>
);

export const Erigon = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Execution Clients: {clientName}' },
        { clientName: 'Erigon' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={erigonBg} />
        <ErigonDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://github.com/ledgerwatch/erigon">
            <FormattedMessage defaultMessage="Documentation on running Erigon" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
