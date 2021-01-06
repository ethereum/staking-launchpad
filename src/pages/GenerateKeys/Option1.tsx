import React from 'react';
import styled from 'styled-components';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
import { ETH2_NETWORK_NAME, IS_MAINNET } from '../../utils/envVars';
import { Button } from '../../components/Button';
import { Alert as GrommetAlert, FormNext } from 'grommet-icons';
import githubScreenshot from '../../static/github-cli-screenshot.png';
import { colors } from '../../styles/styledComponentsTheme';

const AlertIcon = styled(p => <GrommetAlert {...p} />)`
  display: block;
  margin: 1.3rem;
`;

const Pre = styled.pre`
  white-space: normal;
`;

const Arrow = styled(() => <FormNext />)``;

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
  return (
    <div className="mt30">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        Option 1: Download command line app
      </Heading>
      <Text weight={500}>
        Step 1: Download the deposit command line interface app for your
        operating system
      </Text>
      <Link
        external
        to="https://github.com/ethereum/eth2.0-deposit-cli/releases/"
        className="mt10"
      >
        <Button
          className="flex"
          rainbow
          label={
            <>
              <Text>Download from github</Text>
              <Arrow />
            </>
          }
        />
      </Link>

      <Alert variant="warning" className="my20">
        <div className="flex">
          <AlertIcon />
          <Text
            weight={500}
            color="yellowDarkest"
            className="my10"
            style={{ wordBreak: 'break-word' }}
          >
            Please make sure that you are downloading from the official Ethereum
            Foundation GitHub account by verifying the url:{' '}
            <strong>
              https://github.com/ethereum/eth2.0-deposit-cli/releases/
            </strong>
          </Text>
        </div>
      </Alert>

      <GithubScreenshot />

      <Text weight={500} className="mt20">
        Step 2: Generate deposit keys using the Ethereum Foundation deposit tool
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
              <span style={{ color: colors.red.medium }}>.\deposit</span>
              <span style={{ color: colors.purple.dark }}>.exe </span>
            </>
          )}
          <span style={{ color: colors.red.medium }}>new-mnemonic</span>
          <span style={{ color: colors.red.medium }}>
            {validatorCount > 0 ? ` --num_validators ${validatorCount}` : ''}{' '}
          </span>
          <span style={{ color: colors.red.medium }}>
            {`--chain ${ETH2_NETWORK_NAME.toLowerCase()}`}
          </span>
        </Pre>
      </Alert>
      <Alert variant="error" className="my10">
        <Text>
          Please make sure you have set{' '}
          <span className="alert-highlight">
            --chain {ETH2_NETWORK_NAME.toLowerCase()}
          </span>{' '}
          for {ETH2_NETWORK_NAME.charAt(0).toUpperCase()}
          {ETH2_NETWORK_NAME.toLowerCase().slice(1)}
          {!IS_MAINNET && ' testnet'}, otherwise the deposit will be invalid.
        </Text>
      </Alert>
      <Text>
        Now follow the instructions presented to you in the terminal window to
        generate your keys.
      </Text>
    </div>
  );
};
