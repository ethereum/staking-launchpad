import React from 'react';
import { Redirect } from 'react-router-dom';
import { ProgressStep } from '../store/actions';
import { routesEnum } from '../Routes';

export const routeToCorrectProgressStep = (step: ProgressStep): JSX.Element => {
  if (step === ProgressStep.OVERVIEW) {
    return <Redirect push to={routesEnum.acknowledgementPage} />;
  }
  if (step === ProgressStep.GENERATE_KEY_PAIRS) {
    return <Redirect push to={routesEnum.generateKeysPage} />;
  }
  if (step === ProgressStep.UPLOAD_VALIDATOR_FILE) {
    return <Redirect push to={routesEnum.uploadValidatorPage} />;
  }
  if (step === ProgressStep.CONNECT_WALLET) {
    return <Redirect push to={routesEnum.connectWalletPage} />;
  }
  if (step === ProgressStep.SUMMARY) {
    return <Redirect push to={routesEnum.summaryPage} />;
  }
  if (step === ProgressStep.TRANSACTION_SIGNING) {
    return <Redirect push to={routesEnum.transactionsPage} />;
  }
  if (step === ProgressStep.CONGRATULATIONS) {
    return <Redirect push to={routesEnum.congratulationsPage} />;
  }
  return <Redirect push to={routesEnum.notFoundPage} />;
};
