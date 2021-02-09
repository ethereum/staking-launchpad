import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { Code } from '../../components/Code';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';
import { colors } from '../../styles/styledComponentsTheme';
import { FormattedMessage, useIntl } from 'react-intl';

const Pre = styled.pre`
  white-space: normal;
`;

export const Option2 = ({
  validatorCount,
  os,
}: {
  validatorCount: number | string;
  os: string;
}) => {
  const { formatMessage } = useIntl();
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
          python3 ./eth2deposit/deposit.py new-mnemonic{' '}
          {validatorCount > 0 ? `--num_validators ${validatorCount}` : ''}{' '}
          {`--chain ${ETH2_NETWORK_NAME.toLowerCase()}`}
        </Pre>
      );
    }

    if (os === 'windows') {
      return (
        <Pre className="my0">
          .\eth2deposit\deposit.py new-mnemonic{' '}
          {validatorCount > 0 ? `--num_validators ${validatorCount}` : ''}{' '}
          {`--chain ${ETH2_NETWORK_NAME.toLowerCase()}`}
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
        <FormattedMessage defaultMessage="Install python3.7+" />
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
        <Link
          to="https://virtualenv.pypa.io/en/latest/installation.html"
          inline
          primary
        >
          <FormattedMessage defaultMessage="More on virtualenv" />
        </Link>
      </Text>
      <Heading level={4} size="small" color="blueMedium" className="mb10 mt20">
<FormattedMessage defaultMessage="Install deposit-cli tool"/>
      </Heading>
      <Text>
        <FormattedMessage defaultMessage="Download and uncompress the master branch source code from GitHub." />
        <Link
          inline
          primary
          isTextLink={false}
          to="https://github.com/ethereum/eth2.0-deposit-cli/archive/master.zip"
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
                  https://github.com/ethereum/eth2.0-deposit-cli.git
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
        <pre className="my0">
          <span style={{ color: colors.blue.medium }}>virtualenv</span> venv
        </pre>
        {(os === 'linux' || os === 'mac') && (
          <pre className="my0">source venv/bin/activate</pre>
        )}
        {os === 'windows' && <pre className="my0">.\venv\Scripts\activate</pre>}
      </Alert>
      <Text>
        <FormattedMessage defaultMessage="Second, install the dependency packages:" />
      </Text>
      <Alert variant="secondary" className="my10">
        <pre className="my0">
          {(os === 'linux' || os === 'mac') && (
            <span style={{ color: colors.red.medium }}>python3 setup</span>
          )}
          {os === 'windows' && (
            <span style={{ color: colors.red.medium }}>python setup</span>
          )}
          <span style={{ color: colors.purple.dark }}>.py</span>{' '}
          <span style={{ color: colors.red.medium }}>install</span>
        </pre>
        <pre className="my0">
          <span style={{ color: colors.red.medium }}>
            pip3 install -r requirements
          </span>
          <span style={{ color: colors.purple.dark }}>.txt</span>
        </pre>
      </Alert>
      <Heading level={4} size="small" color="blueMedium" className="mb10">
        <FormattedMessage defaultMessage="Generate deposit keys using the Ethereum Foundation deposit tool" />
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
      <Alert variant="error" className="my10">
        <Text>
          <FormattedMessage
            defaultMessage="Make sure you have set {flag} for {network}, otherwise the deposit will be invalid."
            values={{
              flag: <Code>--chain {ETH2_NETWORK_NAME.toLowerCase()}</Code>,
              network: (
                <span>
                  {ETH2_NETWORK_NAME.charAt(0).toUpperCase()}
                  {ETH2_NETWORK_NAME.toLowerCase().slice(1)}
                  {!IS_MAINNET && ' testnet'}
                </span>
              ),
            }}
          />
        </Text>
      </Alert>
      <Alert variant="warning" className="my10">
        <Text>
          <FormattedMessage defaultMessage="If you have questions about deposit-cli, please visit the GitHub repository." />
        </Text>
        <Link
          primary
          inline
          to="https://github.com/ethereum/eth2.0-deposit-cli"
        >
          https://github.com/ethereum/eth2.0-deposit-cli
        </Link>
      </Alert>
    </div>
  );
};
