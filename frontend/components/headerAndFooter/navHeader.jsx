// Header for NavWrapper header/footer

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');
var SessionStore = require('../../stores/sessionStore');
var SearchStore = require('../../stores/searchStore');
var SearchBar = require('../searchBar/searchBar');
var SearchPopup = require('../searchBar/searchPopup');
var SessionLinks = require('./sessionLinks');
var CurrentUserNav = require('./currentUserNav');

var NavHeader = React.createClass({
  getInitialState: function () {
    return { searchTerm: "", searchResults: [] };
  },

  componentDidMount: function () {
    this.sessionStoreToken = SessionStore.addListener(this.refresh);
    this.searchStoreToken = SearchStore.addListener(this.popOutSearch);
  },

  componentWillUnmount: function () {
    this.sessionStoreToken.remove();
  },

  refresh: function () {
    this.forceUpdate();
  },

  updateSearchTerm: function (term) {
    if (term.length > 1) {
    // only start searching once the term is at least 2 characters
      ApiUtil.globalSearch(term);
    }
    this.setState({ searchTerm: term });
  },

  popOutSearch: function () {
    this.setState({ searchResults: SearchStore.all() });
  },

  clearSearch: function () {
    this.setState({ searchTerm: "", searchResults: [] });
  },

  render: function () {
    var userMenu;
    if (SessionStore.isLoggedIn()) {
      userMenu = <CurrentUserNav currentUser={SessionStore.currentUser()} />;
    } else {
      userMenu = <SessionLinks />;
    }

    var searchPopup;
    if (this.state.searchTerm.length > 1) {
      searchPopup = <SearchPopup results={this.state.searchResults}
        clear={this.clearSearch} term={this.state.searchTerm} />;
    }

    return (
      <div>
        <header className="nav-header group">
          <a className="header-logo" href="/">
            <div className="header-logo-div"></div>
          </a>

          <ul className="nav-header-links group">
            <li><a href="/discover">Discover</a></li>
            <li><a href="/start">Start a project</a></li>
            <li><a href="/about">About us</a></li>
          </ul>

          <SearchBar term={this.state.searchTerm}
            updateSearchTerm={this.updateSearchTerm} />

          {userMenu}

        </header>

        {searchPopup}
      </div>
		);
	}
});

module.exports = NavHeader;
