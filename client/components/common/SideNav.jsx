import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { decodeToken } from '../../utils/authenticate';

const propTypes = {
  handleToggleSignupModal: PropTypes.func,
  handleToggleSigninModal: PropTypes.func,
  handleLogoutUser: PropTypes.func.isRequired,
  handleSearchCategory: PropTypes.func,
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    userProfile: PropTypes.shape({
      notifications: PropTypes.bool,
    })
  }).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string
  }).isRequired,
  userRecipes: PropTypes.shape({
    userAddedRecipesCount: PropTypes.number,
    userFavoritesCount: PropTypes.number,
  }),
  editUserProfile: PropTypes.func.isRequired,
  currentProfileUserId: PropTypes.number,
  authenticatedUserId: PropTypes.number,
};

const defaultProps = {
  handleToggleSignupModal: undefined,
  handleToggleSigninModal: undefined,
  handleSearchCategory: undefined,
  currentProfileUserId: null,
  authenticatedUserId: null,
  userRecipes: undefined,
};

/**
 * Class representing Side nav component
 *
 * @class SideNav
 *
 * @extends {React.Component}
 */
class SideNav extends React.Component {
  /**
   * ComponentDidMount life cycle method
   *
   * @returns {any} Initialize materialize collapsible class
   *
   * @memberof SideNav
   */
  componentDidMount() {
    $('.collapsible').collapsible();
  }

  /**
   * Function to handle changing of tabs
   *
   * @param {any} event - Event from clicking and element
   *
   * @returns {any} Changes to the corresponding tab
   *
   * @memberof SideNav
   */
  handleTabChange = (event) => {
    event.preventDefault();
    const { target: { name } } = event;
    $('ul.tabs').tabs('select_tab', name);
  }

  /**
   * Handle change in notification switch
   *
   * @returns {object} Change the switch position
   *
   * @memberof SideNav
   */
  handleNotificationChange = () => {
    const { editUserProfile } = this.props;
    const checked = document.getElementById('notification-switch').checked;
    const status = {
      notifications: checked,
    };

    editUserProfile(status);
  }

  /**
   * Render the dashboard options
   *
   * @returns {object} React element
   *
   * @memberof SideNav
   */
  renderDashboard = () => {
    const {
      user, location: { pathname }, userRecipes, handleLogoutUser,
      currentProfileUserId, authenticatedUserId,
    } = this.props;
    const { userProfile: { notifications } } = user;
    const decoded = decodeToken();
    const userUrl = /(?:users)\/\d+\/(?:dashboard)/;
    const dashboard = userUrl.test(pathname);

    let userId;

    if (decoded) {
      const { user: { id } } = decoded;
      userId = id;
    }

    return (
      <div>
        <li><Link to={`/users/${userId}/dashboard`} >Dashboard</Link></li>
        <li>
          <div className="divider" />
        </li>
        {dashboard &&
          <div>
            <li>
              <a name="user-profile" href="#!" onClick={this.handleTabChange}>
                Profile
              </a>
            </li>
            <li>
              <a name="user-recipes" href="#!" onClick={this.handleTabChange}>
                Recipes
                <span className="badge">
                  {userRecipes && userRecipes.userAddedRecipesCount}
                </span>
              </a>
            </li>
            <li>
              <a
                name="user-favorites"
                href="#!"
                onClick={this.handleTabChange}
              >
                Favorites
                <span className="badge">
                  {userRecipes && userRecipes.userFavoritesCount}
                </span>
              </a>
            </li>
          </div>
        }
        {dashboard &&
          currentProfileUserId === authenticatedUserId &&
          <div>
            <li>
              <a>
                Notifications
                <span className=" badge switch">
                  <label htmlFor="notification-switch">
                    <input
                      id="notification-switch"
                      type="checkbox"
                      onClick={this.handleNotificationChange}
                      defaultChecked={notifications}
                    />
                    <span className="lever" />
                  </label>
                </span>
              </a>
            </li>
            <li>
              <div className="divider" />
            </li>
          </div>
        }
        <li>
          <a
            role="button"
            tabIndex="0"
            className="logout-button"
            onClick={handleLogoutUser}
          >
            Logout
          </a>
        </li>
      </div>
    );
  }

  /**
   * Render function
   *
   * @returns {object} React element
   *
   * @memberof SideNav
   */
  render() {
    const {
      user, location: { pathname }, handleToggleSignupModal,
      handleToggleSigninModal, handleSearchCategory
    } = this.props;
    const { isAuthenticated } = user;
    const userUrl = /(?:users)\/\d+\/(?:dashboard)/;
    const fixed = userUrl.test(pathname) ? 'fixed' : null;

    return (
      <div>
        <ul className={`side-nav ${fixed}`} id="slide_out">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/catalog">Catalog</Link></li>
          <li>
            <ul className="collapsible" data-collapsible="accordion">
              <li>
                <div className="collapsible-header black-text">Category</div>
                <div className="collapsible-body">
                  <ul>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        name="breakfast"
                        className="collection-item"
                        onClick={handleSearchCategory}
                      >
                        Breakfast
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        name="lunch"
                        className="collection-item"
                        onClick={handleSearchCategory}
                      >
                        Lunch
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        name="dinner"
                        className="collection-item"
                        onClick={handleSearchCategory}
                      >
                        Dinner
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        name="appetizer"
                        className="collection-item"
                        onClick={handleSearchCategory}
                      >
                        Appetizer
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        name="main"
                        className="collection-item"
                        onClick={handleSearchCategory}
                      >
                        Main
                      </a>
                    </li>
                    <li>
                      <a
                        role="button"
                        tabIndex="0"
                        name="dessert"
                        className="collection-item"
                        onClick={handleSearchCategory}
                      >
                        Dessert
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </li>
          <li>
            <div className="divider" />
          </li>
          {isAuthenticated
            ? this.renderDashboard()
            : <div>
              <li>
                <a
                  role="button"
                  tabIndex="0"
                  onClick={handleToggleSigninModal}
                >
                  Sign In
                </a>
              </li>
              <li>
                <a
                  role="button"
                  tabIndex="0"
                  onClick={handleToggleSignupModal}
                >
                  Register
                </a>
              </li>
            </div>
          }
        </ul>
      </div>
    );
  }
}

SideNav.propTypes = propTypes;
SideNav.defaultProps = defaultProps;

export default SideNav;
