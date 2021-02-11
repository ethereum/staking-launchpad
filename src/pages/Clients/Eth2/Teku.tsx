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
      <FormattedMessage
        defaultMessage="Formerly known as Artemis, Teku is an Eth2 client built to meet
          institutional needs and security requirements. PegaSys is an arm of ConsenSys,
          dedicated to building enterprise-ready clients and tools for interacting with
          the core Ethereum platform."
      />
    </Text>
    <Link
      to="https://pegasys.tech/teku-ethereum-2-for-enterprise/"
      primary
      className="mt10"
    >
      <FormattedMessage defaultMessage="More on PegaSys Teku" />
    </Link>{' '}
    <Link to="https://consensys.net/" primary className="mt10">
      <FormattedMessage defaultMessage="More on ConsenSys" />
    </Link>
    <SectionTitle level={2} className="mb5">
      <FormattedMessage defaultMessage="Language information" />
    </SectionTitle>
    <Text className="mt10">
      <FormattedMessage
        defaultMessage="Teku is Apache 2 licensed and written in Java, a language
          notable for its maturity and ubiquity."
      />
    </Text>
    <section>
      <SectionTitle level={2} className="mb5">
        <FormattedMessage defaultMessage="Become a validator with Teku" />
      </SectionTitle>
      <Link primary to={TEKU_INSTALLATION_URL}>
        <FormattedMessage defaultMessage="Teku installation documentation" />
      </Link>
    </section>
    {!shortened && (
      <>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Key management" />
          </SectionTitle>
          <Text>
            <FormattedMessage
              defaultMessage="Teku needs to be pointed at files containing keystores and
                their associated passwords at startup. There are 3 methods for doing so."
            />
          </Text>
          <Heading level={3} className="mt20 mb5">
            <FormattedMessage defaultMessage="Command Line" />
          </Heading>
          <Text>
            <FormattedMessage
              defaultMessage="When launching Teku, keystores and passwords can be provided
                in different ways."
            />
            <ul>
              <li>
                <Code>{`<KEY_DIR>:<PASS_DIR>`}</Code>
              </li>
              <li>
                <FormattedMessage
                  defaultMessage="{keyFile} of paths via the {validatorsKeys} option."
                  values={{
                    keyFile: (
                      <Code>
                        {`<KEY_FILE_1>:<PASS_FILE_1>,...,<KEY_FILE_N>:<PASS_FILE_N>`}
                      </Code>
                    ),
                    validatorsKeys: (
                      <Code className="px5 ml5">--validators-keys</Code>
                    ),
                  }}
                />
              </li>
            </ul>
          </Text>
          <Heading level={3} className="mt20 mb5">
            <FormattedMessage defaultMessage="Environment variables" />
          </Heading>
          <Text>
            <FormattedMessage
              defaultMessage="Teku will also load validators from keystores (and passwords)
                from the paths found in the validator keys environment variable."
            />
          </Text>
          <Code className="px5 ml5">TEKU_VALIDATORS_KEYS</Code>
          <Heading level={3} className="mt20 mb5">
            <FormattedMessage defaultMessage="Configuration file" />
          </Heading>
          <Text>
            <FormattedMessage
              defaultMessage="Teku can also be configured via a YAML file which is passed
                in via a few different ways."
            />
          </Text>
          <ul>
            <li>
              <Text>
                <FormattedMessage defaultMessage="The config file CLI argument" />
              </Text>
            </li>
            <ul>
              <li>
                <Code className="px5 ml5">--config-file</Code>
              </li>
            </ul>
            <li>
              <Text>
                <FormattedMessage defaultMessage="The Teku config file environment variable" />
              </Text>
            </li>
            <ul>
              <li>
                <Code className="px5 ml5">TEKU_CONFIG_FILE</Code>
              </li>
            </ul>
          </ul>
          <Text>
            <FormattedMessage defaultMessage="The YAML files can have different syntaxes." />
          </Text>
          <ul>
            <li>
              <Code className="px5 ml5">
                {`validators-keys: [<KEY_DIR>:<PASS_DIR>]`}
              </Code>
            </li>
            <li>
              <Code className="px5 ml5">
                {`validators-keys: [<KEY_FILE_1>:<PASS_FILE_1>,...,<KEY_FILE_N>:<PASS_FILE_N>]`}
              </Code>
            </li>
          </ul>
          <Heading level={4} className="mt10 mb5">
            <FormattedMessage defaultMessage="Note" />
          </Heading>
          <Text>
            <FormattedMessage
              defaultMessage="{directoriesPattern} will find {keyDirectory}, and expect to find {passwordDirectory}."
              description="{directoriesPattern} refers to a computer command which will find {keyDirectory} and
                {passwordDirectory} - both folders within a computer."
              values={{
                directoriesPattern: (
                  <Code className="px5 ml5">{`<KEY_DIR>:<PASS_DIR>`}</Code>
                ),
                keyDirectory: (
                  <Code className="px5 ml5">{`<KEY_DIR>/**.json`}</Code>
                ),
                passwordDirectory: (
                  <Code className="px5 ml5">{`<PASS_DIR>/**.txt`}</Code>
                ),
              }}
            />{' '}
            <FormattedMessage
              defaultMessage="{filesPattern} will expect that the {keyFile} exists, and the file containing the
                password for it is {passwordFile}."
              description="{filesPattern} refers to a computer command which will find {keyFile} and
                {passwordFile} - both files within a computer."
              values={{
                filesPattern: (
                  <Code className="px5 ml5">{`<KEY_FILE>:<PASS_FILE>`}</Code>
                ),
                keyFile: <Code className="px5 ml5">{'<KEY_FILE>'}</Code>,
                passwordFile: <Code className="px5 ml5">{'<PASS_FILE>'}</Code>,
              }}
            />{' '}
            <FormattedMessage
              defaultMessage="The path separator is operating system dependent, and should be {semicolon}
                in Windows rather than {colon}."
              description="The {semicolon} and {colon} variables refer to the keyboard characters ';' and ':'."
              values={{
                semicolon: <Code className="px5 ml5">;</Code>,
                colon: <Code className="px5 ml5">:</Code>,
              }}
            />
          </Text>
        </section>
        <section>
          <SectionTitle level={2} className="mb5">
            <FormattedMessage defaultMessage="Troubleshooting" />
          </SectionTitle>
          <ul>
            <li>
              <Text>
                <Link
                  primary
                  to="https://docs.teku.pegasys.tech/en/latest/Reference/CLI/CLI-Syntax/#validators-key-password-files"
                >
                  <FormattedMessage defaultMessage="Read options and subcommands documentation" />
                </Link>
              </Text>
            </li>
            <li>
              <Text>
                <FormattedMessage defaultMessage="Check that the password files don’t have trailing new-lines." />
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
            <FormattedMessage defaultMessage="Documentation" />
          </SectionTitle>
          <Link
            primary
            to="https://docs.teku.pegasys.tech/en/latest/"
            className="mt10"
          >
            <FormattedMessage defaultMessage="Teku documentation" />
          </Link>
        </section>
      </ValidatorClientPageStyles>
    </PageTemplate>
  );
};
