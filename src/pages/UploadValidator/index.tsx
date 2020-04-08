import React, { SyntheticEvent, useMemo, useState } from 'react';
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
import { Code } from '../../components/Code';

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
  margin: 20px auto auto;
  cursor: ${(p: { isFileAccepted: boolean; isFileStaged: boolean }) =>
    p.isFileAccepted || p.isFileStaged ? 'inherit' : 'pointer'};
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
const DeleteBtn = styled.span`
  cursor: pointer;
  padding: 3px;
`;
const InlineLink = styled(Link)`
  display: inline;
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

const _UploadValidatorPage = ({
  workflow,
  depositKeys,
  dispatchDepositFileKeyUpdate,
  depositFileName,
  dispatchDepositFileNameUpdate,
  dispatchWorkflowUpdate,
}: Props): JSX.Element => {
  const [isFileStaged, setIsFileStaged] = useState(depositKeys.length > 0);
  const [isFileAccepted, setIsFileAccepted] = useState(depositKeys.length > 0);

  // forcefully mutates the acceptedFiles array to clear it
  /* eslint-disable no-use-before-define */
  function flushDropzoneCache() {
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }
  /* eslint-enable no-use-before-define */

  const onFileDrop = (acceptedFiles: Array<any>) => {
    // check if the file is JSON
    if (acceptedFiles.length === 1) {
      setIsFileStaged(true); // unstaged via handleFileDelete
      setIsFileAccepted(true); // rejected if BLS check fails
      dispatchDepositFileNameUpdate(acceptedFiles[0].name);
      const reader = new FileReader();
      reader.onload = async event => {
        if (event.target) {
          try {
            const fileData = JSON.parse(event.target.result as string);

            // perform BLS check
            if (await validateDepositKey(fileData as DepositKeyInterface[])) {
              // add valid files to redux
              dispatchDepositFileKeyUpdate(
                fileData.map((file: DepositKeyInterface) => ({
                  ...file,
                  transactionStatus: TransactionStatus.READY, // initialize each file with ready state for transaction
                }))
              );
            } else {
              // file is JSON but did not pass BLS, so leave it "staged" but not "accepted"
              setIsFileAccepted(false);
              dispatchDepositFileKeyUpdate([]);
              flushDropzoneCache();
            }
          } catch (e) {
            // possible error example: json is invalid or empty so it cannot be parsed
            // TODO think about other possible errors here, and consider if we might want to set "isFileStaged"
            setIsFileAccepted(false);
            dispatchDepositFileKeyUpdate([]);
            flushDropzoneCache();
          }
        }
      };
      reader.readAsText(acceptedFiles[0]);
    }
  };

  function handleSubmit() {
    if (workflow === WorkflowStep.UPLOAD_VALIDATOR_FILE) {
      dispatchWorkflowUpdate(WorkflowStep.CONNECT_WALLET);
    }
  }

  function handleFileDelete(e: SyntheticEvent) {
    e.preventDefault();
    dispatchDepositFileNameUpdate('');
    dispatchDepositFileKeyUpdate([]);
    setIsFileStaged(false);
    setIsFileAccepted(false);
    flushDropzoneCache();
  }

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles, // all JSON files will pass this check (including BLS failures)
    inputRef,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'application/json',
    noClick: isFileStaged || isFileAccepted,
    onDrop: onFileDrop,
  });

  const renderMessage = useMemo(() => {
    if (isDragReject && !isFileStaged) {
      return <div>Please upload a valid JSON file.</div>;
    }

    if (isFileStaged) {
      return (
        <div className="flex center">
          <DeleteBtn onClick={handleFileDelete}>
            <Close size="15px" className="mr10" />
          </DeleteBtn>
          <Text>
            {depositFileName} {!isFileAccepted && 'is invalid'}
          </Text>
        </div>
      );
    }

    return (
      <div>
        Drag file to upload or <Highlighted>browse</Highlighted>
      </div>
    );
  }, [
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileStaged,
    isFileAccepted,
    depositFileName,
  ]);

  if (workflow < WorkflowStep.UPLOAD_VALIDATOR_FILE)
    return routeToCorrectWorkflowStep(workflow);

  return (
    <WorkflowPageTemplate title="Upload Deposit File">
      <Container className="mt20">
        <Text className="mb20">
          Please upload the{' '}
          <Highlighted className="mr5">Deposit Data file</Highlighted>
          generated in the{' '}
          <InlineLink to={routesEnum.generateKeysPage} className="mr5">
            previous step.
          </InlineLink>
          The <Code>deposit-data-[timestamp].json</Code> is located in the{' '}
          <Code>/eth2.0-deposit-cli/validator_keys</Code> directory.
        </Text>
        <Dropzone
          isFileStaged={isFileStaged}
          isFileAccepted={isFileAccepted}
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <FileUploadAnimation
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            isDragActive={isDragActive}
            isFileStaged={isFileStaged}
            isFileAccepted={isFileAccepted}
          />

          <Text className="mt20" textAlign="center">
            {renderMessage}
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
