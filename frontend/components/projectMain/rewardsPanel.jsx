// left-hand panel for rewards descriptions

var React = require('react');
var RewardTileMain = require('../rewards/rewardTileMain');

var RewardsPanel = React.createClass({
  getInitialState: function () {
    return { clickedId: null };
  },

  handleRewardClick: function (rewardId) {
    this.setState({ clickedId: rewardId });
  },

  render: function () {

    var tiles;
    if (this.props.project && this.props.project.rewards) {
      tiles = this.props.project.rewards.map( function (reward) {
        return <RewardTileMain key={reward.id} reward={reward}
          click={this.handleRewardClick}
          clicked={this.state.clickedId === reward.id}
          projectId={this.props.project.id} />;
      }.bind(this));
    }

    return (
      <div className="project-rewards-panel">

				<h4 className="project-detail-header">
					{"Rewards"}
				</h4>

        {tiles}

      </div>
		);

	}

});

module.exports = RewardsPanel;
