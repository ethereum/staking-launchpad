import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { createBrowserHistory } from 'history';
import { Grommet } from 'grommet';
import { Web3Provider } from '@ethersproject/providers';
import { Web3ReactProvider } from '@web3-react/core';
import { Router } from 'react-router-dom';
import { grommetTheme } from './styles/grommetTheme';
import { styledComponentsTheme } from './styles/styledComponentsTheme';
import { Routes as RoutedContent } from './Routes';
import { GlobalStyles } from './styles/GlobalStyles';
import { reducers } from './store/reducers';

export const store = createStore(
  reducers,
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const history = createBrowserHistory();

export const App: React.FC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Router history={history}>
        <Provider store={store}>
          <Grommet theme={grommetTheme}>
            <ThemeProvider theme={styledComponentsTheme}>
              <GlobalStyles />
              <RoutedContent />
            </ThemeProvider>
          </Grommet>
        </Provider>
      </Router>
    </Web3ReactProvider>
  );
};
