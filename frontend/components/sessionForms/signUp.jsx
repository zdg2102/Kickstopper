// sign up fields of session form

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');
var LoginAlternativePanel = require('./loginAlternativePanel');

var SignUp = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return {
      name: "",
      email: "",
      emailValidation: "",
      password: "",
      passwordValidation: "",
      nameError: false,
      emailError: false,
      emailValidationError: false,
      passwordError: false,
      passwordValidationError: false,
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
    if (this.state.name.length === 0) {
      newState.nameError = true;
      newState.errorMessages.push("Name cannot be empty");
    }
    if (this.state.email.length === 0) {
      newState.emailError = true;
      newState.errorMessages.push("Email cannot be empty");
    }
    if (this.state.email !== this.state.emailValidation) {
      newState.emailError = true;
      newState.emailValidationError = true;
      newState.errorMessages.push("Email does not match validation");
    }
    if (this.state.password.length === 0) {
      newState.passwordError = true;
      newState.errorMessages.push("Password cannot be empty");
    } else if (this.state.password.length < 6) {
      newState.passwordError = true;
      newState.errorMessages.push("Password must be at least 6 characters");
    }
    if (this.state.password !== this.state.passwordValidation) {
      newState.passwordError = true;
      newState.passwordValidationError = true;
      newState.errorMessages.push("Password does not match validation");
    }

    if (newState.errorMessages.length > 0) {
      this.setState(newState);
    } else {
      ApiUtil.signup(
        {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password
        },
        function () {
          this.continueToTarget();
        }.bind(this),
        function (error) {
          debugger;
          if (JSON.parse(error.responseText).msg ===
            "Email already taken") {
            newState.errorMessages.push("An account already exists " +
              "for that email");
            this.setState(newState);
          } else {
            newState.errorMessages.push("Registration failed");
            this.setState(newState);
          }
        }.bind(this)
      );
    }
  },

  guestLogin: function (e) {
    ApiUtil.login(
      {
        email: "GuestSession",
        password: "password"
      },
      function () {
        this.continueToTarget();
      }.bind(this)
    );
  },

  continueToTarget: function () {
    // if they reached this page normally, redirect them to the main page
    // if they were redirected here while trying to perform another
    // action, pass them back to their continueTo path
    if (this.props.location.query.continueTo) {
      var newParams = {};
      for (var id in this.props.location.query) {
        if (id !== "continueTo") {
          newParams[id] = this.props.location.query[id];
        }
      }
      this.context.router.push({
        pathname: this.props.location.query.continueTo,
        query: newParams
      });
    } else {
      this.context.router.push("/");
    }
  },

  switchToLogin: function () {
    // passes redirect params to login if sign in has them
    this.context.router.push({
      pathname: "/login",
      query: this.props.location.query
    });
  },

	render: function () {
    var nameError = this.state.nameError ? " error" : "";
    var emailError = this.state.emailError ? " error" : "";
    var passwordError = this.state.passwordError ? " error" : "";
    var emailValidationError = this.state.emailValidationError ? " error" : "";
    var passwordValidationError = this.state.passwordValidationError ?
      " error" : "";

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
					<h2 className="session-form-header">{"Sign up"}</h2>

          {errorsList}

          <input type="text"
            className={"session-input" + nameError}
            placeholder="Name" value={this.state.name}
            onChange={this.handleFieldInput.bind(this, "name")} />

          <input type="text"
            className={"session-input" + emailError}
            placeholder="Email" value={this.state.email}
            onChange={this.handleFieldInput.bind(this, "email")} />

          <input type="text"
            className={"session-input" + emailValidationError}
            placeholder="Re-enter email" value={this.state.emailValidation}
            onChange={this.handleFieldInput.bind(this, "emailValidation")} />

          <input type="password"
            className={"session-input" + passwordError}
            placeholder="Password" value={this.state.password}
            onChange={this.handleFieldInput.bind(this, "password")} />

          <input type="password"
            className={"session-input" + passwordValidationError}
            placeholder="Re-enter password" value={this.state.passwordValidation}
            onChange={this.handleFieldInput.bind(this, "passwordValidation")} />

					<input type="submit" className="session-submit"
						value="Sign me up!" />

					<p className="session-button-message">
						{"By signing up, you agree to all kinds of" +
							" cryptic terms."}
						</p>

					</form>

					<div className="session-form-footer">

						<LoginAlternativePanel guestLogin={this.guestLogin} />

						<div className="switch-form-section">
							{"Have an account? "}
							<a className="switch-form-link" onClick={this.switchToLogin}>
                {"Log In"}
              </a>
						</div>

					</div>

			</div>
		);
	}

});

module.exports = SignUp;
