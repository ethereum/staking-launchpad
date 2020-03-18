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
import { verifySignature } from "../../utils/verifySignature";
import _every from "lodash/every";
import { initBLS } from "@chainsafe/bls";

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

const validateKeyFile = async (files: keyFile[]): Promise<boolean> => {
  await initBLS();

  if (!Array.isArray(files)) return false;
  if (files.length <= 0) return false;

  const keyfileStatuses: boolean[] = files.map(file => {
    const {
      pubkey,
      withdrawal_credentials,
      amount,
      signature,
      deposit_data_root
    } = file;

    // check existence of required keys
    if (
      !pubkey ||
      !withdrawal_credentials ||
      !amount ||
      !signature ||
      !deposit_data_root
    ) {
      return false;
    }

    // check type of values
    if (
      typeof pubkey !== "string" ||
      typeof withdrawal_credentials !== "string" ||
      typeof amount !== "number" ||
      typeof signature !== "string" ||
      typeof deposit_data_root !== "string"
    ) {
      return false;
    }

    // check length of strings
    if (
      pubkey.length !== 96 ||
      withdrawal_credentials.length !== 64 ||
      signature.length !== 192 ||
      deposit_data_root.length !== 64
    ) {
      return false;
    }

    // perform BLS check
    return verifySignature(pubkey, signature, deposit_data_root);
  });
  return _every(keyfileStatuses);
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
        const reader = new FileReader();
        reader.onload = async event => {
          if (event.target) {
            try {
              const fileData = JSON.parse(event.target.result as string);
              if (await validateKeyFile(fileData as keyFile[])) {
                setFileAccepted(true);
                updateKeyFiles(fileData);
              } else {
                setInvalidKeyFile(true);
              }
            } catch (e) {
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
    <WorkflowPageTemplate
      title="Upload Deposits"
      backgroundColor={rainbowMutedColors[3]}
    >
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
