// selectable reward tile for pledge selection page

var React = require('react');

var RewardTilePledge = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  getInitialState: function () {
    return { pledgeAmount: this.props.reward.minimum_pledge, amountError: false };
  },

  updatePledgeAmount: function (e) {
    var digitReg = /^\d*\.?(\d{1,2})?$/;
    if (e.currentTarget.value.match(digitReg)) {
      this.setState({ pledgeAmount: e.currentTarget.value, amountError: false });
    }
  },

  componentWillReceiveProps: function (newProps) {
    // reset if another pledge is clicked
    if (!this.props.clicked) {
      this.setState({ pledgeAmount: newProps.reward.minimum_pledge,
        amountError: false });
    }
  },

  handleClick: function (e) {
    this.props.click(this.props.reward.id);
  },

  handleSubmit: function (e) {
    if (this.state.pledgeAmount) {
      amount = parseFloat(this.state.pledgeAmount, 10);
      if (!amount || amount < this.props.reward.minimum_pledge) {
        this.setState({ amountError: true });
      } else {
        this.props.submit(amount);
      }
    }
  },

  render: function () {

    var selectButton;
    var clicked = "";
    var check = "";
    if (this.props.clicked) {
      clicked = " clicked";
      check = "\u2713";
      var error = "";
      var errorMessage;
      if (this.state.amountError) {
        error = " error";
        errorMessage = (<span className="pledge-error">
          {"Pledge amount must be higher than minimum pledge for reward"}
        </span>);
      }
      selectButton = (<div>
        <hr className="pledge-tile-hr" />
        <div className="group">
          <label htmlFor="pledgeAmount" className="pledge-label">
            {"Pledge amount"}
          </label>
          {errorMessage}
          <input className={"pledge-input" + error} type="text" id="pledgeAmount"
            value={this.state.pledgeAmount}
            onChange={this.updatePledgeAmount} />
          <button className="pledge-tile-select-button"
            onClick={this.handleSubmit}>
            {"Continue"}
          </button>
        </div>
      </div>);
    }

    return <div className={"reward-tile-pledge" + clicked}
      onClick={this.handleClick}>
      <div className="reward-tile-content group">
        <div className={"reward-check-circle" + clicked}>
          {check}
        </div>
        <div className="reward-tile-text">
          <h5 className="reward-tile-minimum">
            {this.props.reward.minimum_pledge}
          </h5>

          <span className="reward-tile-title">
            {this.props.reward.title}
          </span>

          <p className="reward-tile-description">
            {this.props.reward.description}
          </p>
        </div>

        {selectButton}

      </div>
    </div>;
  }

});

module.exports = RewardTilePledge;
