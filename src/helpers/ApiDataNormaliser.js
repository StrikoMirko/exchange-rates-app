/*
* Helper class used to normalise API response data
* into a consistent structure used by our app.
* */
export default class ApiDataNormaliser {
  /**
   * Normalises the exchange rates on day response data.
   * @param {object} apiResponse
   *
   * @returns {object} normalised exchange rates on day object.
   */
  static normaliseExchangeRatesOnDay(apiResponse) {
    return { ...apiResponse };
  }
}
