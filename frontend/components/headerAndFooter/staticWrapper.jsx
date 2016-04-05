// Navigational header and footer for project creation and pledge pages

var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var CurrentUserNav = require('./currentUserNav');
var SessionLinks = require('./sessionLinks');

var StaticWrapper = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.refresh);
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  refresh: function () {
    // send them back to the main page if they log out here
    if (!SessionStore.isLoggedIn()) {
      this.context.router.push("/");
    }
  },

  render: function () {
    var userMenu;
    if (SessionStore.isLoggedIn()) {
      userMenu = <CurrentUserNav currentUser={SessionStore.currentUser()} />;
    } else {
      userMenu = <SessionLinks />;
    }

    return (
      <div>
        <header className="static-header group">
          <a className="header-logo" href="/">
            <div className="header-logo-div"></div>
          </a>

          {userMenu}
        </header>

        {this.props.children}

        <footer className="static-footer" />
      </div>
    );
  }

});

module.exports = StaticWrapper;
