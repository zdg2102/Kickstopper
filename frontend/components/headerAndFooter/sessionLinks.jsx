// Links for login/signup in nav header

var React = require('react');

var SessionLinks = React.createClass({
  render: function () {
    return (
			<div className="session-links-div">
        <a className="session-link" href="/signup">
          {"Sign Up"}
        </a>

        <a className="session-link" href="/login">
          {"Log In"}
        </a>
			</div>
		);
	}
});

module.exports = SessionLinks;
