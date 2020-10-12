import React from 'react';
import { PageTemplate } from '../../../components/PageTemplate';
import tekuBg from '../../../static/teku-bg.png';
import {
  Hero,
  SectionTitle,
  ValidatorClientPageStyles,
} from '../ValidatorClientComponents';
import { Text } from '../../../components/Text';
import { Link } from '../../../components/Link';
import { Code } from '../../../components/Code';
import { Heading } from '../../../components/Heading';
import { TEKU_INSTALLATION_URL } from '../../../utils/envVars';

export const TekuDetails = ({ shortened }: { shortened?: boolean }) => (
  <>
    <Text className="mt10">
      <Link external to="https://pegasys.tech/teku/" primary inline>
        PegaSys Teku
      </Link>{' '}
      (formerly known as Artemis) is a Java-based Ethereum 2.0 client designed &
      built to meet institutional needs and security requirements. PegaSys is an
      arm of{' '}
      <Link external to="https://consensys.net/" primary inline>
        ConsenSys
      </Link>{' '}
      dedicated to building enterprise-ready clients and tools for interacting
      with the core Ethereum platform. Teku is Apache 2 licensed and written in
      Java, a language notable for its maturity & ubiquity.
    </Text>
    <Link
      external
      to="https://pegasys.tech/teku-ethereum-2-for-enterprise/"
      primary
      withArrow
      className="mt10"
    >
      Read more about PegaSys Teku
    </Link>{' '}
    <section>
      <SectionTitle level={2} className="mb5">
        Become a Validator with Teku
      </SectionTitle>
      <Link external primary to={TEKU_INSTALLATION_URL} withArrow>
        {TEKU_INSTALLATION_URL}
      </Link>
    </section>
    {!shortened && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            Key Management
          </SectionTitle>
          <Text>
            Teku needs to be pointed at files containing keystores & their
            associated passwords at startup. There are 3 methods for doing so:
          </Text>
          <Heading level={3} className="mt10 mb5">
            Command Line:
          </Heading>
          <Text>
            When launching Teku, keystores and passwords can be provided as{' '}
            <Code> {"<"}KEY_DIR{">"}:{"<"}PASS_DIR{">"}</Code>{' '}or{' '}
            <Code>{"<"}KEY_FILE_1{">"}:{"<"}PASS_FILE_1{">"},...,{"<"}KEY_FILE_N{">"}:{"<"}PASS_FILE_N{">"}</Code> of paths
            via the{' '}
            <Code className="px5 ml5">--validators-keys</Code> option.
          </Text>
          <Heading level={3} className="mt10 mb5">
            Environment Variables:
          </Heading>
          <Text>
            Teku will also load validators from keystores (and passwords) from
            the paths found in the{' '}
            <Code className="px5 ml5">TEKU_VALIDATORS_KEYS</Code>
            {' '}environment variable.
          </Text>
          <Heading level={3} className="mt10 mb5">
            Configuration File:
          </Heading>
          <Text>
            Teku can also be configured via a YAML file which is passed in via
            the <Code className="px5 ml5">--config-file</Code> CLI argument or
            <Code className="px5 ml5">TEKU_CONFIG_FILE</Code> environment
            variable. The syntax for YAML file is
            <Code className="px5 ml5">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              validators-keys: [{"<"}KEY_DIR{">"}:{"<"}PASS_DIR{">"}]
            </Code>{' '}
            or
            <Code className="px5 ml5">
              {/* eslint-disable-next-line react/no-unescaped-entities */}
              validators-keys: [{"<"}KEY_FILE_1{">"}:{"<"}PASS_FILE_1{">"},...,{"<"}KEY_FILE_N{">"}:{"<"}PASS_FILE_N{">"}]
            </Code>
            .
          </Text>
          <Heading level={4} className="mt10 mb5">
            Note:
          </Heading>
          <Text>
            <Code className="px5 ml5">
              {"<"}KEY_DIR{">"}:{"<"}PASS_DIR{">"}
            </Code>
            {' '}will find{' '}
            <Code className="px5 ml5">
              {"<"}KEY_DIR{">/**"}.json
            </Code>
            , and expect to find{' '}
            <Code className="px5 ml5">
              {"<"}PASS_DIR{">/**"}.txt
            </Code>
            .{' '}
            <Code className="px5 ml5">
              {"<"}KEY_FILE{">"}:{"<"}PASS_FILE{">"}
            </Code>
            {' '}will expect that the file{' '}
            <Code className="px5 ml5">
              {"<"}KEY_FILE{">"}
            </Code>
            {' '}exists, and the file containing the password for it is{' '}
            <Code className="px5 ml5">
              {"<"}PASS_FILE{">"}
            </Code>
            . The path separator is operating system dependent, and should be{' '}
            <Code className="px5 ml5">
            ;
            </Code>
            {' '}in Windows rather than{' '}
            <Code className="px5 ml5">
            :
            </Code>
            .
          </Text>
      </section>
        <section>
          <SectionTitle level={2} className="mb5">
            Troubleshooting
          </SectionTitle>
          <ul>
            <li>
              <Text>
                <Link
                  external
                  inline
                  to="https://docs.teku.pegasys.tech/en/latest/Reference/CLI/CLI-Syntax/#validators-key-password-files"
                >
                  Teku documentation on options and subcommands
                </Link>
              </Text>
            </li>
            <li>
              <Text>
                Check that the password files don’t have trailing new-lines
              </Text>
            </li>
          </ul>
        </section>
      </>
    )}
  </>
);

export const Teku = () => {
  return (
    <PageTemplate title="">
      <ValidatorClientPageStyles>
        <Hero
          imgSrc={tekuBg}
          style={{ objectPosition: '0 -110px', height: 300 }}
        />
        <TekuDetails />
        <section>
          <SectionTitle level={2} className="mb5">
            Documentation
          </SectionTitle>
          <Link
            primary
            external
            to="https://docs.teku.pegasys.tech/en/latest/"
            withArrow
          >
            Documentation on running Teku
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
