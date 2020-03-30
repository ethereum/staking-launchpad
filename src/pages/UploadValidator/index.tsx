import React, { useCallback, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { StyledDropzone } from './Dropzone';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';
import { routeToCorrectProgressStep } from '../../utils/RouteToCorrectProgressStep';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';
import { validateKeyFile } from './validateKeyFile';
import { StoreState } from '../../store/reducers';
import {
  DispatchUpdateKeyFilesType,
  KeyFileInterface,
  TransactionStatuses,
  updateKeyFiles
} from "../../store/actions/keyFileActions";
import {DispatchUpdateProgressType, ProgressStep, updateProgress} from "../../store/actions/progressActions";

// Styled components
const Instructions = styled(Link)`
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

// Prop definitions
interface OwnProps {}
interface StateProps {
  keyFiles: KeyFileInterface[];
  progress: ProgressStep;
}
interface DispatchProps {
  dispatchUpdateKeyFiles: DispatchUpdateKeyFilesType;
  dispatchUpdateProgress: DispatchUpdateProgressType;
}
type Props = StateProps & DispatchProps & OwnProps;

export const _UploadValidatorPage = ({
  keyFiles,
  dispatchUpdateKeyFiles,
  dispatchUpdateProgress,
  progress,
}: Props): JSX.Element => {
  const fileAccepted = keyFiles.length > 0;
  const [invalidKeyFile, setInvalidKeyFile] = useState(false);
  const handleSubmit = () => {
    if (progress === ProgressStep.UPLOAD_VALIDATOR_FILE) {
      dispatchUpdateProgress(ProgressStep.CONNECT_WALLET);
    }
  };

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length === 1) {
        setInvalidKeyFile(false);
        const reader = new FileReader();
        reader.onload = async event => {
          if (event.target) {
            try {
              const fileData = JSON.parse(event.target.result as string);
              if (await validateKeyFile(fileData as KeyFileInterface[])) {
                dispatchUpdateKeyFiles(
                  fileData.map((keyFile: KeyFileInterface) => ({
                    ...keyFile,
                    transactionStatus: TransactionStatuses.READY, // initialize each keyFile with ready state for transaction
                  }))
                );
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
    [dispatchUpdateKeyFiles]
  );

  if (progress < ProgressStep.UPLOAD_VALIDATOR_FILE)
    return routeToCorrectProgressStep(progress);

  return (
    <WorkflowPageTemplate title="Upload Deposits">
      <Paper>
        <StyledDropzone fileAccepted={fileAccepted} onDrop={onDrop} />
        {invalidKeyFile && (
          <ErrorText color="redMedium">
            There was an error processing your key file. Please follow the
            instructions
            <Instructions to={routesEnum.generateKeysPage}>here</Instructions>
            to generate your file.
          </ErrorText>
        )}
      </Paper>
      <div className="flex center p30">
        <Link to={routesEnum.generateKeysPage}>
          <Button className="mr10" width={100} label="Back" />
        </Link>
        <Link to={routesEnum.connectWalletPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!fileAccepted}
            label="Continue"
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

// Map redux to component props
const mapStateToProps = (state: StoreState): StateProps => ({
  keyFiles: state.keyFiles,
  progress: state.progress,
});
const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchUpdateKeyFiles: files => dispatch(updateKeyFiles(files)),
  dispatchUpdateProgress: step => dispatch(updateProgress(step)),
});

export const UploadValidatorPage = connect<
  StateProps,
  DispatchProps,
  OwnProps,
  StoreState
>(
  mapStateToProps,
  mapDispatchToProps
)(_UploadValidatorPage);
