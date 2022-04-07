import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Routes from './Routes';
import {Provider} from 'react-redux';
import store from './store/store';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <Routes />
  </Provider>
  </React.StrictMode>,

  document.getElementById('root')
);
serviceWorker.unregister();
