// selectable reward tile for pledge selection page

var React = require('react');

var RewardTilePledge = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleClick: function (e) {
    this.props.click(this.props.reward.id);
  },

  // selectPledge: function (e) {
  //   this.context.router.push({
  //     pathname: "/projects/" + this.props.projectId + "/pledges/new",
  //     query: { selectedRewardId: this.props.reward.id }
  //   });
  // },

  render: function () {

    var selectButton;
    var clicked = "";
    var check = "";
    if (this.props.clicked) {
      clicked = " clicked";
      check = "\u2713";
      selectButton = (<div>
        <hr className="pledge-tile-hr" />
        <button className="pledge-tile-select-button"
          onClick={this.selectPledge}>
          {"Make a pledge"}
        </button>
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
