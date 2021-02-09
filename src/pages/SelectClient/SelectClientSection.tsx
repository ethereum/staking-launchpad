import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { Link } from '../../components/Link';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { ImageSelectionBox } from '../../components/ImageSelectionBox';
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
  ethVersionStep: number;
};

const SelectClientSection = ({
  title,
  clients,
  currentClient,
  setCurrentClient,
  clientDetails,
  ethVersionStep,
}: Props): JSX.Element => (
  <Paper>
    <Heading level={3} size="small" color="blueDark" className="mb20">
      {title}
    </Heading>
    {ethVersionStep === 1 && (
      <div style={{ paddingBottom: '1rem' }}>
        To process incoming validator deposits from mainnet (the Eth1 chain),
        you'll need to run an Eth1 client in parallel to your Eth2 client. While
        you can use a third-party service like Infura, we recommend running your
        own client in order to ensure the network stays as decentralised as
        possible.
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
      {ethVersionStep === 1 && (
        <Link
          to="https://ethereum.org/en/developers/docs/nodes-and-clients/#clients"
          primary
        >
          View extensive client comparison
        </Link>
      )}
      <ClientDescriptionContainer>
        {clientDetails[currentClient]}
      </ClientDescriptionContainer>
    </Box>
  </Paper>
);

export default SelectClientSection;
