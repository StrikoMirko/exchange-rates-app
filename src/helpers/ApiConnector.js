import axios from 'axios';
import moment from 'moment';
import config from '../../config';
import ApiDataNormaliser from './ApiDataNormaliser';

export const RATES_BY_DATE_ENDPOINT = 'RATES_BY_DAY_ENDPOINT';
export const RATES_HISTORY_ENDPOINT = 'RATES_HISTORY_ENDPOINT';

class ApiConnector {
  /**
   * Returns a properly formed endpoint.
   *
   * @param {string} endpoint
   * @param {string} date
   * @param {string} base
   *
   * @returns {string} full endpoint
   */
  static getEndpoint(endpoint, date = 'latest', base) {
    switch (endpoint) {
      case RATES_BY_DATE_ENDPOINT: {
        const basePrefix = base ? `?base=${base}` : '';
        return `${date}${basePrefix}`;
      }
      case RATES_HISTORY_ENDPOINT: {
        const startDate = moment(date).subtract(12, 'months').format('YYYY-MM-DD');
        return `history?start_at=${startDate}&end_at=${date}&base=${base}`;
      }
      default:
        return 'latest';
    }
  }

  /**
   * Request defaults for axios.
   *
   * @returns {object} deafults for axios request.
   */
  static getRequestDefaults() {
    return {
      method: 'get',
      baseURL: config.apiUrl,
      url: '/',
      data: null,
      headers: {
        Accept: 'application/json'
      }
    };
  }

  /**
   * Call an endpoint, with optional request overrides.
   *
   * @param {string} endpoint
   * @param {object} requestOverride
   *
   * @returns {object} axios response object.
   */
  static call = async (endpoint, requestOverride = {}) => {
    // Request options.
    const request = {
      ...ApiConnector.getRequestDefaults(),
      ...requestOverride,
      url: endpoint,
    };
    // Get the response and return it, else throw error.
    try {
      const response = await axios(request).then(r => r);
      return response;
    } catch (error) {
      throw new Error(`Unable to execute the axios request:${error}`);
    }
  };

  /**
   * Get exchange rates on date.
   *
   * @returns {object} exchange rates.
   */
  static getExchangeRatesOnDate = async (date, base) => {
    try {
      const response = await ApiConnector.call(ApiConnector.getEndpoint(
        RATES_BY_DATE_ENDPOINT,
        date,
        base
      ));
      return ApiDataNormaliser.normaliseExchangeRatesOnDay(response.data);
    } catch (error) {
      throw new Error('Problems in getting the exchange rates by day');
    }
  };

  /**
   * Get exchange rates history.
   *
   * @returns {array} list of genres.
   */
  static getExchangeRatesHistory = async (date, base) => {
    try {
      const response = await ApiConnector.call(ApiConnector.getEndpoint(
        RATES_HISTORY_ENDPOINT,
        date,
        base
      ));
      return response.data;
    } catch (error) {
      throw new Error('Problems in getting the exchange rates history');
    }
  };
}

export default ApiConnector;
