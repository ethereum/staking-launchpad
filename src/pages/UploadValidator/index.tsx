import React, { SyntheticEvent, useCallback, useEffect, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { useDropzone } from 'react-dropzone';
import { Close } from 'grommet-icons';
import { WorkflowPageTemplate } from '../../components/WorkflowPage/WorkflowPageTemplate';
import { Paper } from '../../components/Paper';
import { Button } from '../../components/Button';
import { Text } from '../../components/Text';
import { routesEnum } from '../../Routes';
import { Link } from '../../components/Link';
import { validateKeyFile } from './validateKeyFile';
import { StoreState } from '../../store/reducers';
import {
  DispatchKeyFilesUpdateType,
  KeyFileInterface,
  TransactionStatus,
  updateKeyFiles,
} from '../../store/actions/keyFileActions';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { FileUploadAnimation } from './FileUploadAnimation';
import SubtleEthDiamonds from '../../static/subtle-eth-diamonds.svg';

const Container = styled(Paper)`
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;
const Dropzone = styled.div`
  outline: none;
  :focus {
    outline: none;
  }
  border: 1px solid lightgray;
  width: 500px;
  margin: auto;
  cursor: ${(p: { invalidFile: boolean; fileAccepted: boolean }) =>
    p.invalidFile || p.fileAccepted ? 'inherit' : 'pointer'};
  box-shadow: ${(p: { theme: any }) => `0 0 10px ${p.theme.gray.light}`};
  padding: 30px;
  border-radius: ${(p: { theme: any }) => p.theme.borderRadius};
  background-image: url(${SubtleEthDiamonds});
  background-repeat: repeat-x;
`;
const UploadText = styled(Text)`
  color: ${(p: { theme: any }) => p.theme.blue.medium};
  display: inline-block;
`;
const DeleteBtn = styled.span`
  cursor: pointer;
  :hover {
    color: black;
  }
  padding: 3px;
`;

interface OwnProps {}
interface StateProps {
  keyFiles: KeyFileInterface[];
  workflow: WorkflowStep;
}

interface DispatchProps {
  dispatchKeyFilesUpdate: DispatchKeyFilesUpdateType;
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

export const _UploadValidatorPage = ({
  keyFiles,
  dispatchKeyFilesUpdate,
  dispatchWorkflowUpdate,
  workflow,
}: Props): JSX.Element => {
  const fileAccepted = keyFiles.length > 0;
  const [invalidFile, setInvalidFile] = useState(false);
  const defaultMessage = (
    <div>
      Drag file to upload or <UploadText>browse</UploadText>
    </div>
  );
  const [message, setMessage] = useState(defaultMessage);
  const [activeFileName, setActiveFileName] = useState('');

  const onDrop = useCallback(
    acceptedFiles => {
      if (acceptedFiles.length === 1) {
        setInvalidFile(false);
        setActiveFileName(acceptedFiles[0].name);
        const reader = new FileReader();
        reader.onload = async event => {
          if (event.target) {
            try {
              const fileData = JSON.parse(event.target.result as string);
              if (await validateKeyFile(fileData as KeyFileInterface[])) {
                dispatchKeyFilesUpdate(
                  fileData.map((keyFile: KeyFileInterface) => ({
                    ...keyFile,
                    transactionStatus: TransactionStatus.READY, // initialize each keyFile with ready state for transaction
                  }))
                );
              } else {
                setInvalidFile(true);
              }
            } catch (e) {
              setInvalidFile(true);
            }
          }
        };
        reader.readAsText(acceptedFiles[0]);
      }
    },
    [dispatchKeyFilesUpdate]
  );

  const handleFileDelete = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatchKeyFilesUpdate([]);
    setInvalidFile(false);
  };

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop,
    accept: 'application/json',
    noClick: fileAccepted || invalidFile,
  });

  useEffect(() => {
    if (fileAccepted) {
      setTimeout(
        () =>
          setMessage(
            <div className="flex center">
              <DeleteBtn onClick={handleFileDelete}>
                <Close size="15px" className="mr10" />
              </DeleteBtn>
              <Text>{activeFileName}</Text>
            </div>
          ),
        800
      );
      return;
    }

    if (!isDragActive) {
      if (invalidFile) {
        setMessage(
          <div className="flex center">
            <DeleteBtn onClick={handleFileDelete}>
              <Close size="15px" className="mr10" />
            </DeleteBtn>
            <Text>{activeFileName} is invalid</Text>
          </div>
        );
        return;
      }
      setMessage(defaultMessage);
      return;
    }

    if (isDragActive) {
      if (isDragReject) {
        setTimeout(
          () => setMessage(<Text>Please upload a valid json file</Text>),
          800
        );
      }
    }
  }, [fileAccepted, invalidFile, isDragReject, isDragActive]);

  const handleSubmit = () => {
    if (workflow === WorkflowStep.UPLOAD_VALIDATOR_FILE) {
      dispatchWorkflowUpdate(WorkflowStep.CONNECT_WALLET);
    }
  };

  // if (workflow < WorkflowStep.UPLOAD_VALIDATOR_FILE)
  //   return routeToCorrectWorkflowStep(workflow);

  return (
    <WorkflowPageTemplate title="Upload Deposit File">
      <Container className="mt20">
        <Text className="mb20">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industrys standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electron
        </Text>
        <Dropzone
          fileAccepted={fileAccepted}
          invalidFile={invalidFile}
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <FileUploadAnimation
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            fileAccepted={fileAccepted}
            isDragActive={isDragActive}
            invalidFile={invalidFile}
          />

          <Text className="mt20" textAlign="center">
            {message}
          </Text>
        </Dropzone>
      </Container>

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

const mapStateToProps = (state: StoreState): StateProps => ({
  keyFiles: state.keyFiles,
  workflow: state.workflow,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchKeyFilesUpdate: files => dispatch(updateKeyFiles(files)),
  dispatchWorkflowUpdate: step => dispatch(updateWorkflow(step)),
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
