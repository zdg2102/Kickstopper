// button shared by both session forms to login via Facebook

var React = require('react');

var loginAlternativePanel = React.createClass({

	render: function () {
		return (
			<div className="login-alternative-panel">
				<div className="session-form-divider">
				  <hr className="session-divider-left"/>
					{"or"}
					<hr className="session-divider-right" />
				</div>
        <button className="guest-login-button"
          onClick={this.props.guestLogin}>
          {"Continue as Guest"}
        </button>
        <a href="/auth/facebook">
          <button className="facebook-login-button">
            {"Log in with Facebook"}
          </button>
        </a>
				<p className="session-button-message">
					{"We may post things on Facebook without" +
					" your permission, if we feel like it."}
				</p>
			</div>
		);
	}

});

module.exports = loginAlternativePanel;
