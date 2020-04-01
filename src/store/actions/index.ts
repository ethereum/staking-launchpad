import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateKeyFilesAction,
  UpdateTransactionStatusAction,
} from './keyFileActions';
import { UpdateWorkflowAction } from './workflowActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateKeyFiles,
  updateTransactionStatus,
  updateWorkflow,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateKeyFilesAction
  | UpdateTransactionStatusAction
  | UpdateWorkflowAction;
