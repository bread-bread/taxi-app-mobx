import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { theme } from 'loft-taxi-mui-theme';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './store/StoreProvider';
import { BrowserRouter } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core';
import { configure } from 'mobx';

import 'mobx-react/batchingForReactDom';

configure({ enforceActions: 'always' });

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <BrowserRouter>
        <StoreProvider>
          <App />
        </StoreProvider>
      </BrowserRouter>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
