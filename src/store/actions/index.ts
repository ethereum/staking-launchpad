import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateDepositFileNameAction,
  UpdateDepositFileKeysAction,
  UpdateTransactionStatusAction,
} from './depositFileActions';
import { UpdateWorkflowAction } from './workflowActions';
import { UpdateClientAction } from './clientActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateDepositFileKeys,
  updateDepositFileName,
  updateTransactionStatus,
  updateWorkflow,
  updateClient,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateDepositFileKeysAction
  | UpdateTransactionStatusAction
  | UpdateWorkflowAction
  | UpdateDepositFileNameAction
  | UpdateClientAction;
