import React, { useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Box, Button, CheckBox, Heading, Text } from "grommet";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { Paper, PaperGroup } from "../../components/Paper";
import { OperatingSystemButtons } from "./OperatingSystemButtons";
import { LinuxInstructions } from "./LinuxInstructions";
import { MacInstructions } from "./MacInstructions";
import { WindowsInstructions } from "./WindowsInstructions";
import { ProgressStep, updateProgress } from "../../store/actions";
import { routeToCorrectProgressStep } from "../../utils/RouteToCorrectProgressStep";
import { StoreState } from "../../store/reducers";

export enum operatingSystem {
  "MAC",
  "LINUX",
  "WINDOWS"
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
  progress
}: {
  updateProgress: () => void;
  progress: ProgressStep;
}): JSX.Element => {
  const [chosenOs, setChosenOs] = useState<operatingSystem>(
    operatingSystem.LINUX
  );

  const [agreedTo, setAgreedTo] = useState(false);

  const onCheckboxClick = (e: any) => {
    setAgreedTo(e.target.checked);
  };

  const handleSubmit = () => {
    updateProgress();
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

  if (progress !== ProgressStep.GENERATE_KEY_PAIRS) {
    return routeToCorrectProgressStep(progress);
  }

  return (
    <WorkflowPageTemplate title="Generate Key Pairs">
      <PaperGroup>
        <Paper>
          <Heading level={3} size="small" color="blueDark">
            How to generate the validator keys
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
          4. Save the key files and get the validator file ready
        </Heading>
        <Text>
          You should now be able to save the file{" "}
          <Highlight>signing-keystore-....json</Highlight> which contains your
          key pairs. Please make sure keep it safe, preferably offline.
        </Text>
        <InstructionImgContainer />
        <Text>
          The second file you will export is{" "}
          <Highlight>deposit_data.json</Highlight> - you will need to upload in
          the next step.
        </Text>
        <InstructionImgContainer />
      </Paper>
      <Paper className="mt20">
        <CheckBox
          onChange={onCheckboxClick}
          checked={agreedTo}
          label="I am keeping my keys safe and have backed up my mnemonic phrase."
        />
      </Paper>
      <Box align="center" pad="large">
        <Button
          primary
          disabled={!agreedTo}
          label="CONTINUE"
          onClick={handleSubmit}
        />
      </Box>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ progress }: StoreState) => ({
  progress
});

const mdtp = (dispatch: any) => ({
  updateProgress: (): void => {
    dispatch(updateProgress(ProgressStep.UPLOAD_VALIDATOR_FILE));
  }
});

export const GenerateKeysPage = connect(mstp, mdtp)(_GenerateKeysPage);
