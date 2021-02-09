import React from 'react';
import { PageTemplate } from '../../../components/PageTemplate';
import nimbusBg from '../../../static/nimbus-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { NIMBUS_INSTALLATION_URL } from '../../../utils/envVars';
import { FormattedMessage } from 'react-intl';

export const NimbusDetails = ({ shortened }: { shortened?: boolean }) => (
  <>
    <SectionTitle level={2} className="mb5">
      Nimbus
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="A research project and a client implementation for Eth2 designed to
          perform well on embedded systems and personal mobile devices, including
          older smartphones with resource-restricted hardware. The Nimbus team are
          from Status, a company best known for their messaging app/wallet/Web3
          browser."
      />
    </Text>
    <Link
      to="https://our.status.im/nimbus-for-newbies/"
      primary
      className="mt10"
    >
      <FormattedMessage defaultMessage="More on Nimbus" />
    </Link>
    <Link to="https://status.im/" primary className="mt10">
      <FormattedMessage defaultMessage="More on Status" />
    </Link>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="Nimbus (Apache 2) is writtenin Nim, a language with
          Python-like syntax that compiles to C."
      />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Become a validator with Nimbus" />
      </SectionTitle>
      <Link primary to={NIMBUS_INSTALLATION_URL}>
        <FormattedMessage defaultMessage="Nimbus installation documentation" />
      </Link>
    </section>

    {!shortened && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Key management" />
          </SectionTitle>
          <Text className="mt10">
            <FormattedMessage defaultMessage="Nimbus looks for keystores in your validators folder." />
          </Text>
          <Code className="my20">./build/data/[testnet_name]/validators</Code>
          <Text className="mt10">
            <FormattedMessage defaultMessage="It uses the assisted password in your secrets folder." />
          </Text>
          <Code className="my20">/build/data/[testnet_name]/secrets</Code>
          <Text className="mt10">
            <FormattedMessage defaultMessage="If you do not supply a password, Nimbus will interactively ask for it on startup." />
          </Text>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Troubleshooting" />
          </SectionTitle>
          <Text className="mt10">
            <FormattedMessage
              defaultMessage="If you do not have a testnet folder it is likely you have not built and run Nimbus
                correctly. Run the make commands again."
            />
          </Text>
          <Code className="my20">./build/data/[testnet_name]/</Code>
          <Link primary to="https://nimbus.guide/keys.html">
            <FormattedMessage defaultMessage="Nimbus key management documentation" />
          </Link>
        </section>
      </>
    )}
  </>
);

export const Nimbus = () => {
  return (
    <PageTemplate title="">
      <ValidatorClientPageStyles>
        <Hero imgSrc={nimbusBg} />
        <NimbusDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link primary to="https://status-im.github.io/nimbus-eth2/intro.html">
            <FormattedMessage defaultMessage="Nimbus documentation" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
