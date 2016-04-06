// right-hand panel on project page for main project stats

var React = require('react');

var MainStatsPanel = React.createClass({
  contextTypes: {
    router: React.PropTypes.object.isRequired
  },

  handleBackClick: function (e) {
    this.context.router.push({
      pathname: "/projects/" + this.props.project.id + "/pledges/new",
    });
  },

  render: function () {
		var fundingGoal, fundingDate, backerCount, daysLeft, amountPledged;
		if (this.props.project) {
			fundingGoal = this.props.project.funding_goal;
			fundingDate = this.props.project.funding_date;
			backerCount = this.props.project.backer_count;
			amountPledged = this.props.project.amount_pledged;
		}
		if (fundingDate) {
			// convert milliseconds to days
			var fundDateObj = new Date(fundingDate);
			daysLeft = Math.ceil((fundDateObj - Date.now()) / 86400000);
		}

    return (
      <div className="main-stats-panel">

				<data className="main-stats-num">
          {backerCount}
				</data>
				<span className="main-stats-label">
					{"backers"}
				</span>

				<data className="main-stats-num">
          {amountPledged}
				</data>
				<span className="main-stats-label">
          {"pledged of " + fundingGoal + " goal"}
				</span>

				<data className="main-stats-num">
          {daysLeft}
				</data>
				<span className="main-stats-label">
          {"days to go"}
				</span>

        <button className="back-project-button" onClick={this.handleBackClick}>
					{"Back This Project"}
        </button>

				<span className="main-stats-fund-date">
					{"This project will be funded on " + fundingDate}
				</span>

      </div>
		);

	}

});

module.exports = MainStatsPanel;
