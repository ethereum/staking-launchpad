export type TransactionStatus =
  | 'not_started'
  | 'waiting_user_confirmation'
  | 'user_rejected'
  | 'confirm_on_chain'
  | 'error'
  | 'success';

export type stepStatus = 'loading' | 'staged' | 'complete' | 'error';
