// Export the action definitions.
import ApiConnector from '../../helpers/ApiConnector';

export const LOAD_RATES = 'LOAD_RATES';
export const FETCH_RATES = 'FETCH_RATES';
export const SET_RATES_DATE = 'SET_RATES_DATE';
export const SET_RATES_BASE = 'SET_RATES_BASE';

/**
 * Set exchange rates date.
 *
 * @param {string} date
 *
 * @returns {object} action
 */
export function setExchangeRatesDate(date) {
  return {
    type: SET_RATES_DATE,
    date,
  };
}

/**
 * Set exchange rates date.
 *
 * @param {string} base
 *
 * @returns {object} action
 */
export function setExchangeRatesBase(base) {
  return {
    type: SET_RATES_BASE,
    base,
  };
}

/**
 * Load exchange rates.
 *
 * @param {array} rates
 *
 * @returns {object} action
 */
export function loadExchangeRates(exchangeRates) {
  return {
    type: LOAD_RATES,
    exchangeRates,
  };
}

/**
 * Fetch exchange rates.
 *
 * @returns {function} dispatched loadChatLog method
 */
export function fetchExchangeRates(date, base) {
  return async (dispatch) => {
    // Dispatch the FETCH_RATES action.
    dispatch({ type: FETCH_RATES });
    // Get exchange rates and dispatch the
    // loadExchangeRates action with fetched chats.
    try {
      const rates = await ApiConnector.getExchangeRatesOnDate(date, base);
      dispatch(loadExchangeRates(rates));
      return rates;
    } catch (error) {
      throw new Error(`Unable to fetch exchange rates: ${error}`);
    }
  };
}
