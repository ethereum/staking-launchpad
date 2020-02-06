import React, { useState } from "react";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { Heading, Text } from "grommet";
import { Paper, PaperGroup } from "../../components/Paper";
import { OperatingSystems } from "./OperatingSystems";
import { LinuxInstructions } from "./LinuxInstructions";
import { MacInstructions } from "./MacInstructions";
import { WindowsInstructions } from "./WindowsInstructions";

export enum operatingSystem {
  "MAC",
  "LINUX",
  "WINDOWS"
}

export const GenerateKeysPage = (): JSX.Element => {
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
    </WorkflowPageTemplate>
  );
};
