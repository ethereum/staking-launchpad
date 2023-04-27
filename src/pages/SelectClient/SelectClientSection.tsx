import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormattedMessage } from 'react-intl';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { ImageSelectionBox } from '../../components/ImageSelectionBox';
import { Alert } from '../../components/Alert';
import { Client } from './index';
import { ClientId } from '../../store/actions/clientActions';
import { TUTORIAL_URL, NETWORK_NAME } from '../../utils/envVars';

const ClientOptionContainer = styled.div<{ overFour: boolean }>`
  width: min(${({ overFour }) => (overFour ? '700' : '1000')}px, 100%);
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
  margin-inline: auto;
`;

const ClientDescriptionContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  background: #fcfcfc;
  border: 1px solid #ececec;
  margin-top: 30px;
  padding: 1rem 2rem;
`;

type Props = {
  title?: string;
  clients: Array<Client>;
  currentClient: ClientId;
  setCurrentClient: (client: ClientId) => void;
  clientDetails: any;
  ethClientStep: string;
};

const SelectClientSection = ({
  title,
  clients,
  currentClient,
  setCurrentClient,
  clientDetails,
  ethClientStep,
}: Props): JSX.Element => (
  <Paper>
    <Heading level={3} size="small" color="blueDark" className="mb20">
      {title}
    </Heading>
    {ethClientStep === 'execution' && (
      <div style={{ paddingBottom: '1rem' }}>
        <FormattedMessage
          defaultMessage="To process incoming validator deposits from the execution layer
          (formerly 'Eth1' chain), you'll need to run an execution client as well as your
          consensus client (formerly 'Eth2')."
        />
      </div>
    )}
    {TUTORIAL_URL !== null && (
      <div style={{ paddingBottom: '1rem' }}>
        <Link to={TUTORIAL_URL} primary>
          <FormattedMessage
            defaultMessage="Check this document to learn how to run a node on {networkName}"
            values={{
              networkName: NETWORK_NAME,
            }}
          />
        </Link>
      </div>
    )}
    <Box className="flex flex-column space-between mt10">
      <ClientOptionContainer overFour={clients.length > 4}>
        {clients.map(({ clientId, name, imgUrl, language }) => {
          const inputId = `${clientId}-client`;
          const onClick = () => setCurrentClient(clientId);

          return (
            <ImageSelectionBox
              fullWidthImg
              key={inputId}
              src={imgUrl}
              isActive={currentClient === clientId}
              onClick={onClick}
              text={name}
              language={language}
            />
          );
        })}
      </ClientOptionContainer>
      {ethClientStep === 'execution' && (
        <Link
          to="https://ethereum.org/en/developers/docs/nodes-and-clients/#execution-clients"
          primary
        >
          <FormattedMessage defaultMessage="View extensive client comparison" />
        </Link>
      )}
      <ClientDescriptionContainer>
        {clientDetails[currentClient]}
      </ClientDescriptionContainer>
      <Alert variant="warning" className="mt30 mb20">
        <Heading level={4} className="mb10">
          <FormattedMessage defaultMessage="Remember" />
        </Heading>
        <Text className="my10">
          <FormattedMessage defaultMessage="After client installation, ensure you are fully synced before submitting your staking deposit. This can take several days." />{' '}
          <Link primary inline to="/checklist">
            <FormattedMessage defaultMessage="Validator checklist" />
          </Link>
        </Text>
      </Alert>
    </Box>
  </Paper>
);

export default SelectClientSection;
