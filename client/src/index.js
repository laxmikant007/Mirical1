import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
// import Countdown from './Containers/Countdown';
window.store = store;

ReactDOM.render(
  <>
    <Provider store={store}>
    <BrowserRouter>
    <App />
    {/* <Countdown /> */}
    </BrowserRouter>
    </Provider>
  </>,
  document.getElementById('root')
);
