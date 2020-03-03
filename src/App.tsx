import React from "react";
import { Grommet } from "grommet";
import { grommetTheme } from "./styles/grommetTheme";
import { styledComponentsTheme } from "./styles/styledComponentsTheme";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes as RoutedContent } from "./Routes";
import { GlobalStyles } from "./styles/GlobalStyles";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./store/reducers";
import { ThemeProvider } from "styled-components";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import { BrowserRouter } from "react-router-dom";

const store = createStore(reducers);

function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

export const App: React.FC = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <BrowserRouter>
        <Provider store={store}>
          <Grommet theme={grommetTheme}>
            <ThemeProvider theme={styledComponentsTheme}>
              <GlobalStyles />
              <Router>
                <RoutedContent />
              </Router>
            </ThemeProvider>
          </Grommet>
        </Provider>
      </BrowserRouter>
    </Web3ReactProvider>
  );
};
