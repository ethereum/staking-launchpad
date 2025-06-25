import React from 'react';
import styled from 'styled-components';
import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Code } from '../../components/Code';
import {
  NETWORK_NAME,
  TRANSLATE_CLI_FLAGS,
  MIN_ACTIVATION_BALANCE,
  MAX_EFFECTIVE_BALANCE,
} from '../../utils/envVars';
import { colors } from '../../styles/styledComponentsTheme';
import useIntlNetworkName from '../../hooks/useIntlNetworkName';
import { CLIOptionProps } from './Option1';

const Pre = styled.pre`
  white-space: normal;
  direction: ltr;
`;

export const Option3 = ({
  accountType,
  ethAmount,
  validatorCount,
  withdrawalAddress,
  os,
}: CLIOptionProps) => {
  const { formatMessage } = useIntl();
  const { consensusLayerName } = useIntlNetworkName();

  const renderPythonInstructions = () => {
    if (os === 'linux')
      return (
        <FormattedMessage defaultMessage="The python3 install process may differ depending on your linux build." />
      );
    if (os === 'mac')
      return (
        <FormattedMessage
          defaultMessage="You can install python3 on your macOS device using {homebrew}"
          values={{
            homebrew: (
              <Link primary inline to="https://docs.brew.sh/Manpage">
                Homebrew
              </Link>
            ),
          }}
          description="{homebrew} = 'homebrew' and links to the homebrew package manager website documentation"
        />
      );

    if (os === 'windows')
      return (
        <>
          <FormattedMessage defaultMessage="Download python3 and follow the installation instructions." />
          <ul>
            <li>
              <Link
                primary
                inline
                to="https://docs.python.org/3/using/windows.html"
              >
                python.org
              </Link>
            </li>
            <li>
              <Link primary inline to="https://chocolatey.org/packages/python">
                Chocolatey
              </Link>
            </li>
          </ul>
        </>
      );
  };

  const renderPipInstructions = () => {
    if (os === 'linux') {
      return (
        <Text>
          <FormattedMessage
            defaultMessage="You can install pip using a Linux Package Manager like {apt} or {yum}."
            values={{
              apt: <Code>apt</Code>,
              yum: <Code>yum</Code>,
            }}
            description="{apt} and {yum} are both package manager names styled as code"
          />
          <Link
            primary
            to="https://packaging.python.org/guides/installing-using-linux-tools/#installing-pip-setuptools-wheel-with-linux-package-managers"
          >
            <FormattedMessage defaultMessage="More on installing pip" />
          </Link>
        </Text>
      );
    }

    if (os === 'mac') {
      return (
        <Text>
          <FormattedMessage
            defaultMessage="You can also use {homebrew} to install pip3. For the most-up-to-date instructions on installing
            pip3, and for a direct download link, reference the {docs}"
            values={{
              homebrew: (
                <Link primary inline to="https://docs.brew.sh/Manpage">
                  homebrew
                </Link>
              ),
              docs: (
                <Link
                  inline
                  primary
                  to="https://pip.pypa.io/en/stable/installing/"
                >
                  {formatMessage({ defaultMessage: 'pip documentation' })}
                </Link>
              ),
            }}
          />
        </Text>
      );
    }

    if (os === 'windows') {
      return (
        <Text>
          <FormattedMessage
            defaultMessage="The latest version of pip should have been installed with python
            3.x.x. For more information about installing pip on Windows, visit {windowsInstallGuide}. Or you can install the pip package via {chocolatey}."
            values={{
              windowsInstallGuide: (
                <Link
                  inline
                  primary
                  to="https://pip.pypa.io/en/stable/installing/"
                >
                  pip{' '}
                </Link>
              ),
              chocolatey: (
                <Link inline primary to="https://chocolatey.org/packages/pip">
                  Chocolatey
                </Link>
              ),
            }}
          />
        </Text>
      );
    }
  };

  const renderDepositKeyCommand = () => {
    if (os === 'mac' || os === 'linux') {
      return (
        <Pre className="my0">
          python3 -m ethstaker_deposit new-mnemonic{' '}
          {accountType === '0x02' &&
          ethAmount >= MIN_ACTIVATION_BALANCE &&
          ethAmount <= MAX_EFFECTIVE_BALANCE
            ? `--compounding --${
                TRANSLATE_CLI_FLAGS
                  ? formatMessage({
                      defaultMessage: 'num_validators',
                      description:
                        'this is used as a command line flag, short for "number of validators"',
                    })
                  : 'num_validators'
              } 1 --${
                TRANSLATE_CLI_FLAGS
                  ? formatMessage({
                      defaultMessage: 'amount',
                      description:
                        'this is used as a command line flag, for the amount of ETH to be deposited',
                    })
                  : 'amount'
              } ${ethAmount}`
            : ''}{' '}
          {accountType === '0x01' && validatorCount > 0
            ? `--regular-withdrawal --${
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
                    defaultMessage: 'withdrawal_address',
                    description: 'this is used as a command line flag',
                  })
                : 'withdrawal_address'
            } ${withdrawalAddress}`}
        </Pre>
      );
    }

    if (os === 'windows') {
      return (
        <Pre className="my0">
          .\ethstaker_deposit\deposit.py new-mnemonic{' '}
          {accountType === '0x02' &&
          ethAmount >= MIN_ACTIVATION_BALANCE &&
          ethAmount <= MAX_EFFECTIVE_BALANCE
            ? `--compounding --${
                TRANSLATE_CLI_FLAGS
                  ? formatMessage({
                      defaultMessage: 'num_validators',
                      description:
                        'this is used as a command line flag, short for "number of validators"',
                    })
                  : 'num_validators'
              } 1 --${
                TRANSLATE_CLI_FLAGS
                  ? formatMessage({
                      defaultMessage: 'amount',
                      description:
                        'this is used as a command line flag, for the amount of ETH to be deposited',
                    })
                  : 'amount'
              } ${ethAmount}`
            : ''}{' '}
          {accountType === '0x01' && validatorCount > 0
            ? `--regular-withdrawal --${
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
                    defaultMessage: 'withdrawal_address',
                    description: 'this is used as a command line flag',
                  })
                : 'withdrawal_address'
            } ${withdrawalAddress}`}
        </Pre>
      );
    }
  };

  return (
    <div className="mt30">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        <FormattedMessage defaultMessage="Build deposit-cli from the Python source code" />
      </Heading>
      <Heading level={4} size="small" color="blueMedium" className="mb10">
        <FormattedMessage defaultMessage="Install python3.9+" />
      </Heading>
      <Text>{renderPythonInstructions()}</Text>
      <Text>
        <FormattedMessage defaultMessage="If you need help, check out the Python documentation." />
        <Link primary to="https://python.org/about/gettingstarted">
          <FormattedMessage defaultMessage="Python installation instructions" />
        </Link>
      </Text>
      <Alert variant="info" className="my10">
        <Text className="my10" color="blueDark">
          <FormattedMessage
            defaultMessage="You can check your Python version by typing {terminalCommand} in your terminal."
            values={{
              terminalCommand: (
                <>
                  {(os === 'linux' || os === 'mac') && <Code>python3 -V</Code>}
                  {os === 'windows' && <Code>python -V</Code>}
                </>
              ),
            }}
          />
        </Text>
      </Alert>

      <Heading level={4} size="small" color="blueMedium" className="mb10 mt20">
        <FormattedMessage defaultMessage="Install pip3" />
      </Heading>
      {renderPipInstructions()}
      <Heading level={4} size="small" color="blueMedium" className="mb10 my20">
        <FormattedMessage defaultMessage="Install virtualenv" />
      </Heading>
      <Text>
        <FormattedMessage defaultMessage="virtualenv would help you to create an isolated Python environment for deposit-cli tool." />
      </Text>
      <Text>
        <Link
          to="https://virtualenv.pypa.io/en/latest/installation.html"
          primary
        >
          <FormattedMessage defaultMessage="More on virtualenv" />
        </Link>
      </Text>
      <Heading level={4} size="small" color="blueMedium" className="mb10 mt20">
        <FormattedMessage defaultMessage="Install deposit-cli tool" />
      </Heading>
      <Text>
        <FormattedMessage defaultMessage="Download and uncompress the master branch source code from GitHub." />
        <Link
          inline
          primary
          isTextLink={false}
          to="https://github.com/ethstaker/ethstaker-deposit-cli/archive/master.zip"
        >
          <Button
            className="my20"
            label={formatMessage({
              defaultMessage: 'Download master branch source code',
            })}
          />
        </Link>
      </Text>
      <Alert variant="info" className="my10">
        <Text>
          <FormattedMessage
            defaultMessage="If you’re a git user, you can run {gitClone} to download the {master} branch."
            values={{
              gitClone: (
                <Code>
                  git clone -b master --single-branch
                  https://github.com/ethstaker/ethstaker-deposit-cli.git
                </Code>
              ),
              master: <Code>master</Code>,
            }}
          />
        </Text>
      </Alert>
      <Text>
        <FormattedMessage defaultMessage="First, create a venv virtualenv under repository directory:" />
      </Text>
      <Alert variant="secondary" className="my10">
        <Pre className="my0">
          <span style={{ color: colors.blue.medium }}>virtualenv</span> venv
        </Pre>
        {(os === 'linux' || os === 'mac') && (
          <Pre className="my0">source venv/bin/activate</Pre>
        )}
        {os === 'windows' && <Pre className="my0">.\venv\Scripts\activate</Pre>}
      </Alert>
      <Text>
        <FormattedMessage defaultMessage="Second, install the dependency packages:" />
      </Text>
      <Alert variant="secondary" className="my10">
        <Pre className="my0">
          <span style={{ color: colors.red.medium }}>
            pip3 install -r requirements
          </span>
          <span style={{ color: colors.purple.dark }}>.txt</span>
        </Pre>
      </Alert>
      <Heading level={4} size="small" color="blueMedium" className="mb10">
        <FormattedMessage defaultMessage="Generate deposit keys using the EthStaker deposit tool" />
      </Heading>
      <Alert className="my20" variant="info">
        <FormattedMessage defaultMessage="For security, we recommend you disconnect from the internet to complete this step." />
      </Alert>
      <Text className="mt5">
        <FormattedMessage defaultMessage="Type the following lines into the terminal window:" />
      </Text>
      <Alert variant="secondary" className="my10">
        {renderDepositKeyCommand()}
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
      <Text className="my20">
        <Text>
          <FormattedMessage defaultMessage="If you have questions about deposit-cli, please visit the GitHub repository." />
        </Text>
        <Link
          primary
          inline
          to="https://github.com/ethstaker/ethstaker-deposit-cli"
        >
          https://github.com/ethstaker/ethstaker-deposit-cli
        </Link>
      </Text>
    </div>
  );
};
