import React from 'react';
import PropTypes from 'prop-types';

/**
 * Pure React component About.
 */
const About = () => {
  const aboutUsText = (
    <div>
      <p>This is a test done as a part of an interview stage.</p>
      <p>The app is pretty cool</p>
      <p>
        Just test it out by clicking on the header navbar
        and trying our exchange rate api integration
      </p>
    </div>
  );
  return (
    <div className="about-us">
      { aboutUsText }
    </div>
  );
};

export default About;
