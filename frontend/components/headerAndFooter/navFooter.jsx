// Footer for NavWrapper header/footer

var React = require('react');

var NavFooter = React.createClass({

  render: function () {

    return (
      <footer className="nav-footer group">

        <div className="footer-column-container group">

          <div className="footer-column">
            <h4 className="footer-column-header">Navigation</h4>

            <ul className="footer-column-list">
              <li><a href="/about">{"What is Kickstopper?"}</a></li>
              <li><a href="/start">{"Start a project"}</a></li>
            </ul>
          </div>

          <div className="footer-column">
            <h4 className="footer-column-header">Discover</h4>

            <ul className="footer-column-list">
              <li><a href="/discover/categories/neighbors">Neighbors</a></li>
              <li><a href="/discover/categories/media_and_arts">
                Media and Arts
              </a></li>
            <li><a href="/discover/categories/daily_life">Daily Life</a></li>
              <li><a href="/discover/categories/work">Work</a></li>
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
