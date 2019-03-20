// Get the proper action definitions and initial state.
import { LOAD_RATES_HISTORY } from './actions';

export default (state = {}, action) => {
  switch (action.type) {
    case LOAD_RATES_HISTORY: {
      return action.ratesHistory;
    }
    default:
      return state;
  }
};
