import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Thunk from 'redux-thunk';

import reducers from './store/reducers';

import App from './App';
import About from './components/About';
import ExchangeRates from './containers/ExchangeRates';
import './styles/scss/styles.scss';

/* eslint-disable no-underscore-dangle */
const createStoreWithMiddleware = applyMiddleware(Thunk)(createStore);
const store = createStoreWithMiddleware(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
/* eslint-enable */

const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <Route path="about" components={About} />
        <Route path="exchange-rates" components={ExchangeRates} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
