import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Button } from '../../components/Button';
import { Alert } from '../../components/Alert';
import { CHAIN_NAME, IS_MAINNET } from '../../utils/envVars';
import { colors } from '../../styles/styledComponentsTheme';

const Pre = styled.pre`
  white-space: normal;
`;

export const Option1 = ({
  validatorCount,
  os,
}: {
  validatorCount: number | string;
  os: string;
}) => {
  const cliLink = React.useMemo(() => {
    if (os === 'linux')
      return 'https://github.com/ethereum/eth2.0-deposit-cli/releases/download/v0.4.1/eth2deposit-cli-3f4a79a-darwin-amd64.tar.gz';
    if (os === 'mac')
      return 'https://github.com/ethereum/eth2.0-deposit-cli/releases/download/v0.4.1/eth2deposit-cli-3f4a79a-linux-amd64.tar.gz';
    if (os === 'windows')
      return 'https://github.com/ethereum/eth2.0-deposit-cli/releases/download/v0.4.1/eth2deposit-cli-3f4a79a-windows-amd64.zip';
    return 'https://github.com/ethereum/eth2.0-deposit-cli/releases/download/v0.4.1/eth2deposit-cli-3f4a79a-windows-amd64.zip';
  }, [os]);

  const osName = React.useMemo(() => {
    if (os === 'linux') return 'Linux';
    if (os === 'mac') return 'MacOS';
    if (os === 'windows') return 'Windows';
    return 'default';
  }, [os]);

  return (
    <div className="mt30">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        Option 1: Download command line app
      </Heading>
      <Text weight={500}>Download the deposit command line interface app</Text>
      <Text className="mt5">
        The easiest way to generate your deposit key files is by downloading the
        CLI tool and following the instructions. You can also download the
        deposit command line tool from the official Ethereum github account{' '}
        <Link
          inline
          primary
          external
          to="https://github.com/ethereum/eth2.0-deposit-cli/releases/"
        >
          ethereum/eth2.0-deposit-cli
        </Link>
        .
      </Text>
      <Link external to={cliLink} style={{ margin: '2rem auto' }}>
        <Button
          primary
          label={<Text color="white">Download the CLI tool for {osName}</Text>}
        />
      </Link>
      <Text weight={500} className="mt10">
        Generate deposit keys using the Ethereum Foundation deposit tool
      </Text>
      <Text className="mt5">
        Decompress the file you just downloaded, use the terminal to move into
        the directory that contains the <code>deposit</code> executable, and run
        the following command to launch the app:
      </Text>
      <Alert variant="secondary" className="my10">
        <Pre className="my10">
          {(os === 'linux' || os === 'mac') && (
            <span style={{ color: colors.red.medium }}>./deposit </span>
          )}
          {os === 'windows' && (
            <>
              <span style={{ color: colors.red.medium }}>deposit</span>
              <span style={{ color: colors.purple.dark }}>.exe </span>
            </>
          )}
          {validatorCount > 0 ? `--num_validators ${validatorCount}` : ''}{' '}
          <span style={{ color: colors.red.medium }}>
            {IS_MAINNET ? '' : `--chain ${CHAIN_NAME.toLowerCase()}`}
          </span>
        </Pre>
      </Alert>
      <Text>
        Now follow the instructions presented to you in the terminal window to
        generate your keys.
      </Text>
    </div>
  );
};
