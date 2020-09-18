import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateDepositFileNameAction,
  UpdateDepositFileKeysAction,
  UpdateTransactionStatusAction,
} from './depositFileActions';
import { UpdateWorkflowAction } from './workflowActions';
import { UpdateValidatorAction } from './validatorActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateDepositFileKeys,
  updateDepositFileName,
  updateTransactionStatus,
  updateWorkflow,
  updateValidator,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateDepositFileKeysAction
  | UpdateTransactionStatusAction
  | UpdateWorkflowAction
  | UpdateDepositFileNameAction
  | UpdateValidatorAction;
