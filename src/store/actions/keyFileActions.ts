// KEY FILE ACTIONS
import { ActionTypes } from "./index";

export interface keyFile {
  pubkey: string;
  withdrawal_credentials: string;
  amount: number;
  signature: string;
  deposit_data_root: string;
}
export interface UpdateKeyFilesAction {
  type: ActionTypes.updateKeyFiles;
  payload: keyFile[];
}
export const updateKeyFiles = (files: keyFile[]): UpdateKeyFilesAction => {
  return {
    type: ActionTypes.updateKeyFiles,
    payload: files
  };
};
