// small tile summarizing project data, for use in lists

var React = require('react');

var ProjectTile = React.createClass({
	contextTypes: {
    router: React.PropTypes.object.isRequired
  },

	handleClick: function () {
    this.context.router.push("/projects/" + this.props.project.id);
	},

  render: function () {
		var title, creatorName, amountPledged, blurb, percentComplete,
		  fundingGoal, fundingDate, daysLeft;
		if (this.props.project) {
			title = this.props.project.title;
			creatorName = this.props.project.creator_name;
			amountPledged = this.props.project.amount_pledged;
      fundingGoal = this.props.project.funding_goal;
			fundingDate = this.props.project.funding_date;
			blurb = this.props.project.project_blurb;
		}
		if (amountPledged && fundingGoal) {
			percentComplete = parseInt((amountPledged / fundingGoal) * 100,
			  10) + "%";
		} else {
			percentComplete = "0%";
		}
		if (fundingDate) {
			// convert milliseconds to days
			var fundDateObj = new Date(fundingDate);
			daysLeft = Math.ceil((fundDateObj - Date.now()) / 86400000);
		}

		var testDate = this.props.project ? this.props.project.funding_date : "";

		var testCat = this.props.project ? this.props.project.category : "";
		var testSub = this.props.project ? this.props.project.subcategory : "";
    var testCount = this.props.project ? this.props.project.backer_count : "";

    return (

			<div className="project-tile" onClick={this.handleClick}>

			  <div className="tile-image">
          {testCat}
					<br />
					{testSub}
					<br />
					{testDate}
          <br />
          {testCount}
			  </div>

				<div className="tile-content">
					<h6 className="tile-title">{title}</h6>
					<p className="tile-byline">{creatorName}</p>
					<p className="tile-blurb white-gradient">{blurb}</p>
				</div>

				<div className="tile-footer">

          <div className="tile-progress-bar">
						<div className="tile-progress-complete"
							style={{width: percentComplete}}>
						</div>

          </div>

					<ul className="tile-stats group">
						<li>
							<data className="tile-stat-num">
								{percentComplete}
							</data>
							<span className="tile-stat-label">
								{"funded"}
							</span>
						</li>

						<li>
							<data className="tile-stat-num">
								{amountPledged}
							</data>
							<span className="tile-stat-label">
								{"pledged"}
							</span>
						</li>

						<li>
							<data className="tile-stat-num">
								{daysLeft}
							</data>
							<span className="tile-stat-label">
								{"days to go"}
							</span>
						</li>
					</ul>

				</div>

			</div>
		);
	}

});

module.exports = ProjectTile;
