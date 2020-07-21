import React from 'react';
import { PageTemplate } from '../../components/PageTemplate';
import lighthouseBg from '../../static/lighthouse-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from './ValidatorClientComponents';
import { Code } from '../../components/Code';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';

export const Lighthouse = () => {
  return (
    <PageTemplate title="">
      <ValidatorClientPageStyles>
        <Hero imgSrc={lighthouseBg} />
        <Text className="mt10">
          <Link external to="https://github.com/sigp/lighthouse" primary inline>
            Lighthouse
          </Link>{' '}
          is an Eth2.0 client with a heavy focus on speed and security. The team
          behind it,{' '}
          <Link external to="https://sigmaprime.io/" primary inline>
            Sigma Prime
          </Link>
          , is an information security and software engineering firm who have
          funded Lighthouse along with the Ethereum Foundation, Consensys, and
          private individuals. Lighthouse is built in Rust and offered under an
          Apache 2.0 License.
          <Link
            external
            to="https://lighthouse.sigmaprime.io/update-00.html"
            primary
            withArrow
            className="mt10"
          >
            Read more about Lighthouse and Sigma Prime
          </Link>
        </Text>
        <section>
          <SectionTitle level={2} className="mb5">
            Installation
          </SectionTitle>
          <Link
            external
            primary
            to="https://lighthouse-book.sigmaprime.io/installation.html"
          >
            https://lighthouse-book.sigmaprime.io/installation.html
          </Link>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Key Management
          </SectionTitle>

          <Text className="mt10">
            Lighthouse requires that your validator keystores & passwords are
            named precisely and are availible at the correct location.
          </Text>

          <Text className="mt10">
            Specifically, your keystores each need to be in their own folder in
            <Code className="mx5">~/.lighthouse/validators/</Code> the folders
            can be called whatever name you desire, provided it is unique.
            Inside each folder, the keystore must be renamed to{' '}
            <Code className="mx5">voting_keystore.json.</Code>
          </Text>

          <Text className="mt10">
            Each keystore also requires its own password. The passwords are
            files contained <Code className="mx5">.lighthouse/secrets/</Code>{' '}
            and each validator needs its own password file. The files themselves
            must be named <Code className="mx5">[public_key] .pass</Code>
            corresponding to the public keys of each of your validators.
          </Text>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Troubleshooting
          </SectionTitle>
          <Text>The file structure should look as follows (example):</Text>

          <ul>
            <li>
              <Text>
                Ensure the keystores are all called{' '}
                <Code className="px5">voting_keystore.json</Code>
              </Text>
            </li>
            <li>
              <Text>
                Verify that the name of the password files matches the validator
                public keys
              </Text>
            </li>
            <li>
              <Text>
                Check that the password files don’t have trailing new-lines
              </Text>
            </li>
            <li>
              <Text>
                Read the messages when starting the validator, they are very
                informative for debugging this
              </Text>
            </li>
          </ul>
          <Link
            primary
            external
            to="https://lighthouse-book.sigmaprime.io/validator-create.html"
            withArrow
          >
            More key management info
          </Link>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Documentation
          </SectionTitle>
          <Link
            primary
            external
            to="https://lighthouse-book.sigmaprime.io/"
            withArrow
          >
            Documentation on running Lighthouse
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
