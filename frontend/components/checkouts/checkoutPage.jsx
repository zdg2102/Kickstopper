// Page to complete project checkout with payment submission

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');
var CheckoutStore = require('../../stores/checkoutStore');
var CheckoutRewardInfoPanel = require('./checkoutRewardInfoPanel');
var CheckoutForm = require('./checkoutForm');

var CheckoutPage = React.createClass({
  getInitialState: function () {
    var initialState = {};
    if (CheckoutStore.currentCheckout() &&
        CheckoutStore.currentCheckout().id ===
        parseInt(this.props.params.checkoutId, 10)) {
      initialState = { checkout: CheckoutStore.currentCheckout() };
    } else {
      initialState = { checkout: null };
    }
    return initialState;
  },

  componentDidMount: function () {
    this.CheckoutStoreToken = CheckoutStore.addListener(this.refresh);
    if (!CheckoutStore.currentCheckout() ||
        CheckoutStore.currentCheckout().id !==
        parseInt(this.props.params.checkoutId, 10)) {
      ApiUtil.getCheckout(this.props.params.checkoutId);
    }
  },

  refresh: function () {
    if (CheckoutStore.currentCheckout() &&
        CheckoutStore.currentCheckout().id ===
        parseInt(this.props.params.checkoutId, 10)) {
    this.setState({ checkout: CheckoutStore.currentCheckout() });
    }
  },

  componentWillUnmount: function () {
    this.CheckoutStoreToken.remove();
  },

  render: function () {
    var projectTitle, creatorName;
    if (this.state.checkout) {
      projectTitle = this.state.checkout.project_title;
      creatorName = this.state.checkout.creator_name;
    }

    return (
      <div>
        <div className="pledge-page-title-bar">
          <h1 className="project-title">{projectTitle}</h1>
          <h6 className="project-byline">
            {"by " + creatorName}
          </h6>
        </div>

        <div className="group">
          <div className="checkout-form-column">
            <h4 className="checkout-form-header">
              {"Payment information"}
            </h4>

            <p className="checkout-form-info">
              {"The Stripe payment API is configured to run in Test mode." +
              " If you'd like to make a pledge, you can use the dummy" +
              " card number 4242 4242 4242 4242 and any 3-digit CSV."}
            </p>

            <CheckoutForm checkout={this.state.checkout} />

          </div>

          <div className="checkout-info-column">
            <CheckoutRewardInfoPanel checkout={this.state.checkout} />
          </div>
        </div>

      </div>
		);

	}

});

module.exports = CheckoutPage;
