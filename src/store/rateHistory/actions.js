// Export the action definitions.
import ApiConnector from '../../helpers/ApiConnector';

export const LOAD_RATES_HISTORY = 'LOAD_RATES_HISTORY';
export const FETCH_RATES_HISTORY = 'FETCH_RATES_HISTORY';

/**
 * Load exchange rates history.
 *
 * @param {array} history
 *
 * @returns {object} action
 */
export function loadExchangeRatesHistory(ratesHistory) {
  return {
    type: LOAD_RATES_HISTORY,
    ratesHistory,
  };
}

/**
 * Fetch exchange rate history
 *
 * @returns {function} dispatched loadChatLog method
 */
export function fetchExchangeRatesHistory(date, base) {
  return async (dispatch) => {
    // Dispatch the FETCH_RATES action.
    dispatch({ type: FETCH_RATES_HISTORY });
    // Get exchange rates and dispatch the
    // loadExchangeRates action with fetched chats.
    try {
      const ratesHistory = await ApiConnector.getExchangeRatesHistory(date, base);
      // Sort the ratesHistory.rate properties.
      let sortedRates = {};
      Object.keys(ratesHistory.rates).sort().reverse().forEach((rate) => {
        sortedRates = { ...sortedRates, [rate]: ratesHistory.rates[rate] };
      });
      dispatch(loadExchangeRatesHistory({ ...ratesHistory, rates: sortedRates }));
      return ratesHistory;
    } catch (error) {
      throw new Error(`Unable to fetch exchange rates: ${error}`);
    }
  };
}
