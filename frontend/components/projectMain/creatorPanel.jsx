// panel below video for displaying project creator information

var React = require('react');

var CreatorPanel = React.createClass({

	// NOTE Need to update this to access the creator picture

  render: function () {

    var creatorName, numCreated, numBacked, creatorUrl;
    if (this.props.project) {
      creatorName = this.props.project.creator_name;
      numCreated = this.props.project.creator_num_projects;
      numBacked = this.props.project.creator_num_backed;
    }

    creatorUrl = "#";

    return (
      <div className="creator-panel group">

				<div className="creator-panel-text">
					<h6 className="creator-panel-name">{creatorName}</h6>

					<span className="creator-panel-stats">
						{numCreated + " created | " + numBacked + " backed"}
					</span>

					<span className="creator-page-link">
						<a href={creatorUrl}>{"See creator page"}</a>
					</span>
				</div>

				<div className="creator-circle-icon"></div>

      </div>
		);

	}

});

module.exports = CreatorPanel;
