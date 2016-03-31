// button shared by both session forms to login via Facebook

var React = require('react');

var FacebookLoginPanel = React.createClass({

	render: function () {
		return (
			<div>
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
			</div>
		);
	}

});

module.exports = FacebookLoginPanel;
