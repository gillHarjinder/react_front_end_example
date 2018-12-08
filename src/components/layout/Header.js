import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

const Header = (props) => {
    // Using Destructure which extract the type from Props
    const { headerTitle } = props;
  return (
    <div>
      <div>
          <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
          <div className="container">
          <a href="/" className="navbar-brand">{headerTitle}</a>
          </div>
          <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to="/" className="nav-link">
                <i className="fas fa-home" /> Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/addcontact" className="nav-link"><i className="fas fa-plus" /> Add</Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link"><i className="fas fa-question" /> About</Link>
          </li>
          </ul>
          </nav>
      </div>
    </div>
  )
}

// Default Value, it needs if no Arg pass in Header in App.js file
Header.defaultProps = {
    headerTitle: "My App"
}

// Check the passed Prop types
Header.propTypes = {
    headerTitle: PropTypes.string.isRequired
}

export default Header;

