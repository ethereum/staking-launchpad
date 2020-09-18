import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';
import { ImageSelectionBox } from '../../components/ImageSelectionBox';
import { Client } from './index';
import { ValidatorId } from '../../store/actions/validatorActions';

const ValidatorOptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const ValidatorDescriptionContainer = styled.div`
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
  currentValidator: ValidatorId;
  setCurrentValidator: (validator: ValidatorId) => void;
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
        {clients.map(({ validatorId, name, imgUrl }) => {
          const inputId = `${validatorId}-validator`;
          const onClick = () => setCurrentValidator(validatorId);

          return (
            <ImageSelectionBox
              style={{ margin: '0 5px' }}
              fullWidthImg
              key={inputId}
              src={imgUrl}
              isActive={currentValidator === validatorId}
              onClick={onClick}
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
