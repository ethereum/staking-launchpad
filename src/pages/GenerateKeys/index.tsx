import React, { useState } from "react";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { Box, Button, Heading, Text } from "grommet";
import { Paper, PaperGroup } from "../../components/Paper";
import { OperatingSystems } from "./OperatingSystems";
import { LinuxInstructions } from "./LinuxInstructions";
import { MacInstructions } from "./MacInstructions";
import { WindowsInstructions } from "./WindowsInstructions";
import { Redirect } from "react-router-dom";
import { routesEnum } from "../../Routes";

export enum operatingSystem {
  "MAC",
  "LINUX",
  "WINDOWS"
}

export const GenerateKeysPage = (): JSX.Element => {
  const [goToNextPage, setGoToNextPage] = useState(false);

  const [chosenOs, setChosenOs] = useState<operatingSystem>(
    operatingSystem.LINUX
  );

  const renderInstructions = (): React.ReactNode => {
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

  if (goToNextPage) {
    return <Redirect to={routesEnum.UploadValidatorPage} />;
  }

  return (
    <WorkflowPageTemplate title="Generate Key Pairs">
      <PaperGroup>
        <Paper>
          <Heading level={3} size="small" color="brand">
            How to generate the validator keys
          </Heading>
        </Paper>
        <Paper>
          <Heading level={3} size="small" color="brand">
            What is your current operating system?
          </Heading>
          <Text>
            Choose your current OS so we can tailor the instructions for you.
          </Text>
          <OperatingSystems chosenOs={chosenOs} setChosenOs={setChosenOs} />
        </Paper>
      </PaperGroup>
      {renderInstructions()}
      <Box align="center" pad="large">
        <Button
          primary
          label="CONTINUE"
          onClick={() => setGoToNextPage(true)}
        />
      </Box>
    </WorkflowPageTemplate>
  );
};
