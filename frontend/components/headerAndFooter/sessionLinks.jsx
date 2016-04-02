// Links for login/signup in nav header

var React = require('react');

var SessionLinks = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleSignupClick: function (e) {
    this.context.router.push("/signup");
  },

  handleLoginClick: function (e) {
    this.context.router.push("/login");
  },

  render: function () {
    return (
			<div className="session-links-div">
        <a className="session-link" onClick={this.handleSignupClick}>
          {"Sign Up"}
        </a>

        <a className="session-link" onClick={this.handleLoginClick}>
          {"Log In"}
        </a>
			</div>
		);
	}
});

module.exports = SessionLinks;
