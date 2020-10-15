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
    <Text className="mt10">
      <Link external to="https://our.status.im/tag/nimbus/" primary inline>
        Nimbus
      </Link>{' '}
      is a research project and a client implementation for Ethereum 2.0
      designed to perform well on embedded systems and personal mobile devices,
      including older smartphones with resource-restricted hardware. The Nimbus
      team are from{' '}
      <Link external to="https://status.im/about/" primary inline>
        Status
      </Link>{' '}
      the company best known for{' '}
      <Link external to="https://status.im/" primary inline>
        their messaging app/wallet/Web3 browser
      </Link>{' '}
      by the same name. Nimbus (Apache 2) is written in Nim, a language with
      Python-like syntax that compiles to C.
      <Link
        external
        to="https://our.status.im/nimbus-for-newbies/"
        primary
        withArrow
        className="mt10"
      >
        Read more about Nimbus, and Status
      </Link>
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Become a Validator with Nimbus
      </SectionTitle>
      <Link external primary to={NIMBUS_INSTALLATION_URL} withArrow>
        {NIMBUS_INSTALLATION_URL}
      </Link>
    </section>

    {!shortened && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            Key Management
          </SectionTitle>
          <Text>
            Nimbus looks for keystores in the{' '}
            <Code>./build/data/[testnet_name]/validators</Code> folder with the
            assisted password in <Code>/build/data/[testnet_name]/secrets</Code>
            . If you do not supply a password, Nimbus will interactively ask for
            it on startup.
          </Text>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Troubleshooting
          </SectionTitle>
          <Text>
            If you do not have a <Code>./build/data/[testnet_name]/</Code>{' '}
            folder it is likely you have not built and run Nimbus correctly (run
            the make commands again).
          </Text>
          <Link
            external
            primary
            to="https://status-im.github.io/nimbus-eth2/zinken.html#key-management"
          >
            Nimbus documentation on key management
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
          <Link
            primary
            external
            to="https://status-im.github.io/nimbus-eth2/intro.html"
            withArrow
          >
            https://status-im.github.io/nimbus-eth2/intro.html
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
