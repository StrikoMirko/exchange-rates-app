// Get the proper action definitions and initial state.
import { LOAD_RATES, SET_RATES_DATE, SET_RATES_BASE } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case SET_RATES_DATE: {
      return { ...state, date: action.date };
    }
    case SET_RATES_BASE: {
      return { ...state, base: action.base };
    }
    case LOAD_RATES: {
      return { ...state, rates: action.exchangeRates.rates };
    }
    default:
      return state;
  }
};
