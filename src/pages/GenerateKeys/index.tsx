import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { CheckBox, Heading, Text } from 'grommet';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper, PaperGroup } from '../../components/Paper';
import { OperatingSystemButtons } from './OperatingSystemButtons';
import { LinuxInstructions } from './LinuxInstructions';
import { MacInstructions } from './MacInstructions';
import { WindowsInstructions } from './WindowsInstructions';
import {
  ProgressStep,
  updateMnemonicAcknowledgement,
  updateProgress,
} from '../../store/actions';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';
import { StoreState } from '../../store/reducers';
import { Button } from '../../components/Button';
import { rainbowMutedColors } from '../../styles/styledComponentsTheme';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';

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

const _GenerateKeysPage = ({
  updateProgress,
  progress,
  mnemonicAcknowledgementChecked,
  updateMnemonicAcknowledgement,
}: {
  updateProgress: (progressStep: ProgressStep) => void;
  progress: ProgressStep;
  mnemonicAcknowledgementChecked: boolean;
  updateMnemonicAcknowledgement: (checked: boolean) => void;
}): JSX.Element => {
  const [chosenOs, setChosenOs] = useState<operatingSystem>(
    operatingSystem.LINUX
  );

  const onCheckboxClick = (e: any) => {
    updateMnemonicAcknowledgement(e.target.checked);
  };

  const handleSubmit = () => {
    if (progress === ProgressStep.GENERATE_KEY_PAIRS) {
      updateProgress(ProgressStep.UPLOAD_VALIDATOR_FILE);
    }
  };

  const renderOSInstructions = (): React.ReactNode => {
    switch (chosenOs) {
      case operatingSystem.LINUX:
        return <LinuxInstructions />;
      case operatingSystem.MAC:
        return <MacInstructions />;
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
    <WorkflowPageTemplate
      title="Generate Key Pairs"
      backgroundColor={rainbowMutedColors[2]}
    >
      <PaperGroup>
        <Paper>
          <Heading level={3} size="small" color="blueDark">
            How to generate your validator keys
          </Heading>
        </Paper>
        <Paper>
          <Heading level={3} size="small" color="blueMedium">
            1. What is your current operating system?
          </Heading>
          <Text>
            Choose your current OS so we can tailor the instructions for you.
          </Text>
          <OperatingSystemButtons
            chosenOs={chosenOs}
            setChosenOs={setChosenOs}
          />
        </Paper>
      </PaperGroup>
      {renderOSInstructions()}
      <Paper className="mt20">
        <Heading level={3} size="small" color="blueMedium">
          3. Save the key files and get the validator file ready
        </Heading>
        <Text>
          You should now be able to save the file{' '}
          <Highlight>signing-keystore-....json</Highlight> which contains your
          key pairs. Please make sure keep it safe, preferably offline.
        </Text>
        <InstructionImgContainer />
        <Text>
          The second file you will export is{' '}
          <Highlight>deposit_data.json</Highlight> - you will need to upload in
          the next step.
        </Text>
        <InstructionImgContainer />
      </Paper>
      <Paper className="mt20">
        <CheckBox
          onChange={onCheckboxClick}
          checked={mnemonicAcknowledgementChecked}
          label="I am keeping my keys safe and have backed up my mnemonic phrase."
        />
      </Paper>
      <div className="flex center p30">
        <Link to={routesEnum.validatorSettingsPage}>
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

const mstp = ({ progress, mnemonicAcknowledgementChecked }: StoreState) => ({
  progress,
  mnemonicAcknowledgementChecked,
});

const mdtp = (dispatch: any) => ({
  updateProgress: (progressStep: ProgressStep): void => {
    dispatch(updateProgress(progressStep));
  },
  updateMnemonicAcknowledgement: (checked: boolean): void => {
    dispatch(updateMnemonicAcknowledgement(checked));
  },
});

export const GenerateKeysPage = connect(mstp, mdtp)(_GenerateKeysPage);
