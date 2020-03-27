import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CheckBox } from 'grommet';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';
import { OperatingSystemButtons } from './OperatingSystemButtons';
import { LinuxInstructions } from './LinuxInstructions';
import { MacInstructions } from './MacInstructions';
import { WindowsInstructions } from './WindowsInstructions';
import { ProgressStep, updateProgress } from '../../store/actions';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';
import { StoreState } from '../../store/reducers';
import { Button } from '../../components/Button';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';
import { Text } from '../../components/Text';
import { Heading } from '../../components/Heading';
import { NumberInput } from './NumberInput';
import { InfoBox } from '../../components/InfoBox';
import { pricePerValidator } from '../../enums';

export enum operatingSystem {
  'MAC',
  'LINUX',
  'WINDOWS',
}

const Highlight = styled.span`
  color: ${p => p.theme.blue.medium};
`;

// TODO: Add an actual image to this container
const InstructionImgContainer = styled.div`
  height: 250px;
  border: 1px solid black;
  margin: 20px;
`;

interface GenerateKeysPageProps {
  updateProgress: (progressStep: ProgressStep) => void;
  progress: ProgressStep;
}

const _GenerateKeysPage = ({
  updateProgress,
  progress,
}: GenerateKeysPageProps): JSX.Element => {
  const [validatorCount, setValidatorCount] = useState<number>(0);
  const [
    mnemonicAcknowledgementChecked,
    setMnemonicAcknowledgementChecked,
  ] = useState<boolean>(progress > ProgressStep.GENERATE_KEY_PAIRS);
  const [chosenOs, setChosenOs] = useState<operatingSystem>(
    operatingSystem.LINUX
  );

  const onCheckboxClick = (e: any) => {
    setMnemonicAcknowledgementChecked(e.target.checked);
  };

  const handleSubmit = () => {
    if (progress === ProgressStep.GENERATE_KEY_PAIRS) {
      updateProgress(ProgressStep.UPLOAD_VALIDATOR_FILE);
    }
  };

  const renderOSInstructions = (): React.ReactNode => {
    switch (chosenOs) {
      case operatingSystem.LINUX:
        return <LinuxInstructions validatorCount={validatorCount} />;
      case operatingSystem.MAC:
        return <MacInstructions validatorCount={validatorCount} />;
      case operatingSystem.WINDOWS:
        return <WindowsInstructions />;
      default:
        return null;
    }
  };

  if (progress < ProgressStep.GENERATE_KEY_PAIRS) {
    return routeToCorrectProgressStep(progress);
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
          <div className="ml20">
            <Text className="mb5">Cost</Text>
            <InfoBox>
              <Text>{(validatorCount * pricePerValidator).toFixed(1)} ETH</Text>
            </InfoBox>
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
          You should now be able to save the file
          <Highlight>signing-keystore-....json</Highlight> which contains your
          key pairs. Please make sure keep it safe, preferably offline.
        </Text>
        <InstructionImgContainer />
        <Text>
          The second file you will export is
          <Highlight>deposit_data.json</Highlight> - you will need to upload in
          the next step.
        </Text>
        <InstructionImgContainer />
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

const mstp = ({ progress }: StoreState) => ({
  progress,
});

const mdtp = (dispatch: any) => ({
  updateProgress: (progressStep: ProgressStep): void => {
    dispatch(updateProgress(progressStep));
  },
});

export const GenerateKeysPage = connect(mstp, mdtp)(_GenerateKeysPage);
