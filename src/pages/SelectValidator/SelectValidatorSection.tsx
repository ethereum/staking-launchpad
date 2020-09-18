import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { ImageSelectionBox } from '../../components/ImageSelectionBox';

const ValidatorOptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & label {
    display: inline-block;
    padding: 1rem;
    margin: 30px 0;
    border-radius: 4px;
    background: #fcfcfc;
    border: 1px solid #ececec;
    flex: 0.8;
  }
`;

const ValidatorDescriptionContainer = styled.div`
  width: 100%;
  border-radius: 4px;
  background: #fcfcfc;
  border: 1px solid #ececec;
  margin-top: 30px;
  padding: 1rem 2rem;
`;

type Client = { name: string; imgUrl: string };

type Props = {
  title?: string;
  clients: Array<Client>;
  currentValidator: string;
  setCurrentValidator: (validator: string) => void;
  clientDetails: { [client: string]: React.ReactElement };
};

const SelectValidatorSection = ({
  title,
  clients,
  currentValidator,
  setCurrentValidator,
  clientDetails,
}: Props): JSX.Element => (
  <Paper>
    <Heading level={3} size="small" color="blueDark" className="mb20">
      {title}
    </Heading>
    <Box className="flex flex-column space-between mt10">
      <ValidatorOptionContainer>
        {clients.map(({ name, imgUrl }) => {
          const inputId = `${name}-validator`;
          const onChange = () => setCurrentValidator(name);

          return (
            <ImageSelectionBox
              fullWidthImg
              key={inputId}
              src={imgUrl}
              isActive={currentValidator === name}
              onClick={onChange}
              text={name}
            />
          );
        })}
      </ValidatorOptionContainer>
      <ValidatorDescriptionContainer>
        {clientDetails[currentValidator]}
      </ValidatorDescriptionContainer>
    </Box>
  </Paper>
);

export default SelectValidatorSection;
