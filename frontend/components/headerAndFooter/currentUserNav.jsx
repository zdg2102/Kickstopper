// Menu for bringing up options for current logged-in user

var React = require('react');

var NavHeader = React.createClass({
  render: function () {
    return (
      <div className="current-user-nav">
        <span className="user-nav-label">
					{"Me"}
						<a className="user-nav-arrow"></a>
        </span>
      </div>
		);
	}
});

module.exports = NavHeader;
