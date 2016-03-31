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

		var title = this.props.project ? this.props.project.title : "";
		var creator = "Test creator";

		var pledged = 129178;

		var blurb = this.props.project ? this.props.project.project_blurb : "";

		var percComplete;
		if (this.props.project) {
      percComplete = parseInt((pledged / this.props.project.funding_goal) *
			  100, 10) + "%";
		} else {
			percComplete = "0%";
		}

		var testDate = this.props.project ? this.props.project.funding_date : "";

		var fundDate = this.props.project ? new Date(this.props.project.funding_date) : "";

		var daysLeft = this.props.project ?
		   Math.floor((fundDate - Date.now()) / 86400000) : "";

		var testCat = this.props.project ? this.props.project.category : "";
		var testSub = this.props.project ? this.props.project.subcategory : "";

    return (

			<div className="project-tile" onClick={this.handleClick}>

			  <div className="tile-image">
          {testCat}
					<br />
					{testSub}
					<br />
					{testDate}
			  </div>

				<div className="tile-content">
					<h6 className="tile-title">{title}</h6>
					<p className="tile-byline">{creator}</p>
					<p className="tile-blurb white-gradient">{blurb}</p>
				</div>

				<div className="tile-footer">

          <div className="tile-progress-bar">
						<div className="tile-progress-complete"
							style={{width: percComplete}}>
						</div>

          </div>

					<ul className="tile-stats group">
						<li>
							<data className="tile-stat-num">
								{percComplete}
							</data>
							<span className="tile-stat-label">
								{"funded"}
							</span>
						</li>

						<li>
							<data className="tile-stat-num">
								{pledged}
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
