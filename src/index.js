import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { initialState } from "./store/initialState";

const store = configureStore(initialState());

ReactDOM.render(
  // <React.StrictMode> TODO: double render
  <Provider store={store}>
    <BrowserRouter>
      <div>
        <App />
      </div>,
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
