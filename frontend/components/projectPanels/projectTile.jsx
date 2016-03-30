// small tile summarizing project data, for use in lists

var React = require('react');

var ProjectTile = React.createClass({

  render: function () {

		var title = this.props.project ? this.props.project.title : "";
		var creator = "Test creator";
		var blurb = "Test blurb text is in this box so we can test" +
		  " if this text is working so it can be tested in the display" +
			" if it is working and we want to get four lines so we can test" +
			" the fade.";
		var percComplete = "75%";
		var pledged = 129178;
		var daysLeft = 13;

    return (

			<div className="project-tile">

			  <div className="tile-image"></div>

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
