// About page

var React = require('react');

var AboutPage = React.createClass({
  render: function () {
    return (
      <div className="about-page-main">
        <div className="about-page-image">
          <h3 className="about-page-tagline">
            {"Our mission is to help stop people doing" +
            " things you wish they would stop doing."}
          </h3>
          <div className="about-page-text-block">
            <p className="about-page-description">
              {"Kickstopper helps people find the resources and" +
              " support they need to get things stopped. To date," +
              " tens of thousands of annoying and frustrating things" +
              " - big and small - have been stopped with the support" +
              " of the Kickstopper community."}
            </p>
          </div>
        </div>
        <h4 className="about-page-subhead">
          {"But really"}
        </h4>
        <p className="about-page-text">
          {"This site is my capstone project at App Academy. You" +
          " can see more of my work on my "}
          <a className="about-page-text-link" href="http://www.zdgarcia.com/">
            {"portfolio page"}
          </a>
          {" and my "}
          <a className="about-page-text-link" href="https://github.com/zdg2102">
            {"Github"}
          </a>
          {"."}
        </p>
      </div>
    );
  }
});

module.exports = AboutPage;
