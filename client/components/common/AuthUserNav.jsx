import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { decodeToken } from '../../utils/authenticate';

/**
 * User navigation when unathenticated
 *
 * @param {func} props - Logout a user
 * @returns {object} React element
 */
const AuthUserNav = (props) => {
  const { handleLogoutUser } = props,
    decoded = decodeToken();
  let userId;
  if (decoded) {
    const { user: { id } } = decoded;
    userId = id;
  }
  return (
    <ul id="user-control" className="dropdown-content">
      <li>
        <Link to={`/users/${userId}/dashboard`} className="black-text">
          Dashboard
          <i className="material-icons left">person</i>
        </Link>
      </li>
      <li>
        {/* <Link to={`/users/${user && user.id}`} className="black-text">
          My Recipes<i className="material-icons left">folder</i>
        </Link> */}
      </li>
      <li className="divider" />
      <li>
        <a
          role="button"
          tabIndex="0"
          className="black-text"
          onClick={handleLogoutUser}
        >
          Logout
          <i className="material-icons left">lock</i>
        </a>
      </li>
    </ul>
  );
};

AuthUserNav.propTypes = {
  handleLogoutUser: PropTypes.func.isRequired,
};

export default AuthUserNav;
