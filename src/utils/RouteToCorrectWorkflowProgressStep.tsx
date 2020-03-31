import React from 'react';
import { Redirect } from 'react-router-dom';
import { routesEnum } from '../Routes';
import { WorkflowProgressStep } from '../store/actions/workflowProgressActions';

export const routeToCorrectWorkflowProgressStep = (
  step: WorkflowProgressStep
): JSX.Element => {
  if (step === WorkflowProgressStep.OVERVIEW) {
    return <Redirect push to={routesEnum.acknowledgementPage} />;
  }
  if (step === WorkflowProgressStep.GENERATE_KEY_PAIRS) {
    return <Redirect push to={routesEnum.generateKeysPage} />;
  }
  if (step === WorkflowProgressStep.UPLOAD_VALIDATOR_FILE) {
    return <Redirect push to={routesEnum.uploadValidatorPage} />;
  }
  if (step === WorkflowProgressStep.CONNECT_WALLET) {
    return <Redirect push to={routesEnum.connectWalletPage} />;
  }
  if (step === WorkflowProgressStep.SUMMARY) {
    return <Redirect push to={routesEnum.summaryPage} />;
  }
  if (step === WorkflowProgressStep.TRANSACTION_SIGNING) {
    return <Redirect push to={routesEnum.transactionsPage} />;
  }
  if (step === WorkflowProgressStep.CONGRATULATIONS) {
    return <Redirect push to={routesEnum.congratulationsPage} />;
  }
  return <Redirect push to={routesEnum.notFoundPage} />;
};
