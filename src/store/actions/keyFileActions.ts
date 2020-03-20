import { ActionTypes } from './index';

export interface keyFile {
  pubkey: string;
  // eslint-disable-next-line camelcase
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  // eslint-disable-next-line camelcase
  deposit_data_root: string;
  // eslint-disable-next-line camelcase
  signed_deposit_data_root: string;
}
export interface UpdateKeyFilesAction {
  type: ActionTypes.updateKeyFiles;
  payload: keyFile[];
}
export const updateKeyFiles = (files: keyFile[]): UpdateKeyFilesAction => {
  return {
    type: ActionTypes.updateKeyFiles,
    payload: files,
  };
};
