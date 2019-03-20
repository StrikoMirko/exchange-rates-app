import React from 'react';
import { createMockStore } from 'redux-test-utils';
import { shallow } from 'enzyme';

import DateTimePicker from 'react-datetime-picker';
import ExchangeRateDisplay from '../../components/ExchangeRateDisplay';
import ExchangeRates from '../ExchangeRates';

describe('<ExchangeRates /> container tests', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.createWrapper = (stateOverride = {}, propsOverrides = {}) => {
      // Set initialState by default and possibly override state.
      const state = {
        exchangerates: {},
        ...stateOverride
      };
      // Create a reduxMockStore.
      this.store = createMockStore(state);
      // Shallow render the component on this.wrapper variable and dive 1 level.
      this.wrapper = shallow(
        <ExchangeRates {...propsOverrides} />,
        { context: { store: this.store } }
      ).dive();
    };
  });

  it('renders DateTimePicker with containers', function () {
    // Shallow render the component.
    this.createWrapper();
    // Check to see that the DateTimePicker component exists.
    expect(this.wrapper.find(DateTimePicker).length).toBe(1);
  });

  it('renders ExchangeRateDisplay with containers', function () {
    // Shallow render the component.
    const state = {
      exchangerates: {
        rates: {
          GBP: 1.2,
          USD: 1.1
        },
        date: '2010-01-12',
        base: 'GBP'
      }
    };
    this.createWrapper(state);
    // Check to see that the DateTimePicker component exists.
    const display = this.wrapper.find(ExchangeRateDisplay);
    expect(display.length).toBe(1);
    expect(display.props()).toEqual({
      date: state.exchangerates.date,
      baseRate: state.exchangerates.base,
      rates: state.exchangerates.rates,
      rateClick: this.wrapper.instance().handleRatesHistoryClick
    });
  });

  it('fires correct actions on handle change for datepicker', function () {
    const exchangeRatesActionsSpy = jasmine.createSpy('exchangeRatesActionsSpy');
    const setExchangeRatesDateSpy = jasmine.createSpy('setExchangeRatesDateSpy');
    const propsOverride = {
      exchangeRatesActions: {
        fetchExchangeRates: exchangeRatesActionsSpy,
        setExchangeRatesDate: setExchangeRatesDateSpy
      }
    };
    // Shallow render the component.
    this.createWrapper({}, propsOverride);
    // Get instance and call handleChange
    const instance = this.wrapper.instance();
    instance.handleChange(new Date('2010-01-12'));
    // Make sure the correct action creators have been called.
    expect(exchangeRatesActionsSpy).toHaveBeenCalledWith('2010-01-12', undefined);
    expect(setExchangeRatesDateSpy).toHaveBeenCalledWith(new Date('2010-01-12'));
  });

  it('has a selectbox from base exchange', function () {
    // Shallow render the component.
    this.createWrapper({
      exchangerates: {
        rates: {
          GBP: 1.2,
          EUR: 1.3
        }
      }
    });
    // Check to see that the base exchange selectbox.
    const baseSelect = this.wrapper.find('.base-exchange-select');
    expect(baseSelect.length).toBe(1);
    expect(baseSelect.children().length).toBe(2);
    expect(baseSelect.children().at(0).text()).toBe('GBP');
    expect(baseSelect.children().at(1).text()).toBe('EUR');
  });
});
