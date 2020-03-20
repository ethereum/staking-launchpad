import { UpdateAcknowledgementStateAction } from './acknowledgementActions';
import { UpdateValidatorCountAction } from './validatorActions';
import { UpdateKeyFilesAction } from './keyFileActions';
import { UpdateProgressAction } from './progressActions';
import { UpdateMnemonicAcknowledgment } from './generateKeysActions';

export * from './acknowledgementActions';
export * from './keyFileActions';
export * from './progressActions';
export * from './validatorActions';
export * from './generateKeysActions';

export enum ActionTypes {
  updateAcknowledgementState,
  updateValidatorCount,
  updateKeyFiles,
  updateProgress,
  updateMnemonicAcknowledgment,
}

export type Action =
  | UpdateAcknowledgementStateAction
  | UpdateValidatorCountAction
  | UpdateKeyFilesAction
  | UpdateProgressAction
  | UpdateMnemonicAcknowledgment;
