import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import {
  UpdateKeyFilesAction,
  UpdateTransactionStatusAction,
} from './keyFileActions';
import { UpdateProgressAction } from './progressActions';

export * from './acknowledgementActions';
export * from './keyFileActions';
export * from './progressActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateKeyFiles,
  updateTransactionStatus,
  updateProgress,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateKeyFilesAction
  | UpdateTransactionStatusAction
  | UpdateProgressAction
