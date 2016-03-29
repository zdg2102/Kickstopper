// right-hand panel on project page for main project stats

var React = require('react');

var MainStatsPanel = React.createClass({

  render: function () {

    return (
      <div className="main-stats-panel">

				<data className="main-stats-num">
          {this.props.project.numBackers}
				</data>
				<span className="main-stats-label">
					{"backers"}
				</span>

				<data className="main-stats-num">
          {this.props.project.pledged}
				</data>
				<span className="main-stats-label">
          {"pledged of " + this.props.project.goal + " goal"}
				</span>

				<data className="main-stats-num">
          {this.props.project.daysLeft}
				</data>
				<span className="main-stats-label">
          {"days to go"}
				</span>



      </div>
		);

	}

});

module.exports = MainStatsPanel;
