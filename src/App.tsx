import React from "react";
import { Grommet } from "grommet";
import { grommetTheme } from "./styles/grommetTheme";
import { styledComponentsTheme } from "./styles/styledComponentsTheme";
import { BrowserRouter as Router } from "react-router-dom";
import { Routes as RoutedContent } from "./Routes";
import { AppBar } from "./components/AppBar";
import { GlobalStyles } from "./styles/GlobalStyles";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { reducers } from "./store/reducers";
import { ThemeProvider } from "styled-components";

const store = createStore(reducers);

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Grommet theme={grommetTheme}>
        <ThemeProvider theme={styledComponentsTheme}>
          <GlobalStyles />
          <Router>
            <AppBar />
            <RoutedContent />
          </Router>
        </ThemeProvider>
      </Grommet>
    </Provider>
  );
};
