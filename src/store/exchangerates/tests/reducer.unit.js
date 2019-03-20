import { LOAD_RATES, SET_RATES_BASE, SET_RATES_DATE } from '../actions';
import reducer from '../reducer';
import normalisedResponseData from '../../../helpers/testData/normalisedResponseData';

describe('Exchange rates reducer', () => {
  it('Returns initial state', () => {
    // Should return default state.
    expect(reducer(undefined, {})).toEqual({});
  });

  it('Set exchange rates date', () => {
    // Reducer should return proper data for this action.
    const date = '2010-01-12';
    const action = {
      type: SET_RATES_DATE,
      date
    };
    expect(reducer({}, action)).toEqual({ date });
  });

  it('Set exchange rates base', () => {
    // Reducer should return proper data for this action.
    const base = 'GBP';
    const action = {
      type: SET_RATES_BASE,
      base
    };
    expect(reducer({}, action)).toEqual({ base });
  });

  it('Load exchange rates', () => {
    // Reducer should return proper data for this action.
    const exchangeRates = normalisedResponseData.exchangeRatesOnDateNormalised;
    const action = {
      type: LOAD_RATES,
      exchangeRates
    };
    expect(reducer({}, action)).toEqual({ rates: exchangeRates.rates });
  });

  it('Load exchange rates with existing state', () => {
    // Reducer should return proper data for this action.
    const exchangeRates = normalisedResponseData.exchangeRatesOnDateNormalised;
    const action = {
      type: LOAD_RATES,
      exchangeRates
    };
    expect(reducer({ date: '2010-01-12' }, action)).toEqual({ date: '2010-01-12', rates: exchangeRates.rates });
    expect(reducer({ base: 'GBP' }, action)).toEqual({ base: 'GBP', rates: exchangeRates.rates });
  });
});
