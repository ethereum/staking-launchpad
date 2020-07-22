import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateDepositFileNameAction,
  UpdateDepositFileKeysAction,
  UpdateTransactionStatusAction,
} from './depositFileActions';
import { UpdateWorkflowAction } from './workflowActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateDepositFileKeys,
  updateDepositFileName,
  updateTransactionStatus,
  updateWorkflow,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateDepositFileKeysAction
  | UpdateTransactionStatusAction
  | UpdateWorkflowAction
  | UpdateDepositFileNameAction;
