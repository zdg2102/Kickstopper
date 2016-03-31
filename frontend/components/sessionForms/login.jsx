// login fields of session form

var React = require('react');

var Login = React.createClass({

	render: function () {
		return (
			<form className="login-form">
        <h2 className="session-form-header">{"Log in"}</h2>

			  <input type="text" className="session-input"
				  defaultValue="Email" />

				<input type="text" className="session-input"
					defaultValue="Password" />

				<input type="submit" className="session-submit"
					value="Log me in!" />

			</form>
		);
	}

});

module.exports = Login;
