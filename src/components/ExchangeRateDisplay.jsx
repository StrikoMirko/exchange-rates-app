import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pure React component ExchangeRateDisplay.
 */
const ExchangeRateDisplay = (props) => {
  const { rates, baseRate, date } = props;
  const tr = Object.keys(rates).map((rate) => {
    return (
      <tr key={rate}>
        <td><button type="button" onClick={props.rateClick} data-rate={rate}>{ rate }</button></td>
        <td>{ rates[rate] }</td>
      </tr>
    );
  });
  return (
    <div className="exchange-rates-display">
      <table className="exchange-rates-table">
        <thead>
          <tr>
            <th colSpan={2}>
              <p className={`exchange-rates-table__info ${!baseRate && ' exchange-rates-table__info--hidden'}`}>
                Base rate selected: { baseRate }
              </p>
              <p className={`exchange-rates-table__info ${!date && ' exchange-rates-table__info--hidden'}`}>
                Date selected: { date }
              </p>
            </th>
          </tr>
          <tr>
            <th>Currency</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          { tr }
        </tbody>
      </table>
    </div>
  );
};

ExchangeRateDisplay.defaultProps = {
  rates: {}
};

// Define the prop types.
ExchangeRateDisplay.propTypes = {
  rates: PropTypes.object,
  baseRate: PropTypes.string,
  date: PropTypes.string,
  rateClick: PropTypes.func
};

export default ExchangeRateDisplay;
