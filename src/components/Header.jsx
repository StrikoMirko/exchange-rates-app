import React from 'react';
import { Link } from 'react-router';
import PropTypes from 'prop-types';

/**
 * Pure React component Header.
 */
const Header = (props) => {
  const links = props.links.map((link) => {
    return (
      <Link className="header-navbar__link" key={link.path} to={link.path} href={link.path}>
        { link.label }
      </Link>
    );
  });
  return (
    <div className="header-navbar">
      <nav>
        { links }
      </nav>
    </div>
  );
};

Header.defaultProps = {
  links: [
    {
      label: 'Homepage',
      path: '/'
    },
    {
      label: 'About',
      path: '/about'
    },
    {
      label: 'Exchange rates',
      path: '/exchange-rates'
    },
  ]
};

// Define the prop types.
Header.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      path: PropTypes.string
    })
  )
};


export default Header;
