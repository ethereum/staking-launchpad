import React from 'react';
import styled from 'styled-components';
import { PageTemplate } from '../../components/PageTemplate';
import lighthouseBg from '../../static/lighthouse-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from './ValidatorClientComponents';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';

const CodeSnippet = styled.div`
  padding: 10px;
  font-family: Courier, sans-serif;
  font-size: 1em;
  line-height: 1.3;
  color: #fff;
  background-color: #597ea3;
  border-radius: 6px;
  margin: 10px 0;

  code {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const LighthouseDetails = () => (
  <>
    <Text className="mt10">
      <Link external to="https://github.com/sigp/lighthouse" primary inline>
        Lighthouse
      </Link>{' '}
      is an Eth2.0 client with a heavy focus on speed and security. The team
      behind it,{' '}
      <Link external to="https://sigmaprime.io/" primary inline>
        Sigma Prime
      </Link>
      , is an information security and software engineering firm who have funded
      Lighthouse along with the Ethereum Foundation, Consensys, and private
      individuals. Lighthouse is built in Rust and offered under an Apache 2.0
      License.
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
        Lighthouse has dedicated tooling to make the transfer from the Launchpad
        as easy as possible.
      </Text>

      <Text className="mt10">
        Specifically, when starting your lighthouse validator client, you can
        point it at the directory with your keystores and it will import your
        keystores and interactively ask for your password(s). If you do not
        supply a password, lighthouse will ask for it again every time it starts
        up.
      </Text>
      <CodeSnippet>
        lighthouse account validator import --directory
        eth2.0-deposit-cli/validator_keys
      </CodeSnippet>
      <Text className="mt10">
        Once the process is complete, you should see the following:
      </Text>
      <CodeSnippet>
        <code>Successfully moved keystore.</code>
        <code>Successfully updated validator_definitions.yml.</code>
        <code> </code>
        <code>Successfully imported 1 validators.</code>
      </CodeSnippet>

      <SectionTitle level={3} className="mb5">
        Running the validator client
      </SectionTitle>
      <Text className="mt10">
        Now that the keys are imported, all that is left to do (assuming your
        beacon node is already running) is to run the validator client with:
      </Text>
      <CodeSnippet>
        <code>lighthouse vc</code>
      </CodeSnippet>

      <SectionTitle level={2} className="mb5">
        Troubleshooting
      </SectionTitle>
      <Link
        primary
        external
        to="https://lighthouse-book.sigmaprime.io/validator-import-launchpad.html"
        withArrow
      >
        Documentation on importing from the Launchpad
      </Link>
    </section>
  </>
);

export const Lighthouse = () => {
  return (
    <PageTemplate title="">
      <ValidatorClientPageStyles>
        <Hero imgSrc={lighthouseBg} />
        <LighthouseDetails />
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
