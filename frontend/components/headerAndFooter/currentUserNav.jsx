// Menu for bringing up options for current logged-in user

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');

var CurrentUserNav = React.createClass({
  getInitialState: function () {
    return { menuActive: false };
  },

  handleClick: function (e) {
    this.setState({ menuActive: !this.state.menuActive });
  },

  handleLogout: function (e) {
    ApiUtil.logout();
  },

  render: function () {
    var active = this.state.menuActive ? " active" : "";
    var whiteBorder;
    if (this.state.menuActive) {
      whiteBorder = <div className="menu-white-border"></div>;
    }

    // NOTE add user menu links back in when user menu is
    // completed
    // <h6 className="user-menu-header">{"My stuff"}</h6>
    //
    // <ul className="user-menu-item-list">
    // <li className="user-menu-item">{"Profile"}</li>
    // <li className="user-menu-item">{"Edit Profile"}</li>
    // </ul>

    return (
      <div className="current-user-nav" onClick={this.handleClick}>
        <span className="user-nav-label">
          {"Me"}
            <a className="user-nav-arrow"></a>
        </span>

        {whiteBorder}

        <div className={"user-nav-menu" + active}>

          <p className="user-menu-text">
            {"You're logged in as "}
            <span className="user-menu-name">
              {this.props.currentUser.name}
            </span>
            <a className="user-menu-logout" onClick={this.handleLogout}>
              {"Log out"}
            </a>
          </p>
        </div>
      </div>
    );
  }
});

module.exports = CurrentUserNav;
