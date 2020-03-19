import React from 'react';
import { Heading, Text } from 'grommet';
import styled from 'styled-components';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';
import { NumberInput } from './NumberInput';
import { CircleAlert } from './CircleAlert';
import { StoreState } from '../../store/reducers';
import {
  ProgressStep,
  updateProgress,
  updateValidatorCount,
} from '../../store/actions';
import { connect } from 'react-redux';
import { InfoBox } from '../../components/InfoBox';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';
import { Button } from '../../components/Button';
import { rainbowMutedColors } from '../../styles/styledComponentsTheme';
import { pricePerValidator } from '../../enums';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';

const warnings: string[] = [
  `Transactions with less than ${pricePerValidator} ETH will need to be topped up to run a validator.`,
  'You will sign a separate transaction for each validator.',
];

const Container = styled.div`
  width: 100%;
  padding: 0 10px;
`;

interface Props {
  updateValidatorCount(count: number): void;
  validatorCount: number;
  updateProgress: (step: ProgressStep) => void;
  progress: ProgressStep;
}

const _ValidatorSettingsPage = ({
  validatorCount,
  updateValidatorCount,
  updateProgress,
  progress,
}: Props): JSX.Element => {
  const handleSubmit = () => {
    if (progress === ProgressStep.VALIDATOR_SETTINGS) {
      updateProgress(ProgressStep.GENERATE_KEY_PAIRS);
    }
  };

  if (progress < ProgressStep.VALIDATOR_SETTINGS) {
    return routeToCorrectProgressStep(progress);
  }

  return (
    <WorkflowPageTemplate
      title="Validator Settings"
      backgroundColor={rainbowMutedColors[1]}
    >
      <Paper>
        <Heading level={3} size="small" color="blueDark">
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
            <InfoBox>
              <Text>{(validatorCount * pricePerValidator).toFixed(1)} ETH</Text>
            </InfoBox>
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
      <div className="flex center p30">
        <Link to={routesEnum.acknowledgementPage}>
          <Button className="mr10" width={100} label="Back" />
        </Link>
        <Link to={routesEnum.generateKeysPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={validatorCount <= 0}
            label={`GENERATE MY KEYPAIR${validatorCount > 1 ? 'S' : ''}`}
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ validatorCount, progress }: StoreState) => ({
  validatorCount,
  progress,
});
const mdtp = (dispatch: any) => ({
  updateValidatorCount: (count: number): void => {
    dispatch(updateValidatorCount(count));
  },
  updateProgress: (step: ProgressStep): void => {
    dispatch(updateProgress(step));
  },
});

export const ValidatorSettingsPage = connect(
  mstp,
  mdtp
)(_ValidatorSettingsPage);
