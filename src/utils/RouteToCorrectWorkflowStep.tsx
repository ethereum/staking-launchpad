import React from 'react';
import { Redirect } from 'react-router-dom';
import { routesEnum } from '../Routes';
import { WorkflowStep } from '../store/actions/workflowActions';

export const routeToCorrectWorkflowStep = (step: WorkflowStep): JSX.Element => {
  if (step === WorkflowStep.OVERVIEW) {
    return <Redirect push to={routesEnum.acknowledgementPage} />;
  }
  if (step === WorkflowStep.SELECT_CLIENT) {
    return <Redirect push to={routesEnum.selectClient} />;
  }
  if (step === WorkflowStep.GENERATE_KEY_PAIRS) {
    return <Redirect push to={routesEnum.generateKeysPage} />;
  }
  if (step === WorkflowStep.UPLOAD_VALIDATOR_FILE) {
    return <Redirect push to={routesEnum.uploadValidatorPage} />;
  }
  if (step === WorkflowStep.CONNECT_WALLET) {
    return <Redirect push to={routesEnum.connectWalletPage} />;
  }
  if (step === WorkflowStep.SUMMARY) {
    return <Redirect push to={routesEnum.summaryPage} />;
  }
  if (step === WorkflowStep.TRANSACTION_SIGNING) {
    return <Redirect push to={routesEnum.transactionsPage} />;
  }
  if (step === WorkflowStep.CONGRATULATIONS) {
    return <Redirect push to={routesEnum.congratulationsPage} />;
  }
  return <Redirect push to={routesEnum.notFoundPage} />;
};
