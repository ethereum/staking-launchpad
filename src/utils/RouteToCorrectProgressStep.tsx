import React from 'react';
import { Redirect } from 'react-router-dom';
import { ProgressStep } from '../store/actions';
import { routesEnum } from '../Routes';

export const routeToCorrectProgressStep = (step: ProgressStep): JSX.Element => {
  if (step === ProgressStep.OVERVIEW) {
    return <Redirect to={routesEnum.acknowledgementPage} />;
  }
  if (step === ProgressStep.VALIDATOR_SETTINGS) {
    return <Redirect to={routesEnum.validatorSettingsPage} />;
  }
  if (step === ProgressStep.GENERATE_KEY_PAIRS) {
    return <Redirect to={routesEnum.generateKeysPage} />;
  }
  if (step === ProgressStep.UPLOAD_VALIDATOR_FILE) {
    return <Redirect to={routesEnum.uploadValidatorPage} />;
  }
  if (step === ProgressStep.CONNECT_WALLET) {
    return <Redirect to={routesEnum.connectWalletPage} />;
  }
  if (step === ProgressStep.SUMMARY) {
    return <Redirect to={routesEnum.summaryPage} />;
  }
  if (step === ProgressStep.CONGRATULATIONS) {
    return <Redirect to={routesEnum.congratulationsPage} />;
  }
  return <Redirect to={routesEnum.notFoundPage} />;
};
