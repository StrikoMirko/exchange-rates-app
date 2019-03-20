import ApiDataNormaliser from '../ApiDataNormaliser';
import testResponseData from '../testData/responseData';
import testNormalisedResponseData from '../testData/normalisedResponseData';

describe('ApiDataNormaliser helper', () => {
  it('normalises the exchange rates on date response data', () => {
    // The response data is correctly normalised.
    expect(
      ApiDataNormaliser.normaliseExchangeRatesOnDay(testResponseData.exchangeRatesOnDate)
    ).toEqual(testNormalisedResponseData.exchangeRatesOnDateNormalised);
  });
});
