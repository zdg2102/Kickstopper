// panel below video for displaying project creator information

var React = require('react');

var CreatorPanel = React.createClass({

	// FINDTAG: Need to update this to access the creator picture

  render: function () {

		var name = "Test creator";
		var numCreated = 8;
		var numBacked = 30;
		var bioUrl = "#";

    return (
      <div className="creator-panel group">

				<div className="creator-panel-text">
					<h6 className="creator-panel-name">{name}</h6>

					<span className="creator-panel-stats">
						{numCreated + " created | " + numBacked + " backed"}
					</span>

					<span className="creator-page-link">
						<a href={bioUrl}>{"See creator page"}</a>
					</span>
				</div>

				<div className="creator-circle-icon"></div>

      </div>
		);

	}

});

module.exports = CreatorPanel;
