import React from 'react';
import { shallow } from 'enzyme';
import About from '../About';

describe('<About /> component', () => {
  it('should render about page', () => {
    // shallow render
    const wrapper = shallow(<About />);
    // Should render 3 checkbox items.
    expect(wrapper.find('.about-us').length).toBe(1);
  });
});
