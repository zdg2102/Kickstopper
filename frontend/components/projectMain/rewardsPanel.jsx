// left-hand panel for rewards descriptions

var React = require('react');

var RewardsPanel = React.createClass({

  render: function () {

		var goal = this.props.project ? this.props.project.funding_goal : "";
		var fundingDate = this.props.project ? this.props.project.funding_date
		  : "";

    return (
      <div className="project-rewards-panel">

				<h4 className="project-detail-header">
					{"Rewards"}
				</h4>


      </div>
		);

	}

});

module.exports = RewardsPanel;
