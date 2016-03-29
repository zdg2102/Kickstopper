// Footer for NavWrapper header/footer

var React = require('react');

var NavFooter = React.createClass({

  render: function () {

		// FINDTAG h3 will be replaced with logo image

    return (
			<footer className="nav-footer group">

        <div className="footer-column-container group">

          <div className="footer-column">
						<h4 className="footer-column-header">About us</h4>

						<ul className="footer-column-list">
							<li><a href="#">Discover</a></li>
							<li><a href="#">Start a project</a></li>
							<li><a href="#">About us</a></li>
						</ul>
          </div>

					<div className="footer-column">
						<h4 className="footer-column-header">Discover</h4>

						<ul className="footer-column-list">
							<li><a href="#">Category1</a></li>
							<li><a href="#">Category2</a></li>
							<li><a href="#">Category3</a></li>
							<li><a href="#">Category4</a></li>
							<li><a href="#">Category5</a></li>
						</ul>
          </div>

        </div>

        <div className="nav-footer-logo-bar">
          <a className="footer-logo" href="#"><h3>Kickstopper</h3></a>
        </div>

			</footer>
		);
	}

});

module.exports = NavFooter;
