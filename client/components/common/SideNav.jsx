import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { decodeToken } from '../../utils/authenticate';
import background from '../../public/images/background.jpg';
import avatar from '../../public/images/avatar.png';

/**
 * Class representing Side nav component
 *
 * @class SideNav
 * @extends {React.Component}
 */
class SideNav extends React.Component {
  /**
   * Function to handle changing of tabs
   *
   * @param {any} event - Event from clicking and element
   * @returns {any} Changes to the corresponding tab
   * @memberof SideNav
   */
  handleTabChange = (event) => {
    event.preventDefault();
    const { target: { name } } = event;
    $('ul.tabs').tabs('select_tab', name);
  }

  /**
   * Render function
   *
   * @returns {object} React element
   * @memberof SideNav
   */
  render() {
    const { user: { isAuthenticated }, location: { pathname } } = this.props,
      dashboard = pathname.match(/(users)/) === null ? null : 'fixed', // check the regex
      decoded = decodeToken();
    let userId;
    if (decoded) {
      const { user: { id } } = decoded;
      userId = id;
    }
    return (
      <div>
        <ul className={`side-nav ${dashboard}`} id="slide_out">
          <li>
            <div
              className="nav-wrapper deep-orange darken-4 hide-on-med-and-up"
            >
              <a id="logo" href="index.html" className="white-text">
                More-Recipes
              </a>
            </div>
          </li>
          {isAuthenticated &&
            <div>
              <li>
                <div className="user-view">
                  <div className="background">
                    <img src={background} alt="" />
                  </div>
                  <a href="#!user">
                    <img className="circle" src={avatar} alt="" />
                  </a>
                  <a href="#!name">
                    <span className="white-text name">John Stew</span>
                  </a>
                  <a href="#!email">
                    <span className="white-text email">johnstew@gmail.com</span>
                  </a>
                </div>
              </li>
            </div>
          }
          <li><Link to="/">Home</Link></li>
          <li>
            <ul className="collapsible" data-collapsible="accordion">
              <li>
                <div className="collapsible-header black-text">Category</div>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a href="#!" className="collection-item">Breakfast</a>
                    </li>
                    <li><a href="#!" className="collection-item">Lunch</a></li>
                    <li><a href="#!" className="collection-item">Dinner</a></li>
                    <li>
                      <a href="#!" className="collection-item">Appetizer</a>
                    </li>
                    <li><a href="#!" className="collection-item">Main</a></li>
                    <li>
                      <a href="#!" className="collection-item">Dessert</a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="divider" />
          </li>
          {isAuthenticated ?
            <div>
              <li><Link to={`/users/${userId}/dashboard`} >Dashboard</Link></li>
              <li>
                <div className="divider" />
              </li>
              <li>
                <a name="user-profile" href="#!" onClick={this.handleTabChange}>
                  Profile
                </a>
              </li>
              <li><a className="subheader">Activities</a></li>
              <li>
                <a name="user-recipes" href="#!" onClick={this.handleTabChange}>
                  My Recipes
                  <span className="badge">22</span>
                </a>
              </li>
              <li>
                <a
                  name="user-favorites"
                  href="#!"
                  onClick={this.handleTabChange}
                >
                  My Favorites
                  <span className="badge">55</span>
                </a>
              </li>
              <li>
                <a href="profile.html?#notifications">
                  Notificatons
                  <span className="new badge deep-orange darken-1">2</span>
                </a>
              </li>
              <li>
                <div className="divider" />
              </li>
              <li><a href="index.html">Logout</a></li>
            </div> :
            <div>
              <li><a href="#signin" className="modal-trigger">Sign In</a></li>
              <li><a href="#signup" className="modal-trigger">Register</a></li>
            </div>
          }
        </ul>
      </div>
    );
  }
}

SideNav.propTypes = {
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
};

export default SideNav;
