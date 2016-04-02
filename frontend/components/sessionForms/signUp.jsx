// sign up fields of session form

var React = require('react');
var LoginAlternativePanel = require('./loginAlternativePanel');

var SignUp = React.createClass({

	render: function () {
		return (
			<div>
				<form className="login-form">
					<h2 className="session-form-header">{"Sign up"}</h2>

					<input type="text" className="session-input"
						defaultValue="Name" />

					<input type="text" className="session-input"
						defaultValue="Email" />

					<input type="text" className="session-input"
						defaultValue="Re-enter email" />

					<input type="text" className="session-input"
						defaultValue="Email" />

					<input type="text" className="session-input"
						defaultValue="Password" />

					<input type="text" className="session-input"
						defaultValue="Re-enter password" />

					<input type="submit" className="session-submit"
						value="Sign me up!" />

					<p className="session-button-message">
						{"By signing up, you agree to all kinds of" +
							" cryptic terms."}
						</p>

					</form>

					<div className="session-form-footer">

						<LoginAlternativePanel />

						<div className="switch-form-section">
							{"Have an account? "}
							<a className="switch-form-link">{"Log In"}</a>
						</div>

					</div>

			</div>
		);
	}

});

module.exports = SignUp;
