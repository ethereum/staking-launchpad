import React from 'react';
import { FormattedMessage } from 'react-intl';
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
    <SectionTitle level={2} className="mb5">
      Teku
    </SectionTitle>
    <Text className="mt10">
      Formerly known as Artemis, Teku is an Eth2 client built to meet
      institutional needs and security requirements. PegaSys is an arm of
      ConsenSys, dedicated to building enterprise-ready clients and tools for
      interacting with the core Ethereum platform.
    </Text>
    <Link
      external
      to="https://pegasys.tech/teku-ethereum-2-for-enterprise/"
      primary
      className="mt10"
    >
      More on PegaSys Teku
    </Link>{' '}
    <Link external to="https://consensys.net/" primary className="mt10">
      More on ConsenSys
    </Link>
    <SectionTitle level={2} className="mb5">
      Language information
    </SectionTitle>
    <Text className="mt10">
      Teku is Apache 2 licensed and written in Java, a language notable for its
      maturity and ubiquity.
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        Become a validator with Teku
      </SectionTitle>
      <Link external primary to={TEKU_INSTALLATION_URL}>
        Teku installation documentation
      </Link>
    </section>
    {!shortened && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            Key management
          </SectionTitle>
          <Text>
            Teku needs to be pointed at files containing keystores and their
            associated passwords at startup. There are 3 methods for doing so.
          </Text>
          <Heading level={3} className="mt20 mb5">
            Command Line
          </Heading>
          <Text>
            When launching Teku, keystores and passwords can be provided in
            different ways.
            <ul>
              <li>
                <Code>
                  {'<'}KEY_DIR{'>'}:{'<'}PASS_DIR{'>'}
                </Code>
              </li>
              <li>
                <Code>
                  {'<'}KEY_FILE_1{'>'}:{'<'}PASS_FILE_1{'>'},...,{'<'}KEY_FILE_N
                  {'>'}:{'<'}PASS_FILE_N{'>'}
                </Code>{' '}
              </li>
            </ul>
            of paths via the <Code className="px5 ml5">--validators-keys</Code>{' '}
            option.
          </Text>
          <Heading level={3} className="mt20 mb5">
            Environment variables
          </Heading>
          <Text>
            Teku will also load validators from keystores (and passwords) from
            the paths found in the validator keys environment variable.
          </Text>
          <Code className="px5 ml5">TEKU_VALIDATORS_KEYS</Code>
          <Heading level={3} className="mt20 mb5">
            Configuration file
          </Heading>
          <Text>
            Teku can also be configured via a YAML file which is passed in via a
            few different ways.
          </Text>
          <ul>
            <li>
              <Text>The config file CLI argument</Text>
            </li>
            <ul>
              <li>
                <Code className="px5 ml5">--config-file</Code>
              </li>
            </ul>
            <li>
              <Text>The Teku config file environment variable</Text>
            </li>
            <ul>
              <li>
                <Code className="px5 ml5">TEKU_CONFIG_FILE</Code>
              </li>
            </ul>
          </ul>
          <Text>The YAML files can have different syntaxes.</Text>
          <ul>
            <li>
              <Code className="px5 ml5">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                validators-keys: [{'<'}KEY_DIR{'>'}:{'<'}PASS_DIR{'>'}]
              </Code>{' '}
            </li>
            <li>
              <Code className="px5 ml5">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                validators-keys: [{'<'}KEY_FILE_1{'>'}:{'<'}PASS_FILE_1{'>'}
                ,...,
                {'<'}KEY_FILE_N{'>'}:{'<'}PASS_FILE_N{'>'}]
              </Code>
            </li>
          </ul>
          <Heading level={4} className="mt10 mb5">
            Note
          </Heading>
          <Text>
            <FormattedMessage
              defaultMessage="{directoriesPattern} will find {keyDirectory}, and expect to find {passwordDirectory}."
              values={{
                directoriesPattern: (
                  <Code className="px5 ml5">
                    {'<'}KEY_DIR{'>'}:{'<'}PASS_DIR{'>'}
                  </Code>
                ),
                keyDirectory: (
                  <Code className="px5 ml5">
                    {'<'}KEY_DIR{'>/**'}.json
                  </Code>
                ),
                passwordDirectory: (
                  <Code className="px5 ml5">
                    {'<'}PASS_DIR{'>/**'}.txt
                  </Code>
                ),
              }}
            />{' '}
            <FormattedMessage
              defaultMessage="{filesPattern} will expect that the {keyFile} exists, and the file containing the password for it is {passwordFile}."
              values={{
                filesPattern: (
                  <Code className="px5 ml5">
                    {'<'}KEY_FILE{'>'}:{'<'}PASS_FILE{'>'}
                  </Code>
                ),
                keyFile: (
                  <Code className="px5 ml5">
                    {'<'}KEY_FILE{'>'}
                  </Code>
                ),
                passwordFile: (
                  <Code className="px5 ml5">
                    {'<'}PASS_FILE{'>'}
                  </Code>
                ),
              }}
            />{' '}
            <FormattedMessage
              defaultMessage="The path separator is operating system dependent, and should be {semicolon} in Windows rather than {colon}."
              values={{
                semicolon: <Code className="px5 ml5">;</Code>,
                colon: <Code className="px5 ml5">:</Code>,
              }}
            />
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
                  primary
                  to="https://docs.teku.pegasys.tech/en/latest/Reference/CLI/CLI-Syntax/#validators-key-password-files"
                >
                  Read options and subcommands documentation
                </Link>
              </Text>
            </li>
            <li>
              <Text>
                Check that the password files don’t have trailing new-lines.
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
            className="mt10"
          >
            Teku documentation
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
