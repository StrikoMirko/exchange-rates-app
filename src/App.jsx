import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';

/**
 * Main app.
 */
const App = (props) => {
  const { children } = props;
  return (
    <div className="container exchange-rate-app">
      <Header />
      { children ||
        <div>
          <h1>This is an exchange rate app</h1>
          <p>Feel free to click around and check it out.</p>
        </div> }
    </div>
  );
};

// Define the prop types.
App.propTypes = {
  children: PropTypes.element
};

export default App;
