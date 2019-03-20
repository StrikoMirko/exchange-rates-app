import React from 'react';
import { shallow } from 'enzyme';
import ExchangeRateDisplay from '../ExchangeRateDisplay';
import normalisedResponseData from '../../helpers/testData/normalisedResponseData';

describe('<ExchangeRateDisplay /> component', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.createWrapper = (props) => {
      this.wrapper = shallow((
        <ExchangeRateDisplay {...props} />
      ));
    };
  });


  it('should render correctly', function () {
    const props = {
      rates: normalisedResponseData.exchangeRatesOnDateNormalised.rates,
      baseRate: normalisedResponseData.exchangeRatesOnDateNormalised.base,
      date: normalisedResponseData.exchangeRatesOnDateNormalised.date
    };
    // Mount the component.
    this.createWrapper(props);
    // Should render base and date.
    expect(this.wrapper.find('.exchange-rates-table__info').at(0).text()).toBe('Base rate selected: GBP');
    expect(this.wrapper.find('.exchange-rates-table__info').at(1).text()).toBe('Date selected: 2010-01-12');
    // Should render correct number of rows.
    expect(this.wrapper.find('tr').length).toBe(
      Object.keys(normalisedResponseData.exchangeRatesOnDateNormalised.rates).length + 2
    );
  });

});
