// Header for NavWrapper header/footer

var React = require('react');

var NavHeader = React.createClass({

  render: function () {

    // FINDTAG will get search bar and user dropdown later
		// FINDTAG h3 will be replaced with logo image

    return (
			<header className="nav-header group">

        <a className="header-logo" href="#"><h3>Kickstopper</h3></a>

				<ul className="nav-header-links group">
					<li><a href="#">Discover</a></li>
					<li><a href="#">Start a project</a></li>
					<li><a href="#">About us</a></li>
				</ul>

			</header>
		);
	}

});

module.exports = NavHeader;
