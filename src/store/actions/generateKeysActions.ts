import { ActionTypes } from "./index";

export interface UpdateMnemonicAcknowledgment {
  type: ActionTypes.updateMnemonicAcknowledgment;
  payload: boolean;
}
export const updateMnemonicAcknowledgement = (
  checked: boolean
): UpdateMnemonicAcknowledgment => {
  return {
    type: ActionTypes.updateMnemonicAcknowledgment,
    payload: checked
  };
};
