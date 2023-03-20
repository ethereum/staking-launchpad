import React from 'react';
import styled from 'styled-components';
import { Alert as GrommetAlert } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
import { Code } from '../../components/Code';
import { NETWORK_NAME, TRANSLATE_CLI_FLAGS } from '../../utils/envVars';
import { Button } from '../../components/Button';
import githubScreenshot from '../../static/github-cli-screenshot.png';
import { colors } from '../../styles/styledComponentsTheme';
import useIntlNetworkName from '../../hooks/useIntlNetworkName';

const AlertIcon = styled(p => <GrommetAlert {...p} />)`
  display: block;
  margin: 1.3rem;
`;

const Pre = styled.pre`
  white-space: normal;
  direction: ltr;
`;

const GithubScreenshot = styled.img.attrs({ src: githubScreenshot })`
  max-width: 925px;
  width: 100%;
`;

export const Option1 = ({
  validatorCount,
  withdrawalAddress,
  os,
}: {
  validatorCount: number | string;
  withdrawalAddress: string;
  os: string;
}) => {
  const { formatMessage } = useIntl();
  const { consensusLayerName } = useIntlNetworkName();

  return (
    <div className="mt30">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        <FormattedMessage defaultMessage="Download command line app" />
      </Heading>
      <Text weight={500}>
        <FormattedMessage defaultMessage="Step 1: Download the deposit command line interface app for your operating system" />
      </Text>
      <Link
        isTextLink={false}
        to="https://github.com/ethereum/staking-deposit-cli/releases/"
        className="my40"
      >
        <Button
          className="flex"
          rainbow
          label={formatMessage({ defaultMessage: 'Download from GitHub' })}
        />
      </Link>

      <Alert variant="warning" className="my40">
        <div className="flex">
          <AlertIcon />
          <Text
            weight={500}
            color="yellowDarkest"
            className="my10"
            style={{ wordBreak: 'break-word' }}
          >
            <FormattedMessage
              defaultMessage="Please make sure that you are downloading from the official Ethereum
              Foundation GitHub account by verifying the url: {url}"
              values={{
                url: (
                  <strong>
                    https://github.com/ethereum/staking-deposit-cli/releases/
                  </strong>
                ),
              }}
              description="{url} is link to GitHub CLI release, made bold for emphasis"
            />
          </Text>
        </div>
      </Alert>

      <GithubScreenshot />

      <Text weight={500} className="mt20">
        <FormattedMessage defaultMessage="Step 2: Generate deposit keys using the Ethereum Foundation deposit tool" />
      </Text>
      <Alert className="my20" variant="info">
        <FormattedMessage defaultMessage="For security, we recommend you disconnect from the internet to complete this step." />
      </Alert>
      <ul>
        <li>
          <FormattedMessage defaultMessage="Decompress the file you just downloaded" />
        </li>
        <li>
          <FormattedMessage
            defaultMessage="Use the terminal to move into the directory that contains the {deposit} executable"
            values={{
              deposit: (
                <code>
                  <FormattedMessage defaultMessage="deposit" />
                </code>
              ),
            }}
            description="{deposit} = 'deposit' styled as code"
          />
        </li>
        <li>
          <FormattedMessage defaultMessage="Run the following command to launch the app" />
        </li>
        <Alert variant="secondary" className="my10">
          <Pre className="my10" style={{ color: colors.red.medium }}>
            {(os === 'linux' || os === 'mac') && './deposit '}
            {os === 'windows' && (
              <>
                <span>.\deposit</span>
                <span style={{ color: colors.purple.dark }}>.exe </span>
              </>
            )}
            new-mnemonic{' '}
            {validatorCount > 0
              ? `--${
                  TRANSLATE_CLI_FLAGS
                    ? formatMessage({
                        defaultMessage: 'num_validators',
                        description:
                          'this is used as a command line flag, short for "number of validators"',
                      })
                    : 'num_validators'
                } ${validatorCount}`
              : ''}{' '}
            {`--${
              TRANSLATE_CLI_FLAGS
                ? formatMessage({
                    defaultMessage: 'chain',
                    description: 'this is used as a command line flag',
                  })
                : 'chain'
            } ${NETWORK_NAME.toLowerCase()}`}{' '}
            {withdrawalAddress &&
              `--${
                TRANSLATE_CLI_FLAGS
                  ? formatMessage({
                      defaultMessage: 'eth1_withdrawal_address',
                      description: 'this is used as a command line flag',
                    })
                  : 'eth1_withdrawal_address'
              } ${withdrawalAddress}`}
          </Pre>
        </Alert>
        <Alert variant="error" className="my20">
          <Text>
            <FormattedMessage
              defaultMessage="Make sure you have set {flag} for {consensusLayerName}, otherwise the deposit will be invalid."
              values={{
                flag: (
                  <Code>
                    {`--${
                      TRANSLATE_CLI_FLAGS
                        ? formatMessage({
                            defaultMessage: 'chain',
                            description: 'this is used as a command line flag',
                          })
                        : 'chain'
                    } ${NETWORK_NAME.toLowerCase()}`}
                  </Code>
                ),
                consensusLayerName,
              }}
              description="{flag} is a terminal command styled as code."
            />
          </Text>
        </Alert>
        <li>
          <FormattedMessage defaultMessage="Now follow the instructions presented to you in the terminal window to generate your keys." />
        </li>
      </ul>
    </div>
  );
};
