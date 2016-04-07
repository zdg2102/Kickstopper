// Page to complete project checkout with payment submission

var React = require('react');
var ApiUtil = require('../../utils/apiUtil');
var CheckoutStore = require('../../stores/checkoutStore');

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

    var pledgeAmount, rewardMinimum, rewardTitle, rewardText;


    // var title, creatorName, tiles;
    // if (this.state.project) {
    //   title = this.state.project.title;
		// 	creatorName = this.state.project.creator_name;
    // }
    // if (this.state.project && this.state.project.rewards) {
    //   tiles = this.state.project.rewards.map( function (reward) {
    //     return <RewardTilePledge key={reward.id} reward={reward}
    //       click={this.handleRewardClick}
    //       clicked={this.state.clickedId === reward.id}
    //       projectId={this.state.project.id}
    //       submit={this.handleSubmit} />;
    //   }.bind(this));
    // }

    // <div className="pledge-page-title-bar">
    //   <h1 className="project-title">{title}</h1>
    //   <h6 className="project-byline">
    //     {"by " + creatorName}
    //   </h6>
    // </div>
    //
    // <h4 className="pledge-page-subhead">
    //   {"Let's choose your reward!"}
    // </h4>
    //
    // {tiles}
    return (
      <div>
        {"TEST"}

      </div>
		);

	}

});

module.exports = CheckoutPage;
