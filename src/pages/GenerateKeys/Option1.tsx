import React from 'react';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
import { CHAIN_NAME, IS_MAINNET } from '../../utils/envVars';
import { Paper } from '../../components/Paper';
import { colors } from '../../styles/styledComponentsTheme';

export const Option1 = ({
  validatorCount,
  os,
}: {
  validatorCount: number | string;
  os: string;
}) => {
  return (
    <Paper className="mt20">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        Option 1: Use binary executable file
      </Heading>
      <Text weight={500}>Download the binary executable file</Text>
      <Text>
        Please find the binary execution file of the latest deposit-cli release
        on{' '}
        <Link
          primary
          external
          to="https://github.com/ethereum/eth2.0-deposit-cli/releases/"
          inline
        >
          ethereum/eth2.0-deposit-cli
        </Link>{' '}
        GitHub page for your platform.{' '}
      </Text>
      <Alert variant="warning" className="my20">
        <Text weight={500} color="yellowDarkest" className="my10">
          Please make sure that you are downloading from Ethereum Foundation
          official GitHub account.
        </Text>
      </Alert>
      <Text weight={500}>
        Generate deposit keys using the Ethereum Foundation deposit tool
      </Text>
      <Text className="mt5">
        Type the following lines into the terminal window:
      </Text>
      <Alert variant="secondary" className="my10">
        <pre className="my10">
          {(os === 'linux' || os === 'mac') && (
            <span style={{ color: colors.red.medium }}>./deposit </span>
          )}

          {os === 'windows' && (
            <>
              <span style={{ color: colors.red.medium }}>deposit</span>
              <span style={{ color: colors.purple.dark }}>.exe </span>
            </>
          )}

          {validatorCount > 0 ? `--num_validators ${validatorCount}` : ''}

          <span style={{ color: colors.red.medium }}>
            {IS_MAINNET ? '' : `--chain ${CHAIN_NAME.toLowerCase()}`}
          </span>
        </pre>
      </Alert>
    </Paper>
  );
};
