import React from 'react';
import { shallow } from 'enzyme';
import App from '../App';
import Header from '../components/Header';

describe('<App /> component tests', () => {
  beforeEach(function () {
    this.createWrapper = (props) => {
      this.wrapper = shallow(
        <App {...props} />
      );
    };
  });

  it('should render Header', function () {
    this.createWrapper();
    expect(this.wrapper.find(Header).length).toBe(1);
  });

  it('if no children then render default text', function () {
    this.createWrapper();
    expect(this.wrapper.find('h1').text()).toBe('This is an exchange rate app');
  });
  it('if children then render them', function () {
    const props = {
      children: [
        <div key={1} className="test-element">test</div>
      ]
    };
    this.createWrapper(props);
    expect(this.wrapper.find('h1').length).toBe(0);
    expect(this.wrapper.find('.test-element').text()).toBe('test');
  });
});
