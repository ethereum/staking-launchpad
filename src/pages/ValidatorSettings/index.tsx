import React, { useState } from "react";
import { Box, Button, Heading, Text } from "grommet";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { Paper } from "../../components/Paper";
import { NumberInput } from "./NumberInput";
import { CircleAlert } from "./CircleAlert";
import { routesEnum } from "../../Routes";
import { StoreState } from "../../store/reducers";
import { updateValidatorCount } from "../../store/actions";
import { connect } from "react-redux";

const warnings: string[] = [
  "Please make sure you send exactly 32 ETH per validator, excluding fees.",
  "Transactions with less than 32 ETH will need to be topped up to run a validator.",
  "You will sign a separate transaction for each validator."
];

const EthAmountContainer = styled.div`
  border: 1px solid #ddd;
  padding: 12px 10px;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  padding: 0 10px;
`;

interface Props {
  updateValidatorCount(count: number): void;
  validatorCount: number;
}

const _ValidatorSettingsPage = ({
  validatorCount,
  updateValidatorCount
}: Props): JSX.Element => {
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const handleSubmit = () => {
    if (validatorCount > 0) {
      setShouldRedirect(true);
    }
  };

  if (shouldRedirect) {
    return <Redirect to={routesEnum.GenerateKeysPage} />;
  }

  return (
    <WorkflowPageTemplate title="Validator Settings">
      <Paper>
        <Heading level={3} size="small" color="brand">
          How many validators would you like to run?
        </Heading>
        <div className="flex">
          <Container>
            <Text weight="bold">Validators</Text>
            <NumberInput
              value={validatorCount}
              setValue={updateValidatorCount}
            />
          </Container>
          <Container>
            <Text weight="bold">Cost</Text>
            <EthAmountContainer>
              <Text>{validatorCount * 32} ETH</Text>
            </EthAmountContainer>
          </Container>
        </div>
      </Paper>
      <Paper error className="mt20">
        {warnings.map(warning => (
          <div className="flex my10" key={warning}>
            <CircleAlert />
            <Text size="medium" className="ml10" weight="bold">
              {warning}
            </Text>
          </div>
        ))}
      </Paper>
      <Box align="center" pad="large">
        <Button
          primary
          disabled={validatorCount <= 0}
          label="GENERATE MY KEYPAIR(S)"
          onClick={handleSubmit}
        />
      </Box>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ validatorCount }: StoreState) => ({
  validatorCount
});
const mdtp = (dispatch: any) => ({
  updateValidatorCount: (count: number): void => {
    dispatch(updateValidatorCount(count));
  }
});

export const ValidatorSettingsPage = connect(
  mstp,
  mdtp
)(_ValidatorSettingsPage);
