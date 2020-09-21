import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
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
};

const SelectClientSection = ({
  title,
  clients,
  currentClient,
  setCurrentClient,
  clientDetails,
}: Props): JSX.Element => (
  <Paper>
    <Heading level={3} size="small" color="blueDark" className="mb20">
      {title}
    </Heading>
    <Box className="flex flex-column space-between mt10">
      <ClientOptionContainer>
        {clients.map(({ clientId, name, imgUrl }) => {
          const inputId = `${clientId}-client`;
          const onClick = () => setCurrentClient(clientId);

          return (
            <ImageSelectionBox
              style={{ margin: '0 5px' }}
              fullWidthImg
              key={inputId}
              src={imgUrl}
              isActive={currentClient === clientId}
              onClick={onClick}
              text={name}
            />
          );
        })}
      </ClientOptionContainer>
      <ClientDescriptionContainer>
        {clientDetails[currentClient]}
      </ClientDescriptionContainer>
    </Box>
  </Paper>
);

export default SelectClientSection;
