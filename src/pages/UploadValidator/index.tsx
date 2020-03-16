import React, { useState } from "react";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { Paper } from "../../components/Paper";
import { StoreState } from "../../store/reducers";
import {
  keyFile,
  ProgressStep,
  updateKeyFiles,
  updateProgress
} from "../../store/actions";
import { connect } from "react-redux";
import { StyledDropzone } from "./Dropzone";
import { routeToCorrectProgressStep } from "../../utils/RouteToCorrectProgressStep";
import { Button } from "../../components/Button";
import { rainbowMutedColors } from "../../styles/styledComponentsTheme";

interface Props {
  updateKeyFiles(files: keyFile[]): void;
  keyFiles: keyFile[];
  updateProgress: (step: ProgressStep) => void;
  progress: ProgressStep;
}

export const _UploadValidatorPage = ({
  keyFiles,
  updateKeyFiles,
  updateProgress,
  progress
}: Props): JSX.Element => {
  const fileAccepted = keyFiles.length > 0;

  const handleSubmit = () => {
    updateProgress(ProgressStep.CONNECT_WALLET);
  };

  if (progress !== ProgressStep.UPLOAD_VALIDATOR_FILE) {
    return routeToCorrectProgressStep(progress);
  }

  return (
    <WorkflowPageTemplate
      title="Upload Deposits"
      backgroundColor={rainbowMutedColors[3]}
    >
      <Paper>
        <StyledDropzone
          fileAccepted={fileAccepted}
          updateKeyFiles={updateKeyFiles}
          keyFiles={keyFiles}
        />
      </Paper>
      <div className="flex center p30">
        <Button
          className="mr10"
          width={100}
          label="Back"
          onClick={() => updateProgress(ProgressStep.GENERATE_KEY_PAIRS)}
        />
        <Button
          width={300}
          rainbow
          disabled={!fileAccepted}
          label="Continue"
          onClick={handleSubmit}
        />
      </div>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ keyFiles, progress }: StoreState) => ({
  keyFiles,
  progress
});
const mdtp = (dispatch: any) => ({
  updateKeyFiles: (files: keyFile[]): void => dispatch(updateKeyFiles(files)),
  updateProgress: (step: ProgressStep): void => {
    dispatch(updateProgress(step));
  }
});

export const UploadValidatorPage = connect(mstp, mdtp)(_UploadValidatorPage);
