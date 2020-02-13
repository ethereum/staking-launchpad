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
import { Box, Button, Text } from "grommet";
import { routesEnum } from "../../Routes";
import { Redirect } from "react-router-dom";
import styled from "styled-components";

const BackBtn = styled(Text)`
  color: ${p => p.theme.gray20};
  cursor: pointer;
  :hover {
    color: ${p => p.theme.gray};
  }
`;

interface Props {
  updateKeyFiles(files: keyFile[]): void;
  keyFiles: keyFile[];
  updateProgress: (step: ProgressStep) => void;
}

export const _UploadValidatorPage = ({
  keyFiles,
  updateKeyFiles,
  updateProgress
}: Props): JSX.Element => {
  const [fileAccepted, setFileAccepted] = useState(false);
  const [redirectToNextPage, setRedirectToNextPage] = useState(false);

  const handleSubmit = () => {
    updateProgress(ProgressStep.CONNECT_WALLET);
    setRedirectToNextPage(true);
  };

  const handleGoBack = () => {
    updateProgress(ProgressStep.GENERATE_KEY_PAIRS);
    setRedirectToNextPage(true);
  };

  if (redirectToNextPage) {
    return <Redirect to={routesEnum.ConnectWalletPage} />;
  }

  return (
    <WorkflowPageTemplate title="Upload Key File">
      <Paper>
        <StyledDropzone
          fileAccepted={fileAccepted}
          setFileAccepted={setFileAccepted}
          updateKeyFiles={updateKeyFiles}
          keyFiles={keyFiles}
        />

        <Box align="center" pad="large">
          <BackBtn onClick={handleGoBack}>Go Back</BackBtn>
          <Button
            primary
            disabled={!fileAccepted}
            label="Continue"
            onClick={handleSubmit}
          />
        </Box>
      </Paper>
    </WorkflowPageTemplate>
  );
};

const mstp = ({ keyFiles }: StoreState) => ({
  keyFiles
});
const mdtp = (dispatch: any) => ({
  updateKeyFiles: (files: keyFile[]): void => dispatch(updateKeyFiles(files)),
  updateProgress: (step: ProgressStep): void => {
    dispatch(updateProgress(step));
  }
});

export const UploadValidatorPage = connect(mstp, mdtp)(_UploadValidatorPage);
