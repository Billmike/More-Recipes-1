import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import actionCreators from '../../actions';
import Header from '../common/Header';
import Footer from '../common/Footer';
import Main from './Main';

/**
 * Class representing the home component
 *
 * @class Home
 * @extends {React.Component}
 */
class Home extends React.Component {
/**
 * Creates an instance of Home.
 *
 * @memberof Home
 */
  constructor() {
    super();
    this.state = {
      openSignup: false,
      openSignin: false
    };
    this.handleOpenSignup = this.handleOpenSignup.bind(this);
    this.handleOpenSignin = this.handleOpenSignin.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  /**
   * Component did mount function
   *
   * @returns {object} The response from the server
   * @memberof Home
   */
  componentDidMount() {
    this.props.retrieveRecipes();
  }

  /**
   * Opens the signup modal
   *
   * @returns {object} Set open state to true
   * @memberof Home
   */
  handleOpenSignup() {
    this.setState({ openSignup: true });
  }

  /**
   * Opens the signin modal
   *
   * @returns {object} Set open state to true
   * @memberof Home
   */
  handleOpenSignin() {
    this.setState({ openSignin: true });
  }

  /**
   * Closes the modal
   *
   * @param {object} errors - The error object
   * @returns {object} Set open state to false
   * @memberof Home
   */
  handleClose() {
    this.setState({
      openSignup: false,
      openSignin: false
    });
  }

  /**
   * The render function
   *
   * @returns {any} React element
   * @memberof Home
   */
  render() {
    return (
      <div>
        <header>
          <Header
            openSignup={this.state.openSignup}
            openSignin={this.state.openSignin}
            handleOpenSignup={this.handleOpenSignup}
            handleOpenSignin={this.handleOpenSignin}
            handleClose={this.handleClose}
            {...this.props}
          />
        </header>
        <main>
          <Main {...this.props} />
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  recipes: state.recipes,
  user: state.user,
});

const mapDispatchToProps = dispatch => (
  bindActionCreators(actionCreators, dispatch)
);

Home.propTypes = {
  retrieveRecipes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
