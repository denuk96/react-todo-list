import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import { initialState } from "./store/initialState";
import saga from "./store/saga";
import { sagaMiddleware} from "./store/configureStore";

const store = configureStore(initialState);
sagaMiddleware.run(saga);

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

serviceWorker.unregister();
