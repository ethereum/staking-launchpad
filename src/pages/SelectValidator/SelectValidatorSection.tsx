import React from 'react';
import styled from 'styled-components';
import { Box } from 'grommet';
import { Paper } from '../../components/Paper';
import { Heading } from '../../components/Heading';

const radioProps = {
  type: 'radio',
  name: 'eth-validator',
};

const ValidatorOptionContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;

  & label {
    display: inline-block;
    padding: 1rem;
    border-radius: 4px;
    background: #fcfcfc;
    border: 1px solid #ececec;
    flex: 0.8;
    .active {
      background: #e7f3f1;
      border-color: #c7d3d1;
    }
  }

  & img {
    background: black;
    max-width: 100%;
    border-radius: 4;
    border: 1px solid #c7d3d1;
  }

  & input {
    display: none;
  }
`;

const ValidatorDescriptionContainer = styled.div`
  width: 100%;
  border-radius: 4;
  background: #fcfcfc;
  border: 1px solid #ececec;
  margin-top: 30px;
  padding: 1rem 2rem;
`;

type Client = { name: string; imgUrl: string };

type Props = {
  title: string;
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
    <Heading level={3} size="small" color="blueDark">
      {title}
    </Heading>
    <Box className="flex flex-column space-between mt10">
      <ValidatorOptionContainer>
        {clients.map(({ name, imgUrl }) => {
          const onChange = () => setCurrentValidator(name);
          return (
            <label htmlFor={`${name}-validator`} className="my30">
              <img src={imgUrl} alt={`${name} validator option`} />
              <input
                id={`${name}-validator`}
                {...{ onChange }}
                {...radioProps}
              />
            </label>
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
