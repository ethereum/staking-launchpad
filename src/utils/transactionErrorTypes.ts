export const isLedgerTimeoutError = (error: any) => {
  return (
    error?.message ===
    'Failed to sign with Ledger device: U2F DEVICE_INELIGIBLE'
  );
};

export const ledgerTxRejected = (error: any) => {
  return error?.message.includes(
    'Ledger device: Condition of use not satisfied (denied by the user?)'
  );
};

export const metamaskTxRejected = (error: any) => {
  return (
    error?.message ===
    'MetaMask Tx Signature: User denied transaction signature.'
  );
};

export const fortmaticTxRejected = (error: any) => {
  return (
    error?.message ===
    'Fortmatic RPC Error: [-32603] Fortmatic: User denied transaction.'
  );
};
