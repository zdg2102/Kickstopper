// Header for NavWrapper header/footer

var React = require('react');
var SessionStore = require('../../stores/sessionStore');
var SearchBar = require('../searchBar/searchBar');
var SessionLinks = require('./sessionLinks');
var CurrentUserNav = require('./currentUserNav');

var NavHeader = React.createClass({
  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.refresh);
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  refresh: function () {
    this.forceUpdate();
  },

  render: function () {
    var userMenu;
    if (SessionStore.isLoggedIn()) {
      userMenu = <CurrentUserNav user={SessionStore.currentUser()} />;
    } else {
      userMenu = <SessionLinks />;
    }

    return (
			<header className="nav-header group">
        <a className="header-logo" href="#">
					<div className="header-logo-div"></div>
				</a>

				<ul className="nav-header-links group">
					<li><a href="#">Discover</a></li>
					<li><a href="#">Start a project</a></li>
					<li><a href="#">About us</a></li>
				</ul>

        <SearchBar />

        {userMenu}
      </header>
		);
	}
});

module.exports = NavHeader;
