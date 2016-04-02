// Header for NavWrapper header/footer

var React = require('react');
var SearchBar = require('../searchBar/searchBar');

var NavHeader = React.createClass({

  render: function () {

    return (
			<header className="nav-header group">

        <a className="header-logo" href="#">
					<div className="header-logo-div"></div>
				</a>

				<ul className="nav-header-links group">
					<li><a href="#">Discover</a></li>
					<li><a href="#">Start a project</a></li>
					<li><a href="#">About us</a></li>
				</ul>

        <SearchBar />

			</header>
		);
	}

});

module.exports = NavHeader;
