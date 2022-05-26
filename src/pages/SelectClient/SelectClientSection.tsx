import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { FormattedMessage } from 'react-intl';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { ImageSelectionBox } from '../../components/ImageSelectionBox';
import { Alert } from '../../components/Alert';
import { Client } from './index';
import { ClientId } from '../../store/actions/clientActions';

const ClientOptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
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
          consensus client (formerly 'Eth2'). You can use a third-party service
          like Infura, but we recommend running your own client to
          keep the network as decentralized as possible."
        />
      </div>
    )}
    <Box className="flex flex-column space-between mt10">
      <ClientOptionContainer>
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
        <FormattedMessage defaultMessage="All stakers must operate an execution layer client as well as a consensus layer client starting at the Merge. Make sure you're prepared." />
        <Link primary to="#merge-readiness" className="mt10">
          <FormattedMessage defaultMessage="Merge Readiness Checklist" />
        </Link>
      </Alert>
    </Box>
  </Paper>
);

export default SelectClientSection;
