import React, { SyntheticEvent, useCallback, useMemo, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
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
import { Code } from '../../components/Code';
import {
  getExistingDepositsForPubkeys,
  validateDepositKey,
} from './validateDepositKey';
import { DepositKeyInterface, StoreState } from '../../store/reducers';
import {
  DepositStatus,
  DispatchDepositFileNameUpdateType,
  DispatchDepositKeysUpdateType,
  DispatchDepositStatusUpdateType,
  DispatchBeaconChainAPIStatusUpdateType,
  TransactionStatus,
  updateDepositFileKeys,
  updateDepositFileName,
  updateDepositStatus,
  updateBeaconChainAPIStatus,
  BeaconChainStatus,
} from '../../store/actions/depositFileActions';
import {
  DispatchWorkflowUpdateType,
  updateWorkflow,
  WorkflowStep,
} from '../../store/actions/workflowActions';
import { FileUploadAnimation } from './FileUploadAnimation';
import {
  ETH2_NETWORK_NAME,
  GENESIS_FORK_VERSION,
  IS_MAINNET,
} from '../../utils/envVars';
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
  margin: 20px auto auto;
  cursor: ${(p: { isFileAccepted: boolean; isFileStaged: boolean }) =>
    p.isFileAccepted || p.isFileStaged ? 'inherit' : 'pointer'};
  box-shadow: ${(p: { theme: any }) => `0 0 10px ${p.theme.gray.light}`};
  padding: 30px;
  border-radius: ${(p: { theme: any }) => p.theme.borderRadius};
`;
// @ts-ignore

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
  dispatchDepositStatusUpdate: DispatchDepositStatusUpdateType;
  dispatchBeaconChainAPIStatusUpdate: DispatchBeaconChainAPIStatusUpdateType;
}
type Props = StateProps & DispatchProps & OwnProps;

const _UploadValidatorPage = ({
  workflow,
  depositKeys,
  dispatchDepositFileKeyUpdate,
  depositFileName,
  dispatchDepositFileNameUpdate,
  dispatchWorkflowUpdate,
  dispatchDepositStatusUpdate,
  dispatchBeaconChainAPIStatusUpdate,
}: Props): JSX.Element => {
  const { formatMessage } = useIntl();
  const [isFileStaged, setIsFileStaged] = useState(depositKeys.length > 0);
  const [isFileAccepted, setIsFileAccepted] = useState(depositKeys.length > 0);
  const [fileError, setFileError] = useState<React.ReactElement | null>(null);
  const {
    acceptedFiles, // all JSON files will pass this check (including BLS failures
    inputRef,
  } = useDropzone({
    accept: 'application/json',
  });

  const flushDropzoneCache = useCallback(() => {
    acceptedFiles.length = 0;
    acceptedFiles.splice(0, acceptedFiles.length);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }, [acceptedFiles, inputRef]);

  const checkJsonStructure = (depositDataJson: { [field: string]: any }) => {
    return !!(
      depositDataJson.pubkey ||
      depositDataJson.withdrawal_credentials ||
      depositDataJson.amount ||
      depositDataJson.signature ||
      depositDataJson.deposit_message_root ||
      depositDataJson.deposit_data_root ||
      depositDataJson.fork_version
    );
  };

  const handleWrongNetwork = () => {
    setFileError(
      <Text>
        <FormattedMessage
          defaultMessage="This JSON file isn't for the right network. Upload a file generated for your current network: {network}."
          values={{
            network: (
              <span>
                {ETH2_NETWORK_NAME}
                {IS_MAINNET ? '' : ' testnet'}
              </span>
            ),
          }}
        />
      </Text>
    );
  };

  const handleSevereError = () => {
    setFileError(
      <Text>
        <FormattedMessage
          defaultMessage="Couldn't upload {depositFileName} due to an error. Open an issue in GitHub so we can investigate. "
          values={{
            depositFileName: <Code>{depositFileName}</Code>,
          }}
        />
        <Link
          primary
          inline
          to="https://github.com/ethereum/eth2.0-deposit/issues/new"
        >
          Open issue
        </Link>
      </Text>
    );
  };

  const onFileDrop = (jsonFiles: Array<any>, rejectedFiles: Array<any>) => {
    if (rejectedFiles?.length) {
      setFileError(
        <>
          <FormattedMessage defaultMessage="That is not a valid deposit_data JSON file." />
        </>
      );
      return;
    }

    // check if the file is JSON
    if (jsonFiles.length === 1) {
      setIsFileStaged(true); // unstaged via handleFileDelete
      setIsFileAccepted(true); // rejected if BLS check fails
      dispatchDepositFileNameUpdate(jsonFiles[0].name);
      const reader = new FileReader();
      reader.onload = async event => {
        if (event.target) {
          try {
            const fileData: any[] = JSON.parse(event.target.result as string);
            // perform BLS check
            if (await validateDepositKey(fileData as DepositKeyInterface[])) {
              // add valid files to redux
              dispatchDepositFileKeyUpdate(
                fileData.map((file: DepositKeyInterface) => ({
                  ...file,
                  transactionStatus: TransactionStatus.READY, // initialize each file with ready state for transaction
                  depositStatus: DepositStatus.VERIFYING, // assign to verifying status until the pubkey is checked via beaconscan
                }))
              );

              // perform double deposit check
              try {
                const existingDeposits = await getExistingDepositsForPubkeys(
                  fileData
                );
                const existingDepositPubkeys = existingDeposits.data.flatMap(
                  x => x.publickey.substring(2)
                );
                (fileData as DepositKeyInterface[]).forEach(async file => {
                  if (existingDepositPubkeys.includes(file.pubkey)) {
                    dispatchDepositStatusUpdate(
                      file.pubkey,
                      DepositStatus.ALREADY_DEPOSITED
                    );
                  } else {
                    dispatchDepositStatusUpdate(
                      file.pubkey,
                      DepositStatus.READY_FOR_DEPOSIT
                    );
                  }
                });
              } catch (error) {
                dispatchBeaconChainAPIStatusUpdate(BeaconChainStatus.DOWN);
              }
            } else {
              // file is JSON but did not pass BLS, so leave it "staged" but not "accepted"
              setIsFileAccepted(false);
              dispatchDepositFileKeyUpdate([]);
              flushDropzoneCache();

              // there are a couple special cases that can occur
              const { fork_version: forkVersion } = fileData[0] || {};
              const hasCorrectStructure = checkJsonStructure(fileData[0] || {});
              if (
                hasCorrectStructure &&
                forkVersion !== GENESIS_FORK_VERSION.toString()
              ) {
                // file doesn't match the correct network
                handleWrongNetwork();
              }
            }
          } catch (e) {
            // possible error example: json is invalid or empty so it cannot be parsed
            // TODO think about other possible errors here, and consider if we might want to set "isFileStaged"
            setIsFileAccepted(false);
            handleSevereError();
            dispatchDepositFileKeyUpdate([]);
            flushDropzoneCache();
          }
        }
      };
      reader.readAsText(jsonFiles[0]);
    }
  };

  function handleSubmit() {
    if (workflow === WorkflowStep.UPLOAD_VALIDATOR_FILE) {
      dispatchWorkflowUpdate(WorkflowStep.CONNECT_WALLET);
    }
  }

  const handleFileDelete = useCallback(
    (e: SyntheticEvent) => {
      e.preventDefault();
      dispatchDepositFileNameUpdate('');
      dispatchDepositFileKeyUpdate([]);
      setFileError(null);
      setIsFileStaged(false);
      setIsFileAccepted(false);
      flushDropzoneCache();
    },
    [
      dispatchDepositFileKeyUpdate,
      dispatchDepositFileNameUpdate,
      flushDropzoneCache,
    ]
  );

  const {
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    accept: 'application/json',
    noClick: isFileStaged || isFileAccepted,
    onDrop: onFileDrop,
  });

  const renderMessage = useMemo(() => {
    if (isDragReject && !isFileStaged) {
      return (
        <div>
          <FormattedMessage defaultMessage="Upload a valid json file." />
        </div>
      );
    }

    if (isFileStaged || fileError) {
      return (
        <div className="flex center">
          <DeleteBtn onClick={handleFileDelete}>
            <Close size="15px" className="mr10" />
          </DeleteBtn>
          {fileError || (
            <>
              {isFileAccepted && <Text>{depositFileName}</Text>}
              {!isFileAccepted && (
                <Text>
                  <FormattedMessage
                    defaultMessage="{depositFileName} isn't a valid deposit_data JSON file. Try again."
                    values={{
                      depositFileName: <span>{depositFileName}</span>,
                    }}
                  />
                </Text>
              )}
            </>
          )}
        </div>
      );
    }

    return (
      <div>
        <FormattedMessage defaultMessage="Drag file to upload or browse" />
      </div>
    );
  }, [
    isDragReject,
    isFileStaged,
    isFileAccepted,
    fileError,
    depositFileName,
    handleFileDelete,
  ]);

  if (workflow < WorkflowStep.UPLOAD_VALIDATOR_FILE) {
    return routeToCorrectWorkflowStep(workflow);
  }

  return (
    <WorkflowPageTemplate title="Upload deposit data">
      <Container className="mt20">
        <Text className="mb20">
          <FormattedMessage
            defaultMessage="Upload the deposit data file you just generated. The {json} is located in your {validatorKeys} directory."
            values={{
              json: <Code>deposit_data-[timestamp].json</Code>,
              validatorKeys: <Code>/eth2.0-deposit-cli/validator_keys</Code>,
            }}
          />
        </Text>
        <Dropzone
          isFileStaged={isFileStaged}
          isFileAccepted={isFileAccepted && !fileError}
          {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
        >
          <input {...getInputProps()} />
          <FileUploadAnimation
            isDragAccept={isDragAccept}
            isDragReject={isDragReject}
            isDragActive={isDragActive}
            isFileStaged={!!(isFileStaged || fileError)}
            isFileAccepted={isFileAccepted && !fileError}
          />

          <Text className="mt20" textAlign="center">
            {renderMessage}
          </Text>
        </Dropzone>
      </Container>
      <div className="flex center p30">
        <Link to={routesEnum.generateKeysPage}>
          <Button
            className="mr10"
            width={100}
            label={formatMessage({ defaultMessage: 'Back' })}
          />
        </Link>
        <Link to={routesEnum.connectWalletPage} onClick={handleSubmit}>
          <Button
            width={300}
            rainbow
            disabled={!isFileAccepted}
            label={formatMessage({ defaultMessage: 'Continue' })}
          />
        </Link>
      </div>
    </WorkflowPageTemplate>
  );
};

_UploadValidatorPage.displayName = 'UploadValidatorPage';

const mapStateToProps = (state: StoreState): StateProps => ({
  depositKeys: state.depositFile.keys,
  depositFileName: state.depositFile.name,
  workflow: state.workflow,
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  dispatchDepositFileNameUpdate: name => dispatch(updateDepositFileName(name)),
  dispatchDepositStatusUpdate: (pubkey, depositStatus) =>
    dispatch(updateDepositStatus(pubkey, depositStatus)),
  dispatchDepositFileKeyUpdate: files => dispatch(updateDepositFileKeys(files)),
  dispatchWorkflowUpdate: step => dispatch(updateWorkflow(step)),
  dispatchBeaconChainAPIStatusUpdate: status =>
    dispatch(updateBeaconChainAPIStatus(status)),
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
