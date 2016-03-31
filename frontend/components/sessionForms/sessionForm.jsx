// wrapper component containing the common elements of login and sign up
// pages

var React = require('react');

var SessionForm = React.createClass({

	render: function () {
		return (
			<div className="session-form-main">

				<div className="session-form-box">
					{this.props.children}
          <div className="session-form-footer">
						<div className="session-form-divider">
						  <hr className="session-divider-left"/>
							{"or"}
							<hr className="session-divider-right" />
						</div>
						<button className="facebook-login-button">
							{"Log in with Facebook"}
						</button>
						<p className="session-button-message">
							{"We may post things on Facebook without" +
							" your permission, if we feel like it."}
						</p>
						<div className="switch-form-section">
							{"Have an account? "}
							<a className="switch-form-link">{"Log In"}</a>
						</div>
          </div>
				</div>
			</div>
		);
	}

});

module.exports = SessionForm;
