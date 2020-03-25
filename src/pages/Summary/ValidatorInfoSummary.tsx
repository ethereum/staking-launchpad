import React from 'react';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { connect } from 'react-redux';
import { Box } from 'grommet';
import { Paper } from '../../components/Paper';
import { InfoBox } from '../../components/InfoBox';
import { Heading } from '../../components/Heading';
import { Text } from '../../components/Text';
import { pricePerValidator } from '../../enums';
import { StoreState } from '../../store/reducers';
import { KeyFileInterface } from '../../store/actions';

const Container = styled.div`
  width: 100%;
`;

interface ValidatorInfoSummaryProps {
  keyFiles: KeyFileInterface[];
}

const _ValidatorInfoSummary = ({
  keyFiles,
}: ValidatorInfoSummaryProps): JSX.Element => {
  const amountValidators = new BigNumber(keyFiles.length);
  const convertedPrice = new BigNumber(pricePerValidator);

  return (
    <Paper>
      <Heading level={3} size="small" color="blueDark">
        Deposit Ceremony Summary
      </Heading>
      <Box className="flex flex-row space-between mt10">
        <Container>
          <Text>Validators</Text>
          <InfoBox>{amountValidators.toString()}</InfoBox>
        </Container>
        <Container className="mx20">
          <Text>Total Amount Required</Text>
          <InfoBox>
            {amountValidators.times(convertedPrice).toString()}
            ETH
          </InfoBox>
        </Container>
        <Container>
          <Text>Key Pairs Generated</Text>
          <InfoBox>{amountValidators.toString()}</InfoBox>
        </Container>
      </Box>
    </Paper>
  );
};

const mstp = ({ keyFiles }: StoreState) => ({
  keyFiles,
});

export const ValidatorInfoSummary = connect(mstp)(_ValidatorInfoSummary);
