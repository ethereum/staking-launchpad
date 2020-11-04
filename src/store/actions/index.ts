import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateDepositFileNameAction,
  UpdateDepositFileKeysAction,
  UpdateTransactionStatusAction,
  UpdateDepositStatusAction,
  UpdateBeaconChainAPIStatusAction,
} from './depositFileActions';
import { UpdateWorkflowAction } from './workflowActions';
import { UpdateClientAction } from './clientActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateDepositFileKeys,
  updateDepositFileName,
  updateTransactionStatus,
  updateDepositStatus,
  updateWorkflow,
  updateClient,
  updateBeaconChainAPIStatus,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateDepositFileKeysAction
  | UpdateTransactionStatusAction
  | UpdateDepositStatusAction
  | UpdateWorkflowAction
  | UpdateDepositFileNameAction
  | UpdateClientAction
  | UpdateBeaconChainAPIStatusAction;
