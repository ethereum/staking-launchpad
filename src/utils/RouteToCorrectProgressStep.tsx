import React from "react";
import {Redirect} from "react-router-dom";
import {ProgressStep} from "../store/actions";
import {routesEnum} from "../Routes";

export const routeToCorrectProgressStep = (step: ProgressStep): JSX.Element => {
  if (step === ProgressStep.OVERVIEW) {
    return <Redirect to={routesEnum.AcknowledgementPage} />;
  }
  if (step === ProgressStep.VALIDATOR_SETTINGS) {
    return <Redirect to={routesEnum.ValidatorSettingsPage} />;
  }
  if (step === ProgressStep.GENERATE_KEY_PAIRS) {
    return <Redirect to={routesEnum.GenerateKeysPage} />;
  }
  if (step === ProgressStep.UPLOAD_VALIDATOR_FILE) {
    return <Redirect to={routesEnum.UploadValidatorPage} />;
  }
  if (step === ProgressStep.CONNECT_WALLET) {
    return <Redirect to={routesEnum.ConnectWalletPage} />;
  }
  if (step === ProgressStep.SUMMARY) {
    return <Redirect to={routesEnum.SummaryPage} />;
  }

  return <Redirect to={routesEnum.NotFoundPage} />;
};
