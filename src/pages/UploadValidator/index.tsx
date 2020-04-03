import React, { SyntheticEvent, useEffect, useState } from 'react';
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
import { validateDepositKey } from './validateDepositKey';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import {
  DispatchDepositFileNameUpdateType,
  DispatchDepositKeysUpdateType,
  TransactionStatus,
  updateDepositFileKeys,
  updateDepositFileName,
} from '../../store/actions/depositFileActions';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { FileUploadAnimation } from './FileUploadAnimation';
import { routeToCorrectWorkflowStep } from '../../utils/RouteToCorrectWorkflowStep';

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
  margin-top: 20px;
  cursor: ${(p: { invalidFile: boolean; isFileAccepted: boolean }) =>
    p.invalidFile || p.isFileAccepted ? 'inherit' : 'pointer'};
  box-shadow: ${(p: { theme: any }) => `0 0 10px ${p.theme.gray.light}`};
  padding: 30px;
  border-radius: ${(p: { theme: any }) => p.theme.borderRadius};
`;
const Highlighted = styled(Text)`
  color: ${(p: { theme: any }) => p.theme.blue.medium};
  display: inline-block;
  :hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;
const Code = styled(Text)`
  border: 1px solid #dc8180;
  background-color: ${(p: any) => p.theme.red.lightest};
  display: inline-block;
  border-radius: 4px;
  padding: 0 4px;
  color: #ad2b2a;
  font-size: 14px;
  line-height: 16px;
`;

const DeleteBtn = styled.span`
  cursor: pointer;
  padding: 3px;
`;

interface OwnProps {}
interface StateProps {
  depositKeys: DepositKeyInterface[];
  workflow: WorkflowStep;
  depositFileName: string;
}
interface DispatchProps {
  dispatchDepositFileKeyUpdate: DispatchDepositKeysUpdateType;
  dispatchWorkflowUpdate: DispatchWorkflowUpdateType;
  dispatchDepositFileNameUpdate: DispatchDepositFileNameUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const defaultMessage = (
  <div>
    Drag file to upload or <Highlighted>browse</Highlighted>
  </div>
);

function onFileDrop(
  acceptedFiles: Array<any>,
  setInvalidFile: (isInvalid: boolean) => void,
  dispatchDepositFileNameUpdate: DispatchDepositFileNameUpdateType,
  dispatchDepositFileKeyUpdate: DispatchDepositKeysUpdateType,
  flushDropzoneCache: () => void
) {
  if (acceptedFiles.length === 1) {
    setInvalidFile(false);
    dispatchDepositFileNameUpdate(acceptedFiles[0].name);

    const reader = new FileReader();

    reader.onload = async event => {
      if (event.target) {
        try {
          const fileData = JSON.parse(event.target.result as string);
          if (await validateDepositKey(fileData as DepositKeyInterface[])) {
            dispatchDepositFileKeyUpdate(
              fileData.map((file: DepositKeyInterface) => ({
                ...file,
                transactionStatus: TransactionStatus.READY, // initialize each file with ready state for transaction
              }))
            );
          } else {
            setInvalidFile(true);
            flushDropzoneCache();
          }
        } catch (e) {
          setInvalidFile(true);
          flushDropzoneCache();
        }
      }
    };
    reader.readAsText(acceptedFiles[0]);
  }
}

function handleSubmit(workflow: any, dispatchWorkflowUpdate: any) {
  if (workflow === WorkflowStep.UPLOAD_VALIDATOR_FILE) {
    dispatchWorkflowUpdate(WorkflowStep.CONNECT_WALLET);
  }
}

function handleFileDelete(
  e: SyntheticEvent,
  dispatchDepositFileKeyUpdate: DispatchDepositKeysUpdateType,
  setInvalidFile: (isInvalid: boolean) => void,
  flushDropzoneCache: () => void
) {
  e.preventDefault();
  dispatchDepositFileKeyUpdate([]);
  setInvalidFile(false);
  flushDropzoneCache();
}

interface DeleteBtnMessageProps {
  text: string;
  dispatchDepositFileKeyUpdate: DispatchDepositKeysUpdateType;
  setInvalidFile: (isFileInvalid: boolean) => void;
  flushDropzoneCache: () => void;
}

const DeleteBtnMessage = ({
  text,
  dispatchDepositFileKeyUpdate,
  setInvalidFile,
  flushDropzoneCache,
}: DeleteBtnMessageProps) => {
  return (
    <div className="flex center">
      <DeleteBtn
        onClick={e =>
          handleFileDelete(
            e,
            dispatchDepositFileKeyUpdate,
            setInvalidFile,
            flushDropzoneCache
          )
        }
      >
        <Close size="15px" className="mr10" />
      </DeleteBtn>
      <Text>{text}</Text>
    </div>
  );
};

const _UploadValidatorPage = ({
  workflow,
  depositKeys,
  dispatchDepositFileKeyUpdate,
  depositFileName,
  dispatchDepositFileNameUpdate,
  dispatchWorkflowUpdate,
}: Props): JSX.Element => {
  const [isFileAccepted, setIsFileAccepted] = useState(depositKeys.length > 0);
  const [invalidFile, setInvalidFile] = useState(false);
  const [message, setMessage] = useState(defaultMessage);
  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
    inputRef,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop: files =>
      onFileDrop(
        files,
        setInvalidFile,
        dispatchDepositFileNameUpdate,
        dispatchDepositFileKeyUpdate,
        // eslint-disable-next-line no-use-before-define
        flushDropzoneCache
      ),
    accept: 'application/json',
    noClick: isFileAccepted || invalidFile,
  });

  // forcefully mutates the acceptedFiles array to clear it
  function flushDropzoneCache() {
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  useEffect(() => setIsFileAccepted(depositKeys.length > 0), [depositKeys]);
  useEffect(() => {
    if (isFileAccepted) {
      setTimeout(
        () =>
          setMessage(
            <DeleteBtnMessage
              dispatchDepositFileKeyUpdate={dispatchDepositFileKeyUpdate}
              setInvalidFile={setInvalidFile}
              flushDropzoneCache={flushDropzoneCache}
              text={depositFileName}
            />
          ),
        400
      );
      return;
    }

    if (!isDragActive) {
      if (invalidFile) {
        setMessage(
          <DeleteBtnMessage
            dispatchDepositFileKeyUpdate={dispatchDepositFileKeyUpdate}
            setInvalidFile={setInvalidFile}
            flushDropzoneCache={flushDropzoneCache}
            text={`${depositFileName} is invalid`}
          />
        );
        return;
      }
      setMessage(defaultMessage);
      return;
    }

    if (isDragActive && isDragReject) {
      setTimeout(
        () => setMessage(<Text>Please upload a valid json file</Text>),
        600
      );
    }
  }, [isFileAccepted, invalidFile, isDragReject, isDragActive]);

  if (workflow < WorkflowStep.UPLOAD_VALIDATOR_FILE)
    return routeToCorrectWorkflowStep(workflow);

  return (
    <WorkflowPageTemplate title="Upload Deposit File">
      <Container className="mt20">
        <Text className="mb20">
          Please upload the{' '}
          <Highlighted className="mr5">Deposit Data file</Highlighted>
          generated in the{' '}
          <Link to={routesEnum.generateKeysPage} inline className="mr5">
            previous step.
          </Link>
          The <Code>deposit-data-[timestamp].json</Code> is located in the{' '}
          <Code>/eth2.0-deposit-cli/validator_keys</Code> directory.
        </Text>
        <Dropzone
          isFileAccepted={isFileAccepted}
          invalidFile={invalidFile}
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <FileUploadAnimation
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            fileDropped={
              isFileAccepted || invalidFile || acceptedFiles.length > 0
            }
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
        <Link
          to={routesEnum.connectWalletPage}
          onClick={() => handleSubmit(workflow, dispatchWorkflowUpdate)}
        >
          <Button
            width={300}
            rainbow
            disabled={!isFileAccepted}
            label="Continue"
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

const mapStateToProps = (state: StoreState): StateProps => ({
  depositKeys: state.depositFile.keys,
  depositFileName: state.depositFile.name,
  workflow: state.workflow,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchDepositFileNameUpdate: name => dispatch(updateDepositFileName(name)),
  dispatchDepositFileKeyUpdate: files => dispatch(updateDepositFileKeys(files)),
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
