// login fields of session form

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');
var LoginAlternativePanel = require('./loginAlternativePanel');

var Login = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      email: "",
      password: "",
      emailError: false,
      passwordError: false,
      errorMessages: []
    };
  },

  handleFieldInput: function (fieldName, e) {
    var newState = {};
    newState[fieldName] = e.currentTarget.value;
    newState[fieldName + "Error"] = false;
    newState.errorMessages = [];
    this.setState(newState);
  },

  handleSubmit: function (e) {
    e.preventDefault();

    var newState = {};
    newState.errorMessages = [];
    if (this.state.email.length === 0) {
      newState.emailError = true;
      newState.errorMessages.push("Email field cannot be empty");
    }
    if (this.state.password.length === 0) {
      newState.passwordError = true;
      newState.errorMessages.push("No password entered");
    }

    if (newState.errorMessages.length > 0) {
      this.setState(newState);
    } else {
      ApiUtil.login(
        {
          email: this.state.email,
          password: this.state.password
        },
        function () {
          this.context.router.push("/");
        }.bind(this),
        function () {
          newState.errorMessages.push("Invalid credentials");
          this.setState(newState);
        }.bind(this)
      );
    }
  },

	render: function () {
    var emailError = this.state.emailError ? " error" : "";
    var passwordError = this.state.passwordError ? " error" : "";

    var errorsList;
    if (this.state.errorMessages.length > 0) {
      var errorMessages = this.state.errorMessages.map( function (msg, idx) {
        return <li key={idx} className="session-error-message">{msg}</li>;
      });
      errorsList = (
        <ul className="session-errors-list">
          {errorMessages}
        </ul>
      );
    }

		return (
			<div>
				<form className="login-form" onSubmit={this.handleSubmit}>
					<h2 className="session-form-header">{"Log in"}</h2>

          {errorsList}

					<input type="text"
            className={"session-input" + emailError}
						placeholder="Email" value={this.state.email}
            onChange={this.handleFieldInput.bind(this, "email")} />

          <input type="password"
            className={"session-input" + passwordError}
						placeholder="Password" value={this.state.password}
            onChange={this.handleFieldInput.bind(this, "password")}/>

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
