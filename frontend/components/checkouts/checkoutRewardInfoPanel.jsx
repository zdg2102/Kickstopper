// right-hand panel on checkout page for information on selected reward

var React = require('react');

var CheckoutRewardInfoPanel = React.createClass({

  render: function () {
    var pledgeAmount, rewardMinimum, rewardTitle, rewardDescription;
    if (this.props.checkout) {
      pledgeAmount = this.props.checkout.formatted_pledge_amount;
      rewardMinimum = this.props.checkout.reward_minimum;
      rewardTitle = this.props.checkout.reward_title;
      rewardDescription = this.props.checkout.reward_description;
    }

    return (
      <div className="checkout-info-panel">
        <span className="checkout-info-label">
          {"Pledge amount"}
        </span>

        <span className="checkout-pledge-amount">
          {pledgeAmount}
        </span>

        <span className="checkout-info-label">
          {"Selected reward"}
        </span>

        <span className="checkout-reward-label">
          {rewardMinimum}
        </span>

        <span className="checkout-reward-label">
          {rewardTitle}
        </span>

        <p className="checkout-reward-description">
          {rewardDescription}
        </p>

      </div>
    );
  }
});

module.exports = CheckoutRewardInfoPanel;
