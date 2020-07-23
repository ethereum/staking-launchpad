import React, { FunctionComponent } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import {
  AcknowledgementPage,
  CongratulationsPage,
  ConnectWalletPage,
  GenerateKeysPage,
  LandingPage,
  NotFoundPage,
  SummaryPage,
  UploadValidatorPage,
  TransactionsPage,
  FAQ,
  Phishing,
} from './pages';
import ScrollToTop from './utils/ScrollToTop';

type RouteType = {
  path: string;
  component: FunctionComponent;
  exact?: boolean;
};

export enum routesEnum {
  congratulationsPage = '/congratulations',
  connectWalletPage = '/connect-wallet',
  generateKeysPage = '/generate-keys',
  acknowledgementPage = '/overview',
  summaryPage = '/summary',
  uploadValidatorPage = '/upload-validator',
  transactionsPage = '/transactions',
  FaqPage = '/faq',
  phishingPage = '/phishing',
  landingPage = '/',
  notFoundPage = '/*',
}
const routes: RouteType[] = [
  {
    path: routesEnum.congratulationsPage,
    exact: true,
    component: CongratulationsPage,
  },
  {
    path: routesEnum.connectWalletPage,
    exact: true,
    component: ConnectWalletPage,
  },
  {
    path: routesEnum.generateKeysPage,
    exact: true,
    component: GenerateKeysPage,
  },
  {
    path: routesEnum.acknowledgementPage,
    exact: true,
    component: AcknowledgementPage,
  },
  { path: routesEnum.summaryPage, exact: true, component: SummaryPage },
  {
    path: routesEnum.uploadValidatorPage,
    exact: true,
    component: UploadValidatorPage,
  },
  {
    path: routesEnum.transactionsPage,
    exact: true,
    component: TransactionsPage,
  },
  {
    path: routesEnum.FaqPage,
    exact: true,
    component: FAQ,
  },
  {
    path: routesEnum.phishingPage,
    exact: true,
    component: Phishing,
  },
  { path: routesEnum.landingPage, exact: true, component: LandingPage },
  { path: routesEnum.notFoundPage, component: NotFoundPage },
];

const _Routes = () => {
  return (
    <>
      <ScrollToTop>
        <Switch>
          {routes.map((route: RouteType) => (
            <Route
              onUpdate={() => window.scrollTo(0, 0)}
              {...route}
              key={route.path}
            />
          ))}
        </Switch>
      </ScrollToTop>
    </>
  );
};

export const Routes = withRouter(_Routes);
