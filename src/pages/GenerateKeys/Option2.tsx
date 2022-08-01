import React from 'react';
import styled from 'styled-components';
import { Alert as GrommetAlert } from 'grommet-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { Link } from '../../components/Link';
import { Alert } from '../../components/Alert';
import { NETWORK_NAME } from '../../utils/envVars';
import { Button } from '../../components/Button';
import githubScreenshot from '../../static/github-wagyu-key-gen-screenshot.png';

const AlertIcon = styled(p => <GrommetAlert {...p} />)`
  display: block;
  margin: 1.3rem;
`;

const GithubScreenshot = styled.img.attrs({ src: githubScreenshot })`
  max-width: 925px;
  width: 100%;
`;

export const Option2 = ({ os }: { os: string }) => {
  const { formatMessage } = useIntl();

  return (
    <div className="mt30">
      <Heading level={2} size="small" color="blueMedium" className="mb20">
        <FormattedMessage defaultMessage="Download Wagyu Key Gen app" />
      </Heading>
      <Text weight={500}>
        <FormattedMessage defaultMessage="Step 1: Download the Wagyu Key Gen app for your operating system" />
      </Text>
      <Link
        isTextLink={false}
        to="https://github.com/stake-house/wagyu-key-gen/releases"
        className="my40"
      >
        <Button
          className="flex"
          rainbow
          label={formatMessage({ defaultMessage: 'Download from GitHub' })}
        />
      </Link>

      <Link
        shouldOpenNewTab={true}
        to="https://github.com/stake-house/wagyu-key-gen/files/7693548/Wagyu.Key.Gen.Audit.Report.pdf"
        className="my10"
      >
        <FormattedMessage defaultMessage="View Wagyu Key Gen audit by HashCloak" />
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
              defaultMessage="Please make sure that you are downloading from the official StakeHouse
              GitHub account by verifying the url: {url}"
              values={{
                url: (
                  <strong>
                    https://github.com/stake-house/wagyu-key-gen/releases
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
        <FormattedMessage defaultMessage="Step 2: Generate deposit keys using the Wagyu Key Gen app" />
      </Text>
      <Alert className="my20" variant="info">
        <FormattedMessage defaultMessage="For security, we recommend you disconnect from the internet to complete this step." />
      </Alert>

      <ul>
        {os === 'windows' && (
          <li>
            <FormattedMessage defaultMessage="Execute the file you just downloaded." />
          </li>
        )}
        {os === 'linux' && (
          <>
            <li>
              <FormattedMessage defaultMessage="Make the file you just downloaded executable." />
            </li>
            <li>
              <FormattedMessage defaultMessage="Launch the app from your desktop environment by double clicking on it." />
            </li>
          </>
        )}
        {os === 'mac' && (
          <>
            <li>
              <FormattedMessage defaultMessage="Execute the file you just downloaded." />
            </li>
            <li>
              <FormattedMessage defaultMessage="Run the Wagyu Key Gen app from withing Applications by right clicking and clicking Open. You will get a warning stating macOS cannot verify the developer of “Wagyu Key Gen.app”. Are you sure you want to open it?. Click Open and the app will open." />
            </li>
          </>
        )}
        <Alert variant="error" className="my10">
          <Text>
            <FormattedMessage
              defaultMessage="Please make sure you select {NETWORK_NAME} when prompted for a network, otherwise the deposit will be invalid."
              values={{ NETWORK_NAME }}
            />
          </Text>
        </Alert>
        <li>
          <FormattedMessage defaultMessage="Follow the instructions presented to you in the application to generate your keys." />
        </li>
      </ul>
    </div>
  );
};
