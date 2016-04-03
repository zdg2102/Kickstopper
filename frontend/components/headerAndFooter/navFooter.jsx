// Footer for NavWrapper header/footer

var React = require('react');

var NavFooter = React.createClass({

  render: function () {

		// FINDTAG fix category names and column widths

    return (
			<footer className="nav-footer group">

        <div className="footer-column-container group">

          <div className="footer-column">
						<h4 className="footer-column-header">Navigation</h4>

						<ul className="footer-column-list">
              <li><a href="#">{"What is Kickstopper?"}</a></li>
							<li><a href="#">{"Start a project"}</a></li>
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
          <a className="footer-logo" href="#">
						<div className="footer-logo-div"></div>
          </a>
        </div>

			</footer>
		);
	}

});

module.exports = NavFooter;
