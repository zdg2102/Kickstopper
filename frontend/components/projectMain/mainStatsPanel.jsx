// right-hand panel on project page for main project stats

var React = require('react');

var MainStatsPanel = React.createClass({

  render: function () {

		var goal = this.props.project ? this.props.project.funding_goal : "";

    return (
      <div className="main-stats-panel">

				<data className="main-stats-num">
          {"276"}
				</data>
				<span className="main-stats-label">
					{"backers"}
				</span>

				<data className="main-stats-num">
          {"11976"}
				</data>
				<span className="main-stats-label">
          {"pledged of " + goal + " goal"}
				</span>

				<data className="main-stats-num">
          {"24"}
				</data>
				<span className="main-stats-label">
          {"days to go"}
				</span>



      </div>
		);

	}

});

module.exports = MainStatsPanel;
