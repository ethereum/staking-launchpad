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
import styled from 'styled-components';

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
          <CodeSnippet>
            <pre>
              <code>.lighthouse</code>
              <code>|-- beacon</code>
              <code>| ...</code>
              <code>|-- secrets</code>
              <code>
                |{'   '}|--
                0xa9e96563c1ab22dc9d1d05d87305b5997418178cfc72af77ccb689be7ca5c1f3d29499c2adb37f6feb34b67e9f7523f7
              </code>
              <code>
                |{'   '}|--
                0x822e877e5e326408842b49ca8b2527f5042a5814df036f88c97a533964203d101656634bbd80bf162c179d78bc55a60b
              </code>
              <code>
                |{'   '}|--
                0x85d44bc728214797a466d1bbd0a833bddf33d139a7fcc179e97518ea8e519cc6bd7fa8f13ec524afbb04c1b1fc8af880
              </code>
              <code>
                |{'   '}|--
                0x8d2d82b28d1bb6f5d44ff6f3d54fc473deebbd9f82cc1bec8ddb9f864c085bf67e7a24b990dccf23fb01c44b6e13b1a5
              </code>
              <code>|-- validators</code>
              <code>{'    '}|-- keystore-0</code>
              <code>{'        '}|-- voting-keystore.json</code>
              <code>{'    '}|-- keystore-1</code>
              <code>{'        '}|-- voting-keystore.json</code>
              <code>{'    '}|-- keystore-2</code>
              <code>{'        '}|-- voting-keystore.json</code>
              <code>{'    '}|-- keystore-3</code>
              <code>{'        '}|-- voting-keystore.json</code>
            </pre>
          </CodeSnippet>
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
