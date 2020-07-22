import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';

ReactDOM.render(
  <App />,

  document.querySelector('#root')
);

ReactDOM.render(<App />, document.getElementById('root'));
