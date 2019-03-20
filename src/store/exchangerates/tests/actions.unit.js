import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import * as actions from '../actions';
import testResponseData from '../../../helpers/testData/responseData';
import testNormalisedResponseData from '../../../helpers/testData/normalisedResponseData';
import ApiConnector, { RATES_BY_DATE_ENDPOINT } from '../../../helpers/ApiConnector';

describe('Exchange rates action creator', () => {
  it('load exchange rates', () => {
    // Create LOAD_RATES action and compare
    // with expected action.
    const dymmyData = {
      rates: {
        somerate: 1.2
      }
    };
    const action = actions.loadExchangeRates(dymmyData);
    const expectedAction = {
      type: actions.LOAD_RATES,
      exchangeRates: dymmyData
    };
    expect(action).toEqual(expectedAction);
  });

  it('set exchange rate date', () => {
    // Create SET_RATES_DATE action and compare
    // with expected action.
    const date = '2010-01-12';
    const action = actions.setExchangeRatesDate(date);
    const expectedAction = {
      type: actions.SET_RATES_DATE,
      date
    };
    expect(action).toEqual(expectedAction);
  });

  it('set base exchange rate date', () => {
    // Create SET_RATES_BASE action and compare
    // with expected action.
    const base = 'GBP';
    const action = actions.setExchangeRatesBase(base);
    const expectedAction = {
      type: actions.SET_RATES_BASE,
      base
    };
    expect(action).toEqual(expectedAction);
  });

  it('executes fetchExchangeRates thunk action correctly', async () => {
    // Mock API endpoints
    const mockAdapter = new MockAdapter(axios);
    // Mock the dummy endpoint to test the call method.
    mockAdapter
      .onGet(ApiConnector.getEndpoint(RATES_BY_DATE_ENDPOINT, '2010-01-12', 'GBP'))
      .reply(200, testResponseData.exchangeRatesOnDate);

    // Create a spy, dire off the thunk action creator, wait for it
    // and expect certain actions.
    const exchangeRates = testNormalisedResponseData.exchangeRatesOnDateNormalised;
    const dispatch = jasmine.createSpy('dispatch');
    await actions.fetchExchangeRates('2010-01-12', 'GBP')(dispatch);
    const expectedFunctionCalls = [
      { type: actions.FETCH_RATES },
      {
        type: actions.LOAD_RATES,
        exchangeRates
      }
    ];
    expect(dispatch).toHaveBeenCalledTimes(2);
    expect(dispatch).toHaveBeenCalledWith(expectedFunctionCalls[0]);
    expect(dispatch).toHaveBeenCalledWith(expectedFunctionCalls[1]);
  });
});
