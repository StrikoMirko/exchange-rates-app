import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import * as exchangeRates from '../store/exchangerates/actions';
import * as ratesHistory from '../store/rateHistory/actions';
import ExchangeRateDisplay from '../components/ExchangeRateDisplay';
import RatesHistory from '../components/RatesHistory';

const mapStateToProps = (state) => ({
  exchangerates: state.exchangerates,
  ratesHistory: state.ratesHistory,
  ...state,
});

const mapDispatchToProps = (dispatch, props) => ({
  exchangeRatesActions: bindActionCreators(exchangeRates, dispatch),
  ratesHistoryActions: bindActionCreators(ratesHistory, dispatch),
  ...props,
});

/**
 * React container component for exchange rates.
 */
class ExchangeRates extends Component {
  /**
   * Constructor function, set default state.
   *
   * @param {object} props
   */
  constructor(props) {
    super(props);
    this.state = {
      reatesHistory: false
    };
  }

  componentWillMount() {
    if (!this.props.exchangerates.rates) {
      this.props.exchangeRatesActions.fetchExchangeRates();
    }
  }

  /**
   * Handles DateTimePicker on change.
   *
   * @param {object} date
   */
  handleChange = (date) => {
    const { base } = this.props.exchangerates;
    const formattedDate = date && moment(date).format('YYYY-MM-DD');
    this.props.exchangeRatesActions.fetchExchangeRates(formattedDate || 'latest', base);
    this.props.exchangeRatesActions.setExchangeRatesDate(date);
  };

  /**
   * Handles Select base on change.
   *
   * @param {object} date
   */
  handleBaseChange = (base) => {
    const { date } = this.props.exchangerates;
    const formattedDate = date && moment(date).format('YYYY-MM-DD');
    this.props.exchangeRatesActions.fetchExchangeRates(formattedDate || 'latest', base.target.value);
    this.props.exchangeRatesActions.setExchangeRatesBase(base.target.value);
  };

  /**
   * Handles click on getting exchange rates history.
   *
   * @param {object} e
   */
  handleRatesHistoryClick = (e) => {
    const { date } = this.props.exchangerates;
    const rate = e.target.getAttribute('data-rate');
    const formattedDate = date ? moment(date).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
    this.props.ratesHistoryActions.fetchExchangeRatesHistory(formattedDate || 'latest', rate);
    this.setState({ reatesHistory: true });
  };

  /**
   * Renders base exchange selectbox.
   *
   * @param {object} rates
   */
  renderBaseExchange = (rates, base) => {
    const defaultBase = base || 'EUR';
    const options = rates && Object.keys(rates).map((rate) => {
      return (
        <option key={rate} value={rate}>{rate}</option>
      );
    });
    // Because the API is weird and by default gives no EUR.
    const firstOption = rates && !rates.EUR && <option value="EUR">EUR</option>;
    return (
      <select value={defaultBase} onChange={this.handleBaseChange} className="base-exchange-select">
        { firstOption }
        { options }
      </select>
    );
  };

  render() {
    const { rates, date, base } = this.props.exchangerates;
    const formattedDate = date && moment(date).format('YYYY-MM-DD');
    const baseExchange = this.renderBaseExchange(rates, base);
    return (
      <div>
        <div className="row">
          <div className="col-6">
            <h3>Select DFX rates date</h3>
            <DateTimePicker onChange={this.handleChange} value={date} />
          </div>
          <div className="col-6">
            <h3>Set base rate</h3>
            { baseExchange }
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <ExchangeRateDisplay
              rateClick={this.handleRatesHistoryClick}
              rates={rates}
              baseRate={base}
              date={formattedDate}
            />
          </div>
        </div>
        { this.state.reatesHistory &&
          <RatesHistory
            closeModal={() => this.setState({ reatesHistory: false })}
            history={this.props.ratesHistory}
          />
        }
      </div>
    );
  }
}

ExchangeRates.propTypes = {
  exchangerates: PropTypes.object,
  exchangeRatesActions: PropTypes.object,
  ratesHistoryActions: PropTypes.object,
  ratesHistory: PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(ExchangeRates);
