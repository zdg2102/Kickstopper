// login fields of session form

var React = require('react');
var LoginAlternativePanel = require('./loginAlternativePanel');

var Login = React.createClass({

	render: function () {
		return (
			<div>
				<form className="login-form">
					<h2 className="session-form-header">{"Log in"}</h2>

					<input type="text" className="session-input"
						defaultValue="Email" />

					<input type="text" className="session-input"
						defaultValue="Password" />

					<input type="submit" className="session-submit"
						value="Log me in!" />

				</form>
				<div className="session-form-footer">

					<LoginAlternativePanel />

					<div className="switch-form-section">
						{"New to Kickstopper? "}
						<a className="switch-form-link">{"Sign Up!"}</a>
					</div>

				</div>
			</div>
		);
	}

});

module.exports = Login;
