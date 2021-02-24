import React from 'react';
import styled from 'styled-components';
import { Alert as GrommetAlert } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
import { Code } from '../../components/Code';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';
import { Button } from '../../components/Button';
import githubScreenshot from '../../static/github-cli-screenshot.png';
import { colors } from '../../styles/styledComponentsTheme';

const AlertIcon = styled(p => <GrommetAlert {...p} />)`
  display: block;
  margin: 1.3rem;
`;

const Pre = styled.pre`
  white-space: normal;
`;

const GithubScreenshot = styled.img.attrs({ src: githubScreenshot })`
  max-width: 925px;
  width: 100%;
`;

export const Option1 = ({
  validatorCount,
  os,
}: {
  validatorCount: number | string;
  os: string;
}) => {
  const { formatMessage } = useIntl();

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
        to="https://github.com/ethereum/eth2.0-deposit-cli/releases/"
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
                    https://github.com/ethereum/eth2.0-deposit-cli/releases/
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
              deposit: <code>deposit</code>,
            }}
            description="{deposit} = 'deposit' styled as code"
          />
        </li>
        <li>
          <FormattedMessage defaultMessage="Run the following command to launch the app" />
        </li>
        <Alert variant="secondary" className="my10">
          <Pre className="my10">
            {(os === 'linux' || os === 'mac') && (
              <span style={{ color: colors.red.medium }}>./deposit </span>
            )}
            {os === 'windows' && (
              <>
                <span style={{ color: colors.red.medium }}>.\deposit</span>
                <span style={{ color: colors.purple.dark }}>.exe </span>
              </>
            )}
            <span style={{ color: colors.red.medium }}>new-mnemonic</span>
            <span style={{ color: colors.red.medium }}>
              {validatorCount > 0
                ? ` --${formatMessage({
                    defaultMessage: 'num_validators',
                    description:
                      'this is used as a command line flag, short for "number of validators"',
                  })} ${validatorCount}`
                : ''}{' '}
            </span>
            <span style={{ color: colors.red.medium }}>
              {`--${formatMessage({
                defaultMessage: 'chain',
                description: 'this is used as a command line flag',
              })} ${ETH2_NETWORK_NAME.toLowerCase()}`}
            </span>
          </Pre>
        </Alert>
        <Alert variant="error" className="my10">
          <Text>
            <FormattedMessage
              defaultMessage="Please make sure you have set {flag} for {network}, otherwise the deposit will be invalid."
              values={{
                flag: (
                  <Code>{`--${formatMessage({
                    defaultMessage: 'chain',
                    description: 'this is used as a command line flag',
                  })} ${ETH2_NETWORK_NAME.toLowerCase()}`}</Code>
                ),
                network: (
                  <span>
                    {IS_MAINNET
                      ? ETH2_NETWORK_NAME
                      : `${ETH2_NETWORK_NAME} testnet`}
                  </span>
                ),
              }}
              description="{flag} and {network} are terminal commands styled as code."
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
