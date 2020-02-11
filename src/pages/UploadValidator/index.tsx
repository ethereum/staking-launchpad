import React, { useState } from "react";
import { WorkflowPageTemplate } from "../../components/WorkflowPage/WorkflowPageTemplate";
import { Paper } from "../../components/Paper";
import { StoreState } from "../../store/reducers";
import { keyFile, updateKeyFiles } from "../../store/actions";
import { connect } from "react-redux";
import { StyledDropzone } from "./Dropzone";
import { Box, Button } from "grommet";
import { routesEnum } from "../../Routes";
import { Redirect } from "react-router-dom";

interface Props {
  updateKeyFiles(files: keyFile[]): void;
  keyFiles: keyFile[];
}

export const _UploadValidatorPage = ({
  keyFiles,
  updateKeyFiles
}: Props): JSX.Element => {
  const [fileAccepted, setFileAccepted] = useState(false);
  const [redirectToNextPage, setRedirectToNextPage] = useState(false);

  const handleSubmit = () => {
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
  updateKeyFiles: (files: keyFile[]): void => dispatch(updateKeyFiles(files))
});

export const UploadValidatorPage = connect(mstp, mdtp)(_UploadValidatorPage);
