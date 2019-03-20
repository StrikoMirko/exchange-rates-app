import React from 'react';
import PropTypes from 'prop-types';

/**
 * React component for exchange rates history.
 */
const RatesHistory = (props) => {
  const { rates } = props.history;
  const { closeModal } = props;
  const generateTr = (historyRates) => {
    return Object.keys(historyRates).map((rate) => {
      return (
        <tr key={rate}>
          <td>
            {rate}
          </td>
          <td>{historyRates[rate]}</td>
        </tr>
      );
    });
  };
  const tables = rates && Object.keys(rates).map((date) => {
    return (
      <table key={date}>
        <thead>
          <tr>
            <th colSpan={2}>
              { date }
            </th>
          </tr>
        </thead>
        <tbody>
          { generateTr(rates[date]) }
        </tbody>
      </table>
    );
  });
  return (
    <div className="exchange-rates-history">
      <h4>Rate history for past 12 months</h4>
      <button className="exchange-rates-history__closer" type="button" onClick={closeModal}>&times;</button>
      { tables }
    </div>
  );
};

RatesHistory.propTypes = {
  history: PropTypes.object,
  closeModal: PropTypes.func
};

export default RatesHistory;
