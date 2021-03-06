import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import $ from 'jquery'; // eslint-disable-line no-unused-vars
import popper from 'popper.js'; // eslint-disable-line no-unused-vars
import 'bootstrap/dist/js/bootstrap';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import auth from './utils/auth';

axios.interceptors.request.use(config => {
  if (auth.isAuthenticated()) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('token');
  }
  return config;
});

axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const { response } = error;
    if (response.status === 401 && response.data.error && response.data.error.includes('expired')) {
      auth.logout();
      window.location = '/users/signin';
      return;
    }
    if (response.status === 401 && !auth.isAuthenticated()) {
      window.location = '/users/signin';
      return;
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
