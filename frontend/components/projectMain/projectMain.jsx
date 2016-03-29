// main display component for each project's main page

var React = require('react');
var MainStatsPanel = require('./mainStatsPanel');

var ProjectMain = React.createClass({

  render: function () {

    return (
      <div>

				<section className="project-main-info">

					<div className="project-main-info-container">

						<div className="project-title-bar">
							<h1 className="project-title">{this.props.project.title}</h1>
							<h6 className="project-byline">
								{"by "}
								<span className="creator-name">
									{this.props.project.creatorName}
								</span>
							</h6>
						</div>

						<div className="video-panel group">
							<div className="video"></div>
							<MainStatsPanel project={this.props.project} />
						</div>


					</div>


				</section>


      </div>
		);

	}

});

module.exports = ProjectMain;
