// top level wrapper for all other routes, to allow persistence
// of login status after refresh

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');
var SessionStore = require('../../stores/sessionStore');

var App = React.createClass({
  getInitialState: function () {
    return { currentUser: null };
  },

  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.updateUser);
    if (SessionStore.currentUserHasBeenFetched()) {
      this.updateUser();
    } else {
      ApiUtil.getCurrentUser();
    }
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  updateUser: function () {
    if (SessionStore.isLoggedIn()) {
      this.setState({ currentUser: SessionStore.currentUser() });
    }
  },

  render: function () {
    return <div>{this.props.children}</div>;
  }
});

module.exports = App;
