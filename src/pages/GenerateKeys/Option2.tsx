import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
import { Code } from '../../components/Code';
import { CHAIN_NAME, IS_MAINNET } from '../../utils/envVars';
import { colors } from '../../styles/styledComponentsTheme';

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
  const renderPythonInstructions = () => {
    if (os === 'linux')
      return (
        <>
          The python3 install process may differ depending on your linux build.
        </>
      );

    if (os === 'mac')
      return (
        <>
          You can install python3 on your MacOS device using{' '}
          <Link primary inline external to="https://docs.brew.sh/Manpage">
            homebrew
          </Link>
        </>
      );

    if (os === 'windows')
      return (
        <>
          Download python3 from{' '}
          <Link
            primary
            inline
            external
            to="https://docs.python.org/3/using/windows.html"
          >
            python.org
          </Link>{' '}
          or via{' '}
          <Link
            primary
            inline
            external
            to="https://chocolatey.org/packages/python"
          >
            Chocolatey
          </Link>{' '}
          and follow the installation instructions.
        </>
      );
  };

  const renderPipInstructions = () => {
    if (os === 'linux') {
      return (
        <Text>
          You can install pip using a Linux Package Manager like{' '}
          <Code>apt</Code> or <Code>yum</Code>. For the most-up-to-date
          instructions on installing pip3, please reference the pip the
          documentation found{' '}
          <Link
            inline
            external
            primary
            to="https://packaging.python.org/guides/installing-using-linux-tools/#installing-pip-setuptools-wheel-with-linux-package-managers"
          >
            here
          </Link>
          .
        </Text>
      );
    }

    if (os === 'mac') {
      return (
        <Text>
          You can also use{' '}
          <Link primary inline external to="https://docs.brew.sh/Manpage">
            homebrew
          </Link>{' '}
          to install pip3. For the most-up-to-date instructions on installing
          pip3, and for a direct download link, please reference the pip the
          documentation found{' '}
          <Link
            inline
            external
            primary
            to="https://pip.pypa.io/en/stable/installing/"
          >
            here
          </Link>
          .
        </Text>
      );
    }

    if (os === 'windows') {
      return (
        <Text>
          The latest version of pip should have been installed with python
          3.x.x. For more information about pip, you can visit the windows
          install{' '}
          <Link
            inline
            external
            primary
            to="https://pip.pypa.io/en/stable/installing/"
          >
            guide{' '}
          </Link>
          or install the pip package via{' '}
          <Link
            inline
            external
            primary
            to="https://chocolatey.org/packages/pip"
          >
            Chocolatey
          </Link>
          .
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
          {IS_MAINNET ? '' : `--chain ${CHAIN_NAME.toLowerCase()}`}
        </Pre>
      );
    }

    if (os === 'windows') {
      return (
        <Pre className="my0">
          .\eth2deposit\deposit.py new-mnemonic{' '}
          {validatorCount > 0 ? `--num_validators ${validatorCount}` : ''}{' '}
          {IS_MAINNET ? '' : `--chain ${CHAIN_NAME.toLowerCase()}`}
        </Pre>
      );
    }
  };

  return (
    <div className="mt30">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        Option 2: Build deposit-cli from the Python source code
      </Heading>
      <Heading level={4} size="small" color="blueMedium" className="mb10">
        Install python3.7+
      </Heading>
      <Text>{renderPythonInstructions()}</Text>
      <Text>
        For the most up-to-date installation instructions, please visit{' '}
        <Link
          primary
          inline
          external
          to="https://python.org/about/gettingstarted"
        >
          https://python.org/about/gettingstarted
        </Link>
        .
      </Text>
      <Alert variant="info" className="my10">
        <Text className="my10" color="blueDark">
          You can check your Python version by typing{' '}
          {(os === 'linux' || os === 'mac') && (
            <span className="alert-highlight">python3 -V</span>
          )}
          {os === 'windows' && (
            <span className="alert-highlight">python -V</span>
          )}
          on your terminal.
        </Text>
      </Alert>

      <Heading level={4} size="small" color="blueMedium" className="mb10 mt20">
        Install pip3
      </Heading>
      {renderPipInstructions()}
      <Heading level={4} size="small" color="blueMedium" className="mb10 my20">
        Install virtualenv
      </Heading>
      <Text>
        virtualenv would help you to create an isolated Python environment for
        deposit-cli tool. Please visit{' '}
        <Link
          external
          to="https://virtualenv.pypa.io/en/latest/installation.html"
          inline
          primary
        >
          https://virtualenv.pypa.io/en/latest/installation.html
        </Link>
      </Text>
      <Heading level={4} size="small" color="blueMedium" className="mb10 mt20">
        Install deposit-cli tool
      </Heading>
      <Text>
        Download and uncompress the{' '}
        <Link
          external
          inline
          primary
          to="https://github.com/ethereum/eth2.0-deposit-cli/archive/master.zip"
        >
          master branch source code{' '}
        </Link>
        from GitHub.
      </Text>
      <Alert variant="info" className="my10">
        <Text>
          If you’re a git user, you can run{' '}
          <span className="alert-highlight">
            git clone -b master --single-branch
            https://github.com/ethereum/eth2.0-deposit-cli.git
          </span>{' '}
          to download the <span className="alert-highlight">master</span>{' '}
          branch.
        </Text>
      </Alert>
      <Text>First, create an venv virtualenv under repository directory:</Text>
      <Alert variant="secondary" className="my10">
        <pre className="my0">
          <span style={{ color: colors.blue.medium }}>virtualenv</span> venv
        </pre>
        {(os === 'linux' || os === 'mac') && (
          <pre className="my0">source venv/bin/activate</pre>
        )}
        {os === 'windows' && <pre className="my0">.\venv\Scripts\activate</pre>}
      </Alert>
      <Text>Second, install the dependency packages:</Text>
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
        Generate deposit keys using the Ethereum Foundation deposit tool
      </Heading>
      <Text className="mt5">
        Type the following lines into the terminal window:
      </Text>
      <Alert variant="secondary" className="my10">
        {renderDepositKeyCommand()}
      </Alert>
      <Alert variant="error" className="my10">
        <Text>
          Please make sure you have set{' '}
          <span className="alert-highlight">
            --chain {CHAIN_NAME.toLowerCase()}
          </span>{' '}
          for {CHAIN_NAME.charAt(0).toUpperCase()}
          {CHAIN_NAME.toLowerCase().slice(1)} testnet, otherwise the deposit
          will be invalid.
        </Text>
      </Alert>
      <Alert variant="warning" className="my10">
        <Text>
          If you have questions about deposit-cli, please visit the GitHub
          repository:{' '}
          <Link
            external
            primary
            inline
            to="https://github.com/ethereum/eth2.0-deposit-cli"
          >
            https://github.com/ethereum/eth2.0-deposit-cli
          </Link>
        </Text>
      </Alert>
    </div>
  );
};
