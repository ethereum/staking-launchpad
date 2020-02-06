import React, { FunctionComponent } from "react";
import { Route, Switch } from "react-router-dom";
import {
  AcknowledgementPage,
  CongratulationsPage,
  ConnectWalletPage,
  GenerateKeysPage,
  LandingPage,
  NotFoundPage,
  SummaryPage,
  UploadValidatorPage,
  ValidatorSettingsPage
} from "./pages";

type RouteType = {
  path: string;
  component: FunctionComponent;
  exact?: boolean;
};

export enum routesEnum {
  CongratulationsPage = "/congratulations",
  ConnectWalletPage = "/connect-wallet",
  GenerateKeysPage = "/generate-keys",
  AcknowledgementPage = "/overview",
  SummaryPage = "/summary",
  UploadValidatorPage = "/upload-validator",
  ValidatorSettingsPage = "/validator-settings",
  LandingPage = "/",
  NotFoundPage = "/*"
}
const routes: RouteType[] = [
  {
    path: routesEnum.CongratulationsPage,
    exact: true,
    component: CongratulationsPage
  },
  {
    path: routesEnum.ConnectWalletPage,
    exact: true,
    component: ConnectWalletPage
  },
  {
    path: routesEnum.GenerateKeysPage,
    exact: true,
    component: GenerateKeysPage
  },
  {
    path: routesEnum.AcknowledgementPage,
    exact: true,
    component: AcknowledgementPage
  },
  { path: routesEnum.SummaryPage, exact: true, component: SummaryPage },
  {
    path: routesEnum.UploadValidatorPage,
    exact: true,
    component: UploadValidatorPage
  },
  {
    path: routesEnum.ValidatorSettingsPage,
    exact: true,
    component: ValidatorSettingsPage
  },
  { path: routesEnum.LandingPage, exact: true, component: LandingPage },
  { path: routesEnum.NotFoundPage, component: NotFoundPage }
];

export const Routes = () => {
  return (
    <Switch>
      {routes.map((route: RouteType) => (
        <Route {...route} key={route.path} />
      ))}
    </Switch>
  );
};
