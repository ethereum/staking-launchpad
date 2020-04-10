import React, { useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import BigNumber from 'bignumber.js';
import { CheckBox } from 'grommet';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';
import { OperatingSystemButtons } from './OperatingSystemButtons';
import { LinuxInstructions } from './LinuxInstructions';
import { MacInstructions } from './MacInstructions';
import { WindowsInstructions } from './WindowsInstructions';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';
import { StoreState } from '../../store/reducers';
import { Button } from '../../components/Button';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
import { NumberInput } from './NumberInput';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { PRICE_PER_VALIDATOR } from '../../utils/envVars';
import instructions1 from '../../static/instructions_1.svg';
import instructions2 from '../../static/instructions_2.svg';

export enum operatingSystem {
  'MAC',
  'LINUX',
  'WINDOWS',
}

const Highlight = styled.span`
  color: ${p => p.theme.blue.medium};
  margin-left: 5px;
`;

const InstructionImgContainer = styled.div`
  height: 250px;
  margin: 20px;
  border: 1px solid ${(p: any) => p.theme.gray.medium};
  border-radius: 4px;
  display: flex;
  justify-content: center;
`;

// Prop definitions
interface OwnProps {}
interface StateProps {
  workflow: WorkflowStep;
}
interface DispatchProps {
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _GenerateKeysPage = ({
  dispatchWorkflowUpdate,
  workflow,
}: Props): JSX.Element => {
  const [validatorCount, setValidatorCount] = useState<number | string>(0);
  const [
    mnemonicAcknowledgementChecked,
    setMnemonicAcknowledgementChecked,
  ] = useState<boolean>(workflow > WorkflowStep.GENERATE_KEY_PAIRS);
  const [chosenOs, setChosenOs] = useState<operatingSystem>(
    operatingSystem.LINUX
  );

  const onCheckboxClick = (e: any) => {
    setMnemonicAcknowledgementChecked(e.target.checked);
  };

  const handleSubmit = () => {
    if (workflow === WorkflowStep.GENERATE_KEY_PAIRS) {
      dispatchWorkflowUpdate(WorkflowStep.UPLOAD_VALIDATOR_FILE);
    }
  };

  const renderOSInstructions = (): React.ReactNode => {
    switch (chosenOs) {
      case operatingSystem.LINUX:
        return <LinuxInstructions validatorCount={validatorCount} />;
      case operatingSystem.MAC:
        return <MacInstructions validatorCount={validatorCount} />;
      case operatingSystem.WINDOWS:
        return <WindowsInstructions validatorCount={validatorCount} />;
      default:
        return null;
    }
  };

  if (workflow < WorkflowStep.GENERATE_KEY_PAIRS) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate title="Generate Key Pairs">
      <Paper>
        <Heading level={3} size="small" color="blueDark">
          1. How many validators would you like to run?
        </Heading>
        <div className="flex mt20">
          <div>
            <Text className="mb5">Validators</Text>
            <NumberInput value={validatorCount} setValue={setValidatorCount} />
          </div>
          <div className="ml50">
            <Text className="mb5">Cost</Text>
            <Text>
              {validatorCount === ''
                ? validatorCount
                : new BigNumber(validatorCount)
                    .times(new BigNumber(PRICE_PER_VALIDATOR))
                    .toFixed(1)
                    .toString()}{' '}
              ETH
            </Text>
          </div>
        </div>
      </Paper>
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          2. What is your current operating system?
        </Heading>
        <Text className="mt20">
          Choose your current OS so we can tailor the instructions for you.
        </Text>
        <OperatingSystemButtons chosenOs={chosenOs} setChosenOs={setChosenOs} />
      </Paper>

      {renderOSInstructions()}

      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          4. Save the key files and get the validator file ready
        </Heading>
        <Text className="mt20">
          You should now be able to save a
          <Highlight>signing-keystore-....json</Highlight> file for each
          validator, which contains your key pairs. Please make sure keep these
          safe, preferably offline.
        </Text>
        <InstructionImgContainer>
          <img src={instructions1} alt="" />
        </InstructionImgContainer>
        <Text>
          The second file you will export is
          <Highlight>deposit_data.json</Highlight> - you will need to upload in
          the next step.
        </Text>
        <InstructionImgContainer>
          <img src={instructions2} alt="" />
        </InstructionImgContainer>
      </Paper>
      <Paper className="mt20">
        <CheckBox
          onChange={onCheckboxClick}
          checked={mnemonicAcknowledgementChecked}
          label={
            <Text>
              I am keeping my keys safe and have backed up my mnemonic phrase.
            </Text>
          }
        />
      </Paper>

      <div className="flex center p30">
        <Link to={routesEnum.acknowledgementPage}>
          <Button className="mr10" width={100} label="Back" />
        </Link>
        <Link to={routesEnum.uploadValidatorPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!mnemonicAcknowledgementChecked}
            label="Continue"
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = ({ workflow }: StoreState): StateProps => ({
  workflow,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchWorkflowUpdate: (workflowStep: WorkflowStep) => {
    dispatch(updateWorkflow(workflowStep));
  },
});

export const GenerateKeysPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_GenerateKeysPage);
