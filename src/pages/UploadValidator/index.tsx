import React, { useCallback, useState } from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import styled from 'styled-components';
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
import { colors } from '../../styles/styledComponentsTheme';
import { useDropzone } from 'react-dropzone';
import { Add, Close, DocumentUpload } from 'grommet-icons';
import { Animated } from 'react-animated-css';

const Dropzone = styled.div`
  outline: none;
  :focus {
    outline: none;
  }
`;

// Styled components
const Container = styled(Paper)`
  height: 400px;
  margin: auto;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Circle = styled.div`
  .circle-animated {
    stroke-dasharray: 166;
    stroke-dashoffset: 166;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${(p: { theme: any }) => p.theme.blue.light};
    fill: none;
    animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
  }
  .circle-dashed {
    stroke-dasharray: 4;
    stroke-width: 2;
    stroke-miterlimit: 10;
    stroke: ${colors.blue.light};
    fill: none;
  }

  .checkmark {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    display: block;
    stroke-width: 2;
    stroke: ${colors.green.dark}
    stroke-miterlimit: 10;
    margin: auto;
    box-shadow: inset 0px 0px 0px #7ac142;
    //animation: fill 0.4s ease-in-out 0.4s forwards,
    //  scale 0.3s ease-in-out 0.9s both;
  }

  .check-animated {
    stroke: ${colors.green.medium};
    transform-origin: 50% 50%;
    stroke-dasharray: 48;
    stroke-dashoffset: 48;
    animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
  }

  @keyframes stroke {
    100% {
      stroke-dashoffset: 0;
    }
  }
  @keyframes scale {
    0%,
    100% {
      transform: none;
    }
    50% {
      transform: scale3d(1.1, 1.1, 1);
    }
  }

  .icon--plus > path {
    fill: gold;
    stroke: gold;
    stroke-width: 0.1;
    stroke-linejoin: round;
  }
  //@keyframes fill {
  //  100% {
  //    box-shadow: inset 0px 0px 0px 30px #7ac142;
  //  }
  //}

  // for the close icon

  #path {
    stroke-dasharray: 200;
    stroke-dashoffset: 400;

    animation: checker 1.5s linear;
    animation-fill-mode: forwards;
  }

  @keyframes checker {
    from {
      stroke-dashoffset: 320;
    }
    to {
      stroke-dashoffset: 400;
    }
  }

  #path2 {
    stroke-dasharray: 430;
    stroke-dashoffset: 800;

    animation: x 0.1s linear;
    animation-fill-mode: forwards;
    animation-delay: 0.6s;
  }

  #path3 {
    stroke-dasharray: 430;
    stroke-dashoffset: 800;

    animation: x 0.1s linear;
    animation-fill-mode: forwards;
    animation-delay: 0.7s;
  }

  @keyframes x {
    from {
      stroke-dasharray: 430;
    }
    to {
      stroke-dasharray: 400;
    }
  }
`;

const UploadText = styled(Text)`
  color: ${(p: { theme: any }) => p.theme.blue.medium};
  cursor: pointer;
  display: inline-block;
`;

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
  const [invalidKeyFile, setInvalidKeyFile] = useState(false);
  const [showAnimatedCircle, setShowAnimatedCircle] = useState(false);
  const handleSubmit = () => {
    if (workflow === WorkflowStep.UPLOAD_VALIDATOR_FILE) {
      dispatchWorkflowUpdate(WorkflowStep.CONNECT_WALLET);
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
                dispatchKeyFilesUpdate(
                  fileData.map((keyFile: KeyFileInterface) => ({
                    ...keyFile,
                    transactionStatus: TransactionStatus.READY, // initialize each keyFile with ready state for transaction
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
    [dispatchKeyFilesUpdate]
  );

  // if (workflow < WorkflowStep.UPLOAD_VALIDATOR_FILE)
  //   return routeToCorrectWorkflowStep(workflow);

  const {
    isFocused,
    isDragActive,
    isDragAccept,
    isDragReject,
    isFileDialogActive,
    draggedFiles,
    acceptedFiles,
    rejectedFiles,
    rootRef,
    inputRef,
    getRootProps,
    getInputProps,
    open,
  } = useDropzone({ onDrop, accept: 'application/json' });
  //
  // let message = 'Drop or click here to upload deposit_data.json';
  //
  // if (isDragReject) {
  //   message = 'Please upload a valid JSON file ';
  // }
  //
  // if (fileAccepted) {
  //   message = 'File successfully uploaded';
  // }

  return (
    <WorkflowPageTemplate title="Upload Deposit File">
      <Dropzone {...getRootProps({ isDragActive, isDragAccept, isDragReject })}>
        <Container className="mt20" pad="medium" ethBackground>
          <input {...getInputProps()} />
          <Circle>
            <svg
              className="checkmark"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 52 52"
            >
              {isDragActive ? (
                <>
                  <circle
                    className="circle-animated"
                    cx="26"
                    cy="26"
                    r="25"
                    fill="none"
                  />
                </>
              ) : (
                <circle
                  className="circle-dashed"
                  cx="26"
                  cy="26"
                  r="25"
                  fill="none"
                />
              )}
              {isDragAccept ? (
                fileAccepted ? (
                  <path
                    className="check-animated"
                    fill="none"
                    d="M14.1 27.2l7.1 7.2 16.7-16.8"
                  />
                ) : (
                  <DocumentUpload height="20px" y="15px" color="grayMedium" />
                )
              ) : isDragReject ? (
                <svg
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  x="13px"
                  y="15px"
                  width="50px"
                  height="50px"
                  viewBox="0 0 50 50"
                  enableBackground="new 0 0 50 50"
                >
                  <g id="Layer_3">
                    <line
                      id="path2"
                      fill="none"
                      stroke={colors.red.light}
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      x1="4"
                      y1="20"
                      x2="20"
                      y2="4"
                    />
                    <line
                      id="path3"
                      fill="none"
                      stroke={colors.red.light}
                      strokeWidth="2"
                      strokeMiterlimit="10"
                      x1="20"
                      y1="20"
                      x2="4"
                      y2="4"
                    />
                  </g>
                </svg>
              ) : fileAccepted ? (
                <path
                  className="check-animated"
                  fill="none"
                  d="M14.1 27.2l7.1 7.2 16.7-16.8"
                />
              ) : (
                <Add height="12px" color={colors.blue.light} y="20" />
              )}
            </svg>
          </Circle>
          <Text className="mt20" textAlign="center">
            Drag file to upload or <UploadText>browse</UploadText>
          </Text>
        </Container>
      </Dropzone>
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

// isDragActive
// show circle animation

// isDragAccept
// show file icon instead of plus

// isDragReject
// show X
// change copy "please upload datadeposit-watevrr.json

// acceptedFiles.length > 0 + BLS check
// green checkmark
