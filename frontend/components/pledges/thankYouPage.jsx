// Page to display that a pledge has been successfully completed

var React = require('react');

var ThankYouPage = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleButtonClick: function (e) {
    this.context.router.push("/discover");
  },

  render: function () {
    return (
      <div className="thank-you-background">
        <div className="thank-you-box">
          <h2 className="thank-you-header">
            {"Thank you!"}
          </h2>
          <p className="thank-you-message">
            {"Your pledge has been successfully registered." +
            " Remember, you will not be charged unless the project" +
            " successfully reaches its full funding goal. Thank you" +
            " for your support of stopping things!"}
          </p>
          <button className="thank-you-button" onClick={this.handleButtonClick}>
            {"Find more projects!"}
          </button>
        </div>
      </div>
		);
	}
});

module.exports = ThankYouPage;
