// wrapper component containing the common elements of login and sign up
// pages

var React = require('react');

var SessionForm = React.createClass({

  // FINDTAG must redirect to here with header 'Please sign up to continue' if
  // user tries to hit payment page without being logged in

	render: function () {
		return (
			<div className="session-form-main">
				<div className="session-form-box">
					{this.props.children}
				</div>
			</div>
		);
	}

});

module.exports = SessionForm;
