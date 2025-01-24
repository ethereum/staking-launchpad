import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import nethermindBg from '../../../static/nethermind-bg.png';
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
export const NethermindDetails = () => (
  <>
    <SectionTitle level={2} className="mb5">
      Nethermind
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="The Nethermind Ethereum execution client, built on .NET, delivers industry-leading performance in syncing and tip-of-chain processing. With its modular design and plugin system, it offers extensibility and features for new chains. As one of the most adopted execution clients on Ethereum, Nethermind plays a crucial role in enhancing the diversity and resilience of the Ethereum ecosystem." />
    </Text>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage defaultMessage="Nethermind is built in C# with flexible plugin architecture and licensed under the LGPL-3.0." />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Installation" />
      </SectionTitle>
      <Text>
        <FormattedMessage defaultMessage="The Nethermind documentation explains how to download and install the client." />
      </Text>
      <Link primary to="https://docs.nethermind.io/get-started/installing-nethermind" className="mt10">
        <FormattedMessage defaultMessage="Nethermind installation documentation" />
      </Link>
    </section>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Setup" />
      </SectionTitle>
      <Text className="mb20 mt10">
        <FormattedMessage defaultMessage="Check out the following guide to get your execution client working properly." />
      </Text>
      <Link
        primary
        className="mt20"
        to="https://docs.nethermind.io/get-started/running-node/"
      >
        Running a node with Nethermind
      </Link>
      <Heading level={3} className="mt20">
        <FormattedMessage defaultMessage="JSON-RPC endpoint" />
      </Heading>
      <Text className="mt10">
        <FormattedMessage
          defaultMessage="Check out the following guide to properly configure Engine JSON-RPC API for your consensus client."
        />
      </Text>
      <Link
        primary
        className="mt20"
        to="https://docs.nethermind.io/get-started/running-node/consensus-clients#configuring-json-rpc-interface"
      >
        <FormattedMessage defaultMessage="Configuring JSON-RPC interface" />
      </Link>
    </section>
  </>
);

export const Nethermind = () => {
  const { formatMessage } = useIntl();
  return (
    <PageTemplate
      title={formatMessage(
        { defaultMessage: 'Execution Clients: {clientName}' },
        { clientName: 'Nethermind' }
      )}
    >
      <ValidatorClientPageStyles>
        <Hero imgSrc={nethermindBg} />
        <NethermindDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://docs.nethermind.io">
            <FormattedMessage defaultMessage="Documentation on running Nethermind" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
