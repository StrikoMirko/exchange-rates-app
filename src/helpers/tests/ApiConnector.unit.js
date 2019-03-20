import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import config from '../../../config';
import ApiConnector, { RATES_BY_DATE_ENDPOINT } from '../ApiConnector';

import testResponseData from '../testData/responseData';
import testNormalisedResponseData from '../testData/normalisedResponseData';

describe('ApiConnector helper', () => {
  it('generates the correct request defaults', () => {
    const requestOptions = {
      method: 'get',
      baseURL: config.apiUrl,
      url: '/',
      data: null,
      headers: {
        Accept: 'application/json'
      }
    };
    // ApiConnector generates the correct request defaults.
    expect(ApiConnector.getRequestDefaults()).toEqual(requestOptions);
  });
  it('provides correct endpoints', () => {
    // Check if the ApiConnector returns the correct exchange rates by day endpoint.
    expect(ApiConnector.getEndpoint(RATES_BY_DATE_ENDPOINT)).toEqual(
      'latest'
    );
    expect(ApiConnector.getEndpoint(RATES_BY_DATE_ENDPOINT, '2010-01-12')).toEqual(
      '2010-01-12'
    );
    expect(ApiConnector.getEndpoint(RATES_BY_DATE_ENDPOINT, '2010-01-12', 'USD')).toEqual(
      '2010-01-12?base=USD'
    );
  });
  // Async/Await $it function from axios-mock-adapter.
  it('executes the call method correctly', async () => {
    // Initialise the mockAdapter and define a dummyEndpoint.
    const dummyEndpoint = 'dummy/endpoint';
    const mockAdapter = new MockAdapter(axios);
    // Mock the dummy endpoint to test the call method.
    mockAdapter
      .onGet(dummyEndpoint)
      .reply(200, 'dummy response');
    // Create an axios request options.
    const expectedAxiosRequest = {
      ...ApiConnector.getRequestDefaults(),
      url: dummyEndpoint
    };
    // Here we want to test that the ApiConnector call method
    // return the expected response
    const response = await ApiConnector.call(dummyEndpoint);
    const expectedAxiosResponse = await axios(expectedAxiosRequest).then(r => r);
    expect(response).toEqual(expectedAxiosResponse);
  });

  it('returns the exchange rates on date', async () => {
    const mockAdapter = new MockAdapter(axios);
    // Mock the fake ENDPOINT_GENRE_LIST endpoint with testData.
    mockAdapter
      .onGet(ApiConnector.getEndpoint(RATES_BY_DATE_ENDPOINT))
      .reply(200, testResponseData.exchangeRatesOnDate);

    // The getGenreList method returns the correct test data.
    const exchangeRatesData = await ApiConnector.getExchangeRatesOnDate();
    expect(exchangeRatesData).toEqual(testNormalisedResponseData.exchangeRatesOnDateNormalised);
  });

});
