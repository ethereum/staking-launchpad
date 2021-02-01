import React from 'react';
import { Router } from 'react-router-dom';

import { IntlProvider } from 'react-intl';
import { Route, Redirect } from 'react-router-dom';
import { messages, AppLanguage } from '../intl';

interface Props {
  history: any;
}

export const LocalizedRouter: React.FC<Props> = ({ children, history }) => (
  <Router history={history}>
    <Route path="/:lang([a-z]{2})">
      {({ match, location }) => {
        /**
         * Get current language
         * Set default locale to en if base path is used without a language
         */
        const params = match ? match.params : {};
        const { lang = AppLanguage.English } = params;

        /**
         * If language is not in route path, redirect to language route
         */
        const { pathname } = location;
        if (!pathname.includes(`/${lang}/`)) {
          return <Redirect to={`/${lang}${pathname}`} />;
        }

        /**
         * Return Intl provider with default language set
         */
        return (
          <IntlProvider locale={lang} messages={messages[lang]}>
            {children}
          </IntlProvider>
        );
      }}
    </Route>
  </Router>
);
