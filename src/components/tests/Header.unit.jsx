import React from 'react';
import { shallow } from 'enzyme';
import { Link } from 'react-router';
import Header from '../Header';

describe('<Header /> component', () => {
  // Create the createWrapper function that will shallow render the component
  // based on the functions arguments.
  beforeEach(function () {
    this.createWrapper = (props) => {
      this.wrapper = shallow((
        <Header {...props} />
      ));
    };
  });

  it('should render the correctly', function () {
    // Mount the component.
    this.createWrapper();
    // Should render React element correctly.
    expect(this.wrapper.find('.header-navbar').length).toBe(1);
    expect(this.wrapper.find('nav').length).toBe(1);
    expect(this.wrapper.find('nav').children().length).toBe(3);
    expect(this.wrapper.find('Link').length).toBe(3);
    expect(this.wrapper.find('Link').at(0).prop('to')).toBe('/');
    expect(this.wrapper.find('Link').at(1).prop('to')).toBe('/about');
    expect(this.wrapper.find('Link').at(2).prop('to')).toBe('/exchange-rates');
  });

  it('should renders with other props', function () {
    const props = {
      links: [
        {
          label: 'Test',
          path: '/test'
        }
      ]
    };
    // Mount the component.
    this.createWrapper(props);
    // Should render React element correctly.
    expect(this.wrapper.find('.header-navbar').length).toBe(1);
    expect(this.wrapper.find('nav').length).toBe(1);
    expect(this.wrapper.find('nav').children().length).toBe(1);
    expect(this.wrapper.find('Link').length).toBe(1);
    expect(this.wrapper.find('Link').at(0).prop('to')).toBe('/test');
  });
});
