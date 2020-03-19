import React from "react";
import { Redirect } from "react-router-dom";
import { ProgressStep } from "../store/actions";
import { routesEnum } from "../Routes";

export const routeToCorrectProgressStep = (step: ProgressStep): JSX.Element => {
  if (step === ProgressStep.OVERVIEW) {
    return <Redirect push to={routesEnum.AcknowledgementPage} />;
  }
  if (step === ProgressStep.VALIDATOR_SETTINGS) {
    return <Redirect push to={routesEnum.ValidatorSettingsPage} />;
  }
  if (step === ProgressStep.GENERATE_KEY_PAIRS) {
    return <Redirect push to={routesEnum.GenerateKeysPage} />;
  }
  if (step === ProgressStep.UPLOAD_VALIDATOR_FILE) {
    return <Redirect push to={routesEnum.UploadValidatorPage} />;
  }
  if (step === ProgressStep.CONNECT_WALLET) {
    return <Redirect push to={routesEnum.ConnectWalletPage} />;
  }
  if (step === ProgressStep.SUMMARY) {
    return <Redirect push to={routesEnum.SummaryPage} />;
  }
  if (step === ProgressStep.CONGRATULATIONS) {
    return <Redirect push to={routesEnum.CongratulationsPage} />;
  }
  return <Redirect push to={routesEnum.NotFoundPage} />;
};
