import React, { useCallback, useState } from "react";
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
import { Box, Text } from "grommet";
import styled from "styled-components";
import { routeToCorrectProgressStep } from "../../utils/RouteToCorrectProgressStep";
import { Button } from "../../components/Button";
import { rainbowMutedColors } from "../../styles/styledComponentsTheme";

const BackBtn = styled(Text)`
  color: ${p => p.theme.gray.medium};
  cursor: pointer;
  margin-bottom: 10px;
  :hover {
    color: ${p => p.theme.gray.dark};
  }
`;
const Instructions = styled.span`
  font-weight: bold;
  :hover {
    color: ${p => p.theme.red.light};
    cursor: pointer;
  }
`;
const ErrorText = styled(Text)`
  width: 500px;
  margin: 20px auto auto;
  text-align: center;
`;

interface Props {
  updateKeyFiles(files: keyFile[]): void;

  keyFiles: keyFile[];
  updateProgress: (step: ProgressStep) => void;
  progress: ProgressStep;
}

const validateKeyFile = (files: keyFile[]): boolean => {
  let checked = true;
  files.forEach(file => {
    if (
      // check existence of required keys
      !("pubkey" in file) ||
      !("withdrawal_credentials" in file) ||
      !("amount" in file) ||
      !("signature" in file) ||
      !("deposit_data_root" in file) ||
      // check type
      typeof file.pubkey !== "string" ||
      typeof file.withdrawal_credentials !== "string" ||
      typeof file.amount !== "number" ||
      typeof file.signature !== "string" ||
      typeof file.deposit_data_root !== "string" ||
      // check length of strings
      file.pubkey.length !== 96 ||
      file.withdrawal_credentials.length !== 64 ||
      file.signature.length !== 192 ||
      file.deposit_data_root.length !== 64
    ) {
      checked = false;
    }
  });
  return checked;
};

export const _UploadValidatorPage = ({
  keyFiles,
  updateKeyFiles,
  updateProgress,
  progress
}: Props): JSX.Element => {
  const [fileAccepted, setFileAccepted] = useState(false);
  const [invalidKeyFile, setInvalidKeyFile] = useState(false);

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length === 1) {
        setInvalidKeyFile(false);
        setFileAccepted(true);
        const reader = new FileReader();
        reader.onload = event => {
          if (event.target) {
            const fileData = JSON.parse(event.target.result as string);
            if (validateKeyFile(fileData as keyFile[])) {
              updateKeyFiles(fileData);
            } else {
              setInvalidKeyFile(true);
            }
          }
        };
        reader.readAsText(acceptedFiles[0]);
      }
    },
    [setFileAccepted, updateKeyFiles]
  );

  const handleSubmit = () => {
    updateProgress(ProgressStep.CONNECT_WALLET);
  };

  const handleGoBack = () => {
    updateProgress(ProgressStep.GENERATE_KEY_PAIRS);
  };

  if (progress !== ProgressStep.UPLOAD_VALIDATOR_FILE) {
    return routeToCorrectProgressStep(progress);
  }

  return (
    <WorkflowPageTemplate title="Upload Deposits" backgroundColor={rainbowMutedColors[3]}>
      <Paper>
        <StyledDropzone
          fileAccepted={fileAccepted}
          keyFiles={keyFiles}
          onDrop={onDrop}
        />
        {invalidKeyFile && (
          <ErrorText color="redMedium">
            There was an error processing your key file. Please follow the
            instructions{" "}
            <Instructions onClick={handleGoBack}>here</Instructions> to generate
            your file.
          </ErrorText>
        )}

        <Box align="center" pad="large">
          <BackBtn onClick={handleGoBack}>Go Back</BackBtn>
          <Button
            width={300}
            rainbow
            disabled={!fileAccepted || invalidKeyFile}
            label="Continue"
            onClick={handleSubmit}
          />
        </Box>
      </Paper>
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
