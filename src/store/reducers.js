// Combine all reducers and export them.
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import ExchangeRatesReducer from './exchangerates/reducer';
import ExchangeRatesHistoryReducer from './rateHistory/reducer';

const reducers = combineReducers({
  exchangerates: ExchangeRatesReducer,
  ratesHistory: ExchangeRatesHistoryReducer,
  routing: routerReducer
});

export default reducers;
