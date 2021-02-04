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

export const NimbusDetails = ({ shortened }: { shortened?: boolean }) => (
  <>
    <SectionTitle level={2} className="mb5">
      Nimbus
    </SectionTitle>
    <Text className="mt10">
      A research project and a client implementation for Eth2 designed to
      perform well on embedded systems and personal mobile devices, including
      older smartphones with resource-restricted hardware. The Nimbus team are
      from Status, a company best known for their messaging app/wallet/Web3
      browser.
    </Text>
    <Link
      to="https://our.status.im/nimbus-for-newbies/"
      primary
      className="mt10"
    >
      More on Nimbus
    </Link>
    <Link to="https://status.im/" primary className="mt10">
      More on Status
    </Link>
    <SectionTitle level={2} className="mb5">
      Language information
    </SectionTitle>
    <Text className="mt10">
      Nimbus (Apache 2) is written in Nim, a language with Python-like syntax
      that compiles to C.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Become a validator with Nimbus
      </SectionTitle>
      <Link primary to={NIMBUS_INSTALLATION_URL}>
        Nimbus installation documentation
      </Link>
    </section>

    {!shortened && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            Key management
          </SectionTitle>
          <Text className="mt10">
            Nimbus looks for keystores in your validators folder.
          </Text>
          <Code className="my20">./build/data/[testnet_name]/validators</Code>
          <Text className="mt10">
            {' '}
            It uses the assisted password in your secrets folder.
          </Text>
          <Code className="my20">/build/data/[testnet_name]/secrets</Code>
          <Text className="mt10">
            If you do not supply a password, Nimbus will interactively ask for
            it on startup.
          </Text>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Troubleshooting
          </SectionTitle>
          <Text className="mt10">
            If you do not have a testnet folder it is likely you have not built
            and run Nimbus correctly. Run the make commands again.
          </Text>
          <Code className="my20">./build/data/[testnet_name]/</Code>
          <Link
            primary
            to="https://status-im.github.io/nimbus-eth2/zinken.html#key-management"
          >
            Nimbus key management documentation
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
            Documentation
          </SectionTitle>
          <Link primary to="https://status-im.github.io/nimbus-eth2/intro.html">
            Nimbus documentation
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
