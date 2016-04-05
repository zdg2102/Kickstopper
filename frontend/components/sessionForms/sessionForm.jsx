// wrapper component containing the common elements of login and sign up
// pages

var React = require('react');

var SessionForm = React.createClass({

	componentDidMount: function () {
    window.scrollTo(0, 0);
	},

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
