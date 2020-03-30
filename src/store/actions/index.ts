import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateKeyFilesAction,
  UpdateTransactionStatusAction,
} from './keyFileActions';
import { UpdateWorkflowProgressAction } from './workflowProgressActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateKeyFiles,
  updateTransactionStatus,
  updateWorkflowProgress,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateKeyFilesAction
  | UpdateTransactionStatusAction
  | UpdateWorkflowProgressAction;
